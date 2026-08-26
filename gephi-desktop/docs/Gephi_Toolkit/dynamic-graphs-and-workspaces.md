---
title: Dynamic graphs and workspaces
sidebar_position: 8
---

Temporal representation and element ID types belong to a workspace's graph configuration. In Gephi 0.11.2 that configuration is immutable, so it must be correct when the workspace is created.

## Let imports create the workspace

For imported or generated data, this is the safest workflow:

```java
Container container = importController.importFile(new File("dynamic.gexf"));
Workspace workspace = importController.process(container);
GraphModel graphModel = graphController.getGraphModel(workspace);
```

The processor reads the container metadata and configures timestamp versus interval time representation, ID types, edge labels, and dynamic edge weights as needed.

This replaces the pre-0.11 pattern of creating a default empty workspace first and processing dynamic data into it.

## Generate dynamic sample data

The bundled [`DynamicGraph`](https://github.com/gephi/gephi/blob/master/modules/GeneratorPlugin/src/main/java/org/gephi/io/generator/plugin/DynamicGraph.java) class is a graph generator, despite its general-sounding name. It is useful for examples, tests, and experiments that need temporal data without an input file. The generator creates timestamped node presence, a dynamic integer node column named `score`, and dynamic edge weights.

Like the other bundled generators, it writes drafts into a container. Processing that container lets Gephi derive the required timestamp and dynamic-weight configuration:

```java
import org.gephi.io.generator.plugin.DynamicGraph;
import org.gephi.io.importer.api.Container;
import org.openide.util.Lookup;

Container container = Lookup.getDefault()
        .lookup(Container.Factory.class)
        .newContainer();

DynamicGraph generator = new DynamicGraph();
generator.generate(container.getLoader());

Workspace workspace = importController.process(container);
GraphModel graphModel = graphController.getGraphModel(workspace);
```

`DynamicGraph` is not the API used to query arbitrary temporal graphs. Once its generated container has been processed, use `GraphModel`, element timestamps or intervals, dynamic columns, and time-aware statistics in the same way as for imported temporal data.

## Create a configured empty workspace

When constructing a graph manually, choose its temporal representation before adding data:

```java
import org.gephi.graph.api.Configuration;
import org.gephi.graph.api.TimeRepresentation;

Configuration configuration = Configuration.builder()
        .timeRepresentation(TimeRepresentation.TIMESTAMP)
        .build();
Workspace workspace = projectController.openNewWorkspace(configuration);
```

Use `TimeRepresentation.INTERVAL` when values describe start/end intervals. Use `TIMESTAMP` when values are observations at discrete times. Do not attempt to change this choice later; create another correctly configured workspace instead.

## Add temporal presence

For interval time representation, a node can be present from a start time to an end time:

```java
import org.gephi.graph.api.Interval;

node.addInterval(new Interval(1990, 2000));
```

Dynamic columns use map types such as `TimestampIntegerMap`, `TimestampDoubleMap`, or their interval equivalents. Cast only after checking the column's type, especially for user-supplied files.

## Merge several snapshots

Several containers can be merged into temporal data:

```java
import org.gephi.io.processor.plugin.MergeProcessor;

Container[] snapshots = {first, second, third};
Workspace workspace = importController.process(
        snapshots, new MergeProcessor(), null)[0];
```

Passing `null` lets the processor create a correctly configured destination. Element IDs determine which nodes and edges across snapshots represent the same entity.

The [`ImportDynamic.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/ImportDynamic.java) demo reads timestamped values after merging snapshots. [`DynamicMetric.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/DynamicMetric.java) computes degree over time windows.

## Work with several workspaces

Keep each workspace and its models together in your application code:

```java
Workspace firstWorkspace = importController.process(firstContainer);
GraphModel firstModel = graphController.getGraphModel(firstWorkspace);

Workspace secondWorkspace = importController.process(secondContainer);
GraphModel secondModel = graphController.getGraphModel(secondWorkspace);
```

Avoid no-argument accessors such as `getGraphModel()` or `getModel()` in multi-workspace code. They use the current workspace, which can change as projects and workspaces are opened.

Independent layouts can run concurrently on different workspaces when each layout receives its own explicit `GraphModel` and the project lifecycle remains stable, as shown in [`ParallelWorkspace.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/ParallelWorkspace.java). This does not make concurrent project creation or current-workspace access request-safe. Do not mutate the same graph from unrelated threads, and see [Concurrency and server applications](./concurrency-and-server-applications.md) before using the Toolkit from concurrent requests.

## Migrate code written for older Toolkit versions

Replace this old import sequence:

```java
projectController.newProject();
Workspace workspace = projectController.getCurrentWorkspace();
importController.process(container, new DefaultProcessor(), workspace);
```

with:

```java
Workspace workspace = importController.process(container);
```

For a genuinely empty graph, use `openNewWorkspace(configuration)`. For appending data, keep the existing workspace and use `AppendProcessor`; the existing graph configuration must already be compatible with the incoming container.
