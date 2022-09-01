---
id: how-to-manipulate-graph
title: How to manipulate Graph
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo shows basic features from [GraphAPI](http://gephi.org/docs/api/org/gephi/graph/api/package-summary.html), how to create and query a graph programmatically.

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Get a graph model - it exists because we have a workspace
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
 
//Create three nodes
Node n0 = graphModel.factory().newNode("n0");
n0.setLabel("Node 0");
Node n1 = graphModel.factory().newNode("n1");
n1.setLabel("Node 1");
Node n2 = graphModel.factory().newNode("n2");
n2.setLabel("Node 2");
 
//Create three edges
Edge e1 = graphModel.factory().newEdge(n1, n2, 1, true);
Edge e2 = graphModel.factory().newEdge(n0, n2, 2, true);
Edge e3 = graphModel.factory().newEdge(n2, n0, 2, true);   //This is e2's mutual edge
 
//Append as a Directed Graph
DirectedGraph directedGraph = graphModel.getDirectedGraph();
directedGraph.addNode(n0);
directedGraph.addNode(n1);
directedGraph.addNode(n2);
directedGraph.addEdge(e1);
directedGraph.addEdge(e2);
directedGraph.addEdge(e3);
 
//Count nodes and edges
System.out.println("Nodes: "+directedGraph.getNodeCount()+" Edges: "+directedGraph.getEdgeCount());
 
//Get a UndirectedGraph now and count edges
UndirectedGraph undirectedGraph = graphModel.getUndirectedGraph();
System.out.println("Edges: "+undirectedGraph.getEdgeCount());   //The mutual edge is automatically merged
 
//Iterate over nodes
for(Node n : directedGraph.getNodes()) {
    Node[] neighbors = directedGraph.getNeighbors(n).toArray();
    System.out.println(n.getLabel()+" has "+neighbors.length+" neighbors");
}
 
//Iterate over edges
for(Edge e : directedGraph.getEdges()) {
    System.out.println(e.getSource().getId()+" -> "+e.getTarget().getId());
}
 
//Find node by id
Node node2 = directedGraph.getNode("n2");
 
//Get degree
System.out.println("Node2 degree: "+directedGraph.getDegree(node2));
 
//Modify the graph while reading
//Due to locking, you need to use toArray() on Iterable to be able to modify
//the graph in a read loop
for(Node n : directedGraph.getNodes().toArray()) {
    directedGraph.removeNode(n);
}
```