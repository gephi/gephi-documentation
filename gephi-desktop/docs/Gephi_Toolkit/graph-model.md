---
title: Create and manipulate graphs
sidebar_position: 4
---

Use the Graph API after an import has been processed, or to build a graph entirely in Java.

## Create an empty workspace

When no import can infer the graph configuration, create the workspace explicitly:

```java
import org.gephi.graph.api.Configuration;
import org.gephi.graph.api.GraphController;
import org.gephi.graph.api.GraphModel;
import org.gephi.project.api.ProjectController;
import org.gephi.project.api.Workspace;
import org.openide.util.Lookup;

ProjectController projectController = Lookup.getDefault()
        .lookup(ProjectController.class);
GraphController graphController = Lookup.getDefault()
        .lookup(GraphController.class);
Workspace workspace = projectController.openNewWorkspace(
        graphController.getDefaultConfigurationBuilder().build());

GraphModel graphModel = graphController.getGraphModel(workspace);
```

The default configuration is suitable for ordinary non-temporal node and edge values. Dynamic graphs and non-default ID types need a deliberate configuration; see [Dynamic graphs and workspaces](./dynamic-graphs-and-workspaces.md).

## Add nodes and edges

Create elements with the model's factory, then add them to a graph:

```java
import org.gephi.graph.api.DirectedGraph;
import org.gephi.graph.api.Edge;
import org.gephi.graph.api.Node;

Node alice = graphModel.factory().newNode("alice");
alice.setLabel("Alice");

Node bob = graphModel.factory().newNode("bob");
bob.setLabel("Bob");

Edge follows = graphModel.factory().newEdge(
        alice, bob, 0, 1.0, true);

DirectedGraph graph = graphModel.getDirectedGraph();
graph.addNode(alice);
graph.addNode(bob);
graph.addEdge(follows);
```

The arguments after the nodes are the edge type, weight, and directed flag. Node and edge IDs must match the ID types chosen in the workspace configuration.

:::note Choose the correct graph view

`DirectedGraph` preserves edge direction. `UndirectedGraph` treats edges as undirected. `Graph` works for mixed graphs. These interfaces are views of the same underlying store; requesting an undirected view does not rewrite the stored edges.

:::

## Read graph structure

```java
System.out.println(graph.getNodeCount());
System.out.println(graph.getEdgeCount());

Node node = graph.getNode("alice");
int degree = graph.getDegree(node);

for (Node neighbor : graph.getNeighbors(node)) {
    System.out.println(neighbor.getId());
}

for (Edge edge : graph.getEdges()) {
    System.out.printf("%s -> %s%n",
            edge.getSource().getId(), edge.getTarget().getId());
}
```

Prefer IDs for durable references. Labels are display data and do not have to be unique.

## Add and use attributes

Columns define an attribute's ID and Java type. Nodes or edges hold the values:

```java
import org.gephi.graph.api.Column;

Column activeColumn = graphModel.getNodeTable()
        .addColumn("active", Boolean.class);

alice.setAttribute(activeColumn, Boolean.TRUE);
Boolean active = (Boolean) alice.getAttribute(activeColumn);
```

Retrieve imported columns from the node or edge table:

```java
Column categoryColumn = graphModel.getNodeTable().getColumn("category");
Object category = alice.getAttribute(categoryColumn);
```

Using a `Column` reference is faster and safer inside a large loop than repeatedly looking up a value by its string ID.

Column types matter. Do not store a `String` such as `"42"` in an `Integer` column. Dynamic attributes use specialized map types rather than ordinary scalar values.

## Modify while iterating

Graph iterables hold read locks. Copy elements to an array before removing them from the same graph:

```java
for (Node node : graph.getNodes().toArray()) {
    if (graph.getDegree(node) == 0) {
        graph.removeNode(node);
    }
}
```

Removing directly inside `for (Node node : graph.getNodes())` can conflict with the iterable's lock.

See [`ManualGraph.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/ManualGraph.java) and [`ManipulateAttributes.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/ManipulateAttributes.java) for complete examples.
