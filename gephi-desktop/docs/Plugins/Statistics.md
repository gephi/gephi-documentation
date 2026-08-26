---
id: Statistics
title: Statistics
sidebar_position: 6
---

A statistics plugin computes a network result, may write node or edge columns, and returns an HTML report. The desktop Statistics panel discovers a `StatisticsBuilder` and, optionally, a matching `StatisticsUI`.

Add `statistics-api`, `graph-api`, `utils-longtask`, and `org-openide-util-lookup`.

## Run an installed statistic

Discover a `StatisticsBuilder` when your plugin needs an analysis already installed in Gephi:

```java
StatisticsBuilder builder = Lookup.getDefault()
    .lookupAll(StatisticsBuilder.class)
    .stream()
    .filter(candidate -> candidate.getName().equals(requestedName))
    .findFirst()
    .orElseThrow();

Statistics statistic = builder.getStatistics();
applyValidatedParameters(statistic, requestedParameters);
statistic.execute(graphModel);
String report = statistic.getReport();
```

Execute expensive statistics on a background task. If the returned object implements `LongTask`, supply a progress ticket and connect cancellation before calling `execute`. Treat builder names as presentation text and prefer a stable identifier or an explicit supported-builder mapping when automating selection. Implement the contracts below only when contributing a new statistic.

## Separate the three responsibilities

- `StatisticsBuilder` creates fresh algorithm instances and identifies their class.
- `Statistics` contains calculation state and produces the report.
- `StatisticsUI` integrates settings and a short result value into the desktop panel.

Register builders and UIs, not the algorithm itself:

```java
@ServiceProvider(service = StatisticsBuilder.class)
public final class SelfLoopBuilder implements StatisticsBuilder {
    @Override public String getName() { return "Self-loop count"; }
    @Override public Statistics getStatistics() { return new SelfLoopStatistic(); }
    @Override public Class<? extends Statistics> getStatisticsClass() {
        return SelfLoopStatistic.class;
    }
}
```

## Implement a cancellable statistic

```java
public final class SelfLoopStatistic implements Statistics, LongTask {
    private volatile boolean cancelled;
    private ProgressTicket progressTicket;
    private int edgeCount;
    private int selfLoopCount;

    @Override
    public void execute(GraphModel graphModel) {
        Graph graph = graphModel.getGraphVisible();
        edgeCount = graph.getEdgeCount();
        selfLoopCount = 0;
        Progress.start(progressTicket, edgeCount);

        graph.readLock();
        try {
            for (Edge edge : graph.getEdges()) {
                if (cancelled) {
                    return;
                }
                if (edge.isSelfLoop()) {
                    selfLoopCount++;
                }
                Progress.progress(progressTicket);
            }
        } finally {
            graph.readUnlock();
            Progress.finish(progressTicket);
        }
    }

    @Override
    public String getReport() {
        return "<html><body><h1>Self-loop count</h1>"
            + "<p>Visible edges: " + edgeCount + "</p>"
            + "<p>Self-loops: " + selfLoopCount + "</p>"
            + "</body></html>";
    }

    @Override public boolean cancel() { cancelled = true; return true; }
    @Override public void setProgressTicket(ProgressTicket ticket) {
        progressTicket = ticket;
    }
    public int getSelfLoopCount() { return selfLoopCount; }
}
```

The controller supplies the `GraphModel` and runs `LongTask` statistics in the long-task infrastructure. Use the visible graph if the measure should follow filtering. Say “visible graph” in the report so results are interpretable.

For an expensive algorithm, snapshot the necessary structure under the read lock, release it, calculate, then write results in a short final phase. See [Graph access and long tasks](./Graph_API_and_Threads.md#snapshot-calculate-write-back).

## Add result columns safely

Use the table from `GraphModel`; the old `AttributeModel` parameter no longer exists in the 0.11.2 `Statistics.execute` signature.

```java
Table nodeTable = graphModel.getNodeTable();
Column column = nodeTable.getColumn("org.example.my_score");
if (column == null) {
    column = nodeTable.addColumn(
        "org.example.my_score", "My score", Double.class, null);
} else if (!Double.class.equals(column.getTypeClass())) {
    throw new IllegalStateException("My score column has an incompatible type");
}

for (Node node : graph.getNodes()) {
    if (cancelled) {
        return;
    }
    node.setAttribute(column, scores.get(node.getId()));
}
```

Namespace a computed column ID. Reuse a compatible existing column so rerunning the statistic updates rather than duplicates it. Decide what cancellation means before writing: either compute fully and commit, or document that partial values may remain.

## Integrate settings and summary UI

Register a `StatisticsUI` whose class exactly matches the builder:

```java
@ServiceProvider(service = StatisticsUI.class)
public final class SelfLoopUI implements StatisticsUI {
    private SelfLoopStatistic statistic;

    @Override public JPanel getSettingsPanel() { return null; }
    @Override public void setup(Statistics value) {
        statistic = (SelfLoopStatistic) value;
    }
    @Override public void unsetup() { statistic = null; }
    @Override public Class<? extends Statistics> getStatisticsClass() {
        return SelfLoopStatistic.class;
    }
    @Override public String getValue() {
        return statistic == null ? null : Integer.toString(statistic.getSelfLoopCount());
    }
    @Override public String getDisplayName() { return "Self-loop count"; }
    @Override public String getShortDescription() { return "Counts visible self-loop edges."; }
    @Override public String getCategory() { return StatisticsUI.CATEGORY_NETWORK_OVERVIEW; }
    @Override public int getPosition() { return 800; }
}
```

If settings are needed, create the panel in `getSettingsPanel()`, load algorithm values in `setup()`, and copy validated values back in `unsetup()`. The algorithm must still validate settings because it can also be called programmatically.

## Report quality checklist

- Define the graph view, directionality, weights, missing-value policy, and parameters used.
- Escape user-derived strings before placing them in HTML.
- Handle zero nodes/edges without division by zero.
- Start, update, and finish progress in all paths.
- Check cancellation in outer and expensive inner loops.
- Make repeated runs replace or deliberately version their output columns.
- Unit-test tiny graphs with known answers, including self-loops, parallel edges, and disconnected components as relevant.
