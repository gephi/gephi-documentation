---
title: Concurrency and server applications
sidebar_position: 9
---

The Toolkit can run inside a server application, but its project lifecycle is not isolated per request or per thread. `Lookup.getDefault()` returns application-wide services, and `ProjectController` manages one current project. That project, in turn, has one current workspace.

This distinction matters in a SaaS application: thread-safe graph operations do not automatically provide request isolation.

## Separate graph locking from request isolation

The graph store exposes read and write locks and protects graph data structures during individual operations. This allows algorithms and application code to coordinate access to a particular graph.

Project selection is a different layer. The current project and workspace are shared state, not `ThreadLocal` values. In particular, `projectController.newProject()` closes the project that is current at that moment. No-argument controller methods also resolve models through whichever workspace is current when the call occurs.

Although the 0.11.2 `ProjectController` implementation synchronizes individual lifecycle methods, a sequence of calls is not one atomic transaction. Without application-level coordination, requests can interleave like this:

```text
Request A: newProject()      -> Project A is current
Request B: newProject()      -> Project A is closed; Project B is current
Request A: getCurrentWorkspace() -> receives Project B's workspace
```

Explicit `Workspace` and `GraphModel` references prevent accidental no-argument lookups, but they do not stop another request from closing or replacing the current project during initialization.

## Use one critical section for the complete Toolkit workflow

The simplest safe baseline in a request-based application is to serialize the complete Gephi portion of each request. Perform unrelated parsing or business calculations before entering the critical section, then keep project creation, graph construction or import, algorithms, export, and cleanup inside it.

```java
private static final Object GEPHI_LOCK = new Object();

public String buildGraph(PreparedData data) {
    synchronized (GEPHI_LOCK) {
        ProjectController projectController = Lookup.getDefault()
                .lookup(ProjectController.class);
        GraphController graphController = Lookup.getDefault()
                .lookup(GraphController.class);

        Project project = projectController.newProject();
        Workspace workspace = projectController.getCurrentWorkspace();

        try {
            GraphModel graphModel = graphController.getGraphModel(workspace);

            // Populate this graph, run algorithms with graphModel,
            // and configure exporters with this workspace explicitly.
            return export(workspace);
        } finally {
            if (projectController.getCurrentProject() == project) {
                projectController.closeCurrentProject();
            }
        }
    }
}
```

The identity check in `finally` documents which request owns the project and avoids closing an unrelated project if the code is later reorganized. It does not replace the lock: interference may already have occurred before cleanup.

The same rule applies to `importController.process(container)`. That convenient overload uses the current project or creates one, so the call and all subsequent work on its returned workspace belong in the same critical section.

:::warning A lock works only when every caller uses it

A `static` lock coordinates callers in the same class loader only. Put Toolkit access behind one application service or another shared coordinator, and prevent other code paths from manipulating projects outside that boundary.

:::

## Prefer explicit objects after initialization

Within the critical section, retain and pass the objects owned by the request:

- obtain models with `graphController.getGraphModel(workspace)`;
- configure layouts with that `GraphModel`;
- set the `Workspace` explicitly on exporters;
- avoid no-argument model accessors that depend on the current workspace;
- close only the project created by that request.

These practices make ownership visible and reduce accidental dependence on mutable current state. They are also useful in single-threaded applications with several workspaces.

## Choose process isolation for real parallelism

Serializing Toolkit work is safe but limits Gephi processing to one request at a time in each JVM. If layouts, statistics, or exports must run truly in parallel with strong tenant isolation, run independent Toolkit instances in separate JVM processes or workers. Each process then has its own default lookup, controllers, current project, and workspace state.

Multiple workspaces in one project can support carefully controlled parallel algorithms when every algorithm receives a different explicit `GraphModel`. This is not equivalent to isolated concurrent request lifecycles: project and workspace selection remain shared, and any API that consults current state can still couple the tasks.

## Lock compound access to one graph when needed

Do not mutate the same graph from unrelated threads. When several operations on one graph must be observed as a unit, use its write lock and always release it in `finally`:

```java
Graph graph = graphModel.getGraph();
graph.writeLock();
try {
    // Perform a compound graph update.
} finally {
    graph.writeUnlock();
}
```

This graph lock protects a graph operation; it does not protect the global project lifecycle. Use the application-level critical section or process isolation for that broader boundary.

See the [`ProjectController` 0.11.2 contract](https://javadoc.io/doc/org.gephi/gephi-toolkit/latest/org/gephi/project/api/ProjectController.html) for project and workspace lifecycle behavior.
