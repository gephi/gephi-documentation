---
title: Core concepts
sidebar_position: 3
---

Gephi's API comes from a modular desktop application. The Toolkit keeps this architecture even though it runs without the Desktop interface. Understanding its services and document lifecycle makes the examples much easier to follow.

## Lookup: ask Gephi for a service

Code such as this can look unusual if you have not used the NetBeans Platform:

```java
ImportController importController = Lookup.getDefault()
        .lookup(ImportController.class);
```

`Lookup` is a registry of services. Gephi modules register implementations, and your code asks for one by its public API type. You do not call `new ImportController(...)` because the concrete implementation and its dependencies are managed by the Toolkit.

You can read the expression as: **give me the Toolkit service that implements `ImportController`**.

Frequently used services include:

| Service | Responsibility |
| --- | --- |
| `ImportController` | Parse inputs and process import containers |
| `ExportController` | Find and run exporters |
| `ProjectController` | Create and switch projects and workspaces |
| `GraphController` | Find the graph model for a workspace |
| `FilterController` | Build and execute filter queries |
| `StatisticsController` | Execute statistics algorithms |
| `AppearanceController` | Apply color, size, and label transformations |
| `PreviewController` | Configure and refresh rendered output |

Look up a controller once and reuse the reference in the current operation. A `null` result usually means the module providing that service is absent from the classpath.

## Projects, workspaces, containers, and models

These objects belong to two different layers. Projects and workspaces organize live Gephi documents. A container is an independent, temporary representation of graph data that can be populated by importers, generators, or application code and then consumed by a processor.

```text
Toolkit JVM
└── ProjectController
    └── Project
        ├── Workspace A
        │   ├── GraphModel
        │   ├── AppearanceModel
        │   ├── PreviewModel
        │   └── other workspace-specific models
        └── Workspace B
            └── its own graph and models

Importer, generator, or application code
└── Container (temporary transferable graph data)
    └── ImportController.process(...)
        └── creates, fills, or updates a Workspace
```

### Project

A **project** groups one or more workspaces. It is comparable to a Gephi Desktop project containing several graph tabs. `ProjectController` manages the open projects and tracks the current project and current workspace.

:::warning `newProject()` closes the current project

Calling `projectController.newProject()` creates and opens a new project with an initial workspace. It also closes the previously current project, so it should represent an intentional application-level boundary rather than a routine import step.

In a multi-threaded server, current project and workspace state is shared between requests. See [Concurrency and server applications](./concurrency-and-server-applications.md) before initializing graphs concurrently.

:::

### Workspace

A **workspace** is one working graph document, comparable to one tab in Gephi Desktop. It owns the graph and the state of modules such as appearance, filters, preview, and statistics.

The graph itself is reached through the workspace's `GraphModel`:

```java
GraphController graphController = Lookup.getDefault()
        .lookup(GraphController.class);
GraphModel graphModel = graphController.getGraphModel(workspace);
```

Most models are created lazily the first time their controller is asked for them. A controller is generally an application-level service; a model contains the state for one workspace.

Pass the `Workspace` explicitly whenever an API offers that overload. This makes the code safe when several workspaces exist and avoids depending on whichever workspace happens to be current.

### Container

A **container is not a workspace** and does not belong to a project. It is a temporary transfer object containing node, edge, and column drafts. File and database importers commonly populate containers, but graph generators and application code can populate them as well. Different processors can then use that data to create a workspace, append to an existing compatible workspace, or handle it in another supported way.

A typical file import uses a container in two phases:

```java
Container container = importController.importFile(input);
container.getLoader().setAllowAutoNode(false);

Workspace workspace = importController.process(container);
```

Before processing, configure the loader and inspect the import report. `process` closes the loading phase, chooses a graph configuration from the container metadata, creates real graph objects in a workspace, and returns that workspace. Once a processor has transferred the drafts, continue with `GraphModel`, `Graph`, `Node`, and `Edge`; that container has completed its role in the operation.

## Choose the correct initialization path

The correct method depends on where the graph data comes from and whether a compatible workspace already exists.

| Situation | Initialization | Result |
| --- | --- | --- |
| Import or generate data into a new workspace | `importController.process(container)` | Derives the graph configuration from the container. Opens a new workspace in the current project, or creates a project first if none is open. |
| Build a simple graph directly with the Graph API | `projectController.newProject()`, then `getCurrentWorkspace()` | Creates a new project and its initial workspace. The `GraphModel` uses the default configuration when first requested. |
| Build an empty graph with a deliberate configuration | `projectController.openNewWorkspace(configuration)` | Opens a new configured workspace in the current project, or creates a project first if needed. |
| Add imported data to an existing compatible workspace | `process(container, new AppendProcessor(), workspace)` | Reuses that workspace and validates the incoming data against its existing graph configuration. |
| Create a second version of an existing graph | `projectController.duplicateWorkspace(workspace)` | Creates another workspace with copied data and models. |

`openNewWorkspace(...)` always makes the returned workspace current. If a project is already open, it adds the workspace to that project. If no project exists, it creates a project and its initial workspace.

:::warning The graph configuration is fixed at workspace initialization

In 0.11.2, ID types, temporal representation, edge-label type, and dynamic weight type must be correct when the `GraphModel` is created. An import container carries enough metadata for `process(container)` to derive these choices. This is why imported data should not normally be preceded by `newProject()` and a default graph model.

:::

## Direct graph construction without a container

Most demos start from imported or generated drafts:

```java
Container container = importController.importFile(input);
Workspace workspace = importController.process(container);
```

Code that creates nodes and edges directly through the Graph API has no container for `ImportController` to process. It must initialize an empty workspace through `ProjectController` instead.

For a simple graph using default settings, this concise form is sufficient:

```java
projectController.newProject();
Workspace workspace = projectController.getCurrentWorkspace();
```

This more explicit form is useful when the workspace needs a particular configuration:

```java
Configuration configuration = graphController
        .getDefaultConfigurationBuilder()
        .build();
Workspace workspace = projectController.openNewWorkspace(configuration);
```

For basic static nodes and edges, both paths provide a suitable empty workspace. The important distinction is **who has the information needed to choose the workspace configuration**. A container lets its processor choose from the metadata it carries. Without a container, your code accepts the defaults or supplies the configuration itself.

## Full graph and visible graph

A workspace can expose several views over the same graph store:

- `graphModel.getGraph()` returns the main graph;
- `graphModel.getGraphVisible()` returns the current visible view;
- typed variants such as `getDirectedGraph()` and `getUndirectedGraphVisible()` change how edges are interpreted.

Filters produce a `GraphView`. Setting it as visible does not delete elements from the main graph:

```java
GraphView view = filterController.filter(query);
graphModel.setVisibleView(view);
Graph filteredGraph = graphModel.getGraphVisible();
```

Layouts normally operate on the visible view. Graph exporters can be configured to export either the full graph or only that view.

## A practical rule for API navigation

When translating a Desktop action into code, find the corresponding module, then identify:

1. the controller obtained through `Lookup`;
2. the workspace-specific model, if that module has one;
3. the algorithm, filter, transformer, importer, or exporter to configure;
4. the method that executes it.

The [Javadoc](https://javadoc.io/doc/org.gephi/gephi-toolkit/latest/index.html) documents API contracts. The [Toolkit demos](https://github.com/gephi/gephi-toolkit-demos) show which implementations are normally instantiated directly and which services come from `Lookup`.
