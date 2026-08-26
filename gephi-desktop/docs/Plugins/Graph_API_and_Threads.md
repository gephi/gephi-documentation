---
id: Graph_API_and_Threads
title: Graph access and long tasks
sidebar_position: 3
---

Most substantial plugins eventually need the same foundations: find the active workspace, select the correct graph view, read or change attributes safely, react to changes, and keep work off Swing's event dispatch thread (EDT). Get these rules right before specializing in an importer, statistic, or custom panel.

Add `graph-api`, `project-api`, `utils-longtask`, and `org-openide-util-lookup` as needed.

## Resolve the current context

Controllers are global services obtained from NetBeans Lookup. Models are workspace-specific.

```java
ProjectController projects = Lookup.getDefault().lookup(ProjectController.class);
Workspace workspace = projects.getCurrentWorkspace();
if (workspace == null) {
    // No project/workspace is open: disable the action or show a clear message.
    return;
}

GraphController graphs = Lookup.getDefault().lookup(GraphController.class);
GraphModel graphModel = graphs.getGraphModel(workspace);
```

Resolve this context when an operation starts. A panel that remains open across project changes must not assume that the `GraphModel` captured by its constructor is still current.

## Complete graph or visible graph?

Gephi preserves the complete graph while filters expose a separate visible view.

- `graphModel.getGraph()` returns the complete/main graph.
- `graphModel.getGraphVisible()` returns the currently visible view.
- Directed and undirected variants are available when an algorithm requires those semantics.

Use the visible graph for an operation the user reasonably expects to follow the current filter, such as a layout or a “selected view” analysis. Use the complete graph for data maintenance or an operation explicitly described as applying to all data. State this choice in the UI and in exported metadata.

## Read nodes, edges, and attributes

Tables define columns; nodes and edges carry row values.

```java
Graph graph = graphModel.getGraphVisible();
Table nodeTable = graphModel.getNodeTable();
Column score = nodeTable.getColumn("score");

if (score != null && Number.class.isAssignableFrom(score.getTypeClass())) {
    graph.readLock();
    try {
        for (Node node : graph.getNodes()) {
            Number value = (Number) node.getAttribute(score);
            // Copy only the values needed for later computation.
        }
    } finally {
        graph.readUnlock();
    }
}
```

Check that a column exists and has the expected type. Attribute values may be `null`. Use column IDs for stable programmatic identity and titles for user-facing labels.

### Snapshot, calculate, write back

For expensive analysis, keep lock duration short:

1. Under a read lock, copy the required IDs, adjacency, or values into plain Java structures.
2. Release the lock and perform the expensive calculation.
3. Reacquire the appropriate context, verify it is still valid, and write the results in a short phase.

This avoids blocking other graph consumers for the full calculation. It also gives cancellation checks natural places to run.

## Modify the graph

Create elements with the model's factory and add them to the intended graph:

```java
Graph graph = graphModel.getGraph();
GraphFactory factory = graphModel.factory();

Node source = factory.newNode("source-id");
source.setLabel("Source");
Node target = factory.newNode("target-id");
target.setLabel("Target");
Edge edge = factory.newEdge(source, target);

graph.writeLock();
try {
    graph.addNode(source);
    graph.addNode(target);
    graph.addEdge(edge);
} finally {
    graph.writeUnlock();
}
```

Never leave a lock open on an exception, cancellation, or early return. Always unlock in `finally`. Do not acquire a write lock while holding a read lock: lock upgrading can deadlock.

To add a computed attribute:

```java
Table table = graphModel.getNodeTable();
Column column = table.getColumn("my_score");
if (column == null) {
    column = table.addColumn("my_score", "My score", Double.class, null);
}

for (Node node : graph.getNodes()) {
    node.setAttribute(column, scoresById.get(node.getId()));
}
```

Choose an ID unlikely to collide with another plugin. If an existing column has the wrong type, do not overwrite it silently; report the conflict or use a namespaced ID.

## React to workspace changes

A long-lived window can register a `WorkspaceListener` service:

```java
@ServiceProvider(service = WorkspaceListener.class)
public final class WorkspaceTracker implements WorkspaceListener {
    @Override public void initialize(Workspace workspace) { }

    @Override
    public void select(Workspace workspace) {
        SwingUtilities.invokeLater(() -> refreshFor(workspace));
    }

    @Override public void unselect(Workspace workspace) { }
    @Override public void close(Workspace workspace) { }
    @Override public void disable() {
        SwingUtilities.invokeLater(this::clearUI);
    }
}
```

Callbacks are application events, not permission to perform expensive work. Schedule Swing changes on the EDT and delegate analysis to a background task.

## Observe graph changes

Gephi 0.11.2's Graph API offers polling observers:

```java
Graph graph = graphModel.getGraph();
GraphObserver observer = graphModel.createGraphObserver(graph, true);

if (observer.hasGraphChanged()) {
    GraphDiff diff = observer.getDiff();
    Node[] added = diff.getAddedNodes().toArray();
    Edge[] removed = diff.getRemovedEdges().toArray();
    // Coalesce changes and refresh the UI on the EDT.
}

observer.destroy();
```

The second argument controls whether the observer collects a `GraphDiff`; pass `false` when a simple changed/not-changed flag is enough. Call `getDiff()` only after `hasGraphChanged()` returned true on an observer created with differences enabled. That status call resets the observer. A `TableObserver` similarly detects node/edge table schema changes and can optionally collect a `TableDiff`.

Observers are not thread-safe. Poll one observer from one worker at a moderate rate, coalesce repeated updates, and destroy it when its window closes or workspace changes.

For visualization selection and mouse interaction, use a documented Visualization or Tools API listener rather than repeatedly scanning selection state. See [Desktop UI and events](./Desktop_UI_and_Events.md).

## Keep Swing responsive

Swing components must be created and mutated on the EDT. Parsing, graph-wide iteration, network I/O, text analysis, and waiting must not run there.

For a custom operation, implement `Runnable` and `LongTask`, then use `LongTaskExecutor`:

```java
public final class ScoreTask implements Runnable, LongTask {
    private volatile boolean cancelled;
    private ProgressTicket progressTicket;

    @Override
    public void run() {
        Progress.start(progressTicket, totalWork());
        try {
            for (WorkItem item : workItems()) {
                if (cancelled || Thread.currentThread().isInterrupted()) {
                    return;
                }
                process(item);
                Progress.progress(progressTicket);
            }
        } finally {
            Progress.finish(progressTicket);
        }
    }

    @Override
    public boolean cancel() {
        cancelled = true;
        return true;
    }

    @Override
    public void setProgressTicket(ProgressTicket ticket) {
        this.progressTicket = ticket;
    }
}
```

Launch it from a panel or action:

```java
LongTaskExecutor executor = new LongTaskExecutor(true, "My plugin");
ScoreTask task = new ScoreTask();

executor.setLongTaskListener(finishedTask ->
    SwingUtilities.invokeLater(() -> {
        runButton.setEnabled(true);
        refreshResults();
    })
);
executor.execute(task, task, "Calculating scores", throwable ->
    SwingUtilities.invokeLater(() -> showError(throwable))
);
```

Keep one executor per independent task stream; an executor runs only one task at a time. Disable duplicate Run actions while it is active. Wire Cancel to `executor.cancel()` and make `cancel()` fast and cooperative.

`SwingWorker` is also suitable when a task is owned entirely by one Swing view. Publish immutable intermediate results and apply them in `process()` or `done()`; do not set labels or models from `doInBackground()`.

## Threading checklist

- No expensive work in action listeners, constructors, `componentOpened()`, or graph callbacks.
- No Swing mutation from worker threads.
- Cancellation state is `volatile` or otherwise thread-safe and checked inside loops.
- Every lock is released in `finally`; cancellation never bypasses cleanup.
- Background results are tied to the workspace and parameters that produced them.
- Listeners, observers, timers, and executors are stopped when no longer needed.
- Exceptions reach the user through a concise message and reach logs with enough context for diagnosis.
