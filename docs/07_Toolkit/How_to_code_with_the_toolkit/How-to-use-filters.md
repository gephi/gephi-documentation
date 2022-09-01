---
id: how-to-use-filters
title: How to use filters
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo shows how to create and execute filter queries.

The demo creates three filters queries and execute them:
* Filter degrees, remove nodes with degree < 10
* Filter with partition, keep nodes with 'source' column equal to 'Blogorama'
* Intersection between degrees and partition, AND filter with two precedent filters
* Ego filter

When a filter query is executed, it creates a new [GraphView](http://gephi.org/docs/api/org/gephi/graph/api/GraphView.html), which is a copy of the graph structure that went through the filter pipeline. Several filters can be chained by setting sub-queries. A query is a tree where the root is the last executed filter.

See also [FiltersAPI](http://gephi.org/docs/api/org/gephi/filters/api/package-summary.html) documentation and find [all filters that inherit from Filter](http://gephi.org/docs/toolkit/org/gephi/filters/spi/Filter.html).

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Get controllers and models
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
AttributeModel attributeModel = Lookup.getDefault().lookup(AttributeController.class).getModel();
 
//Import file
Container container;
try {
    File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/polblogs.gml").toURI());
    container = importController.importFile(file);
} catch (Exception ex) {
    ex.printStackTrace();
    return;
}
 
//Append imported data to GraphAPI
importController.process(container, new DefaultProcessor(), workspace);
 
//Filter, remove degree < 10
FilterController filterController = Lookup.getDefault().lookup(FilterController.class);
DegreeRangeFilter degreeFilter = new DegreeRangeFilter();
degreeFilter.init(graphModel.getGraph());
degreeFilter.setRange(new Range(10, Integer.MAX_VALUE));     //Remove nodes with degree < 10
Query query = filterController.createQuery(degreeFilter);
GraphView view = filterController.filter(query);
graphModel.setVisibleView(view);    //Set the filter result as the visible view
 
//Count nodes and edges on filtered graph
DirectedGraph graph = graphModel.getDirectedGraphVisible();
System.out.println("Nodes: " + graph.getNodeCount() + " Edges: " + graph.getEdgeCount());
 
//Filter, keep partition 'Blogarama'. Build partition with 'source' column in the data
PartitionController partitionController = Lookup.getDefault().lookup(PartitionController.class);
Partition p = partitionController.buildPartition(attributeModel.getNodeTable().getColumn("source"), graph);
NodePartitionFilter partitionFilter = new NodePartitionFilter(p);
partitionFilter.unselectAll();
partitionFilter.addPart(p.getPartFromValue("Blogarama"));
Query query2 = filterController.createQuery(partitionFilter);
GraphView view2 = filterController.filter(query2);
graphModel.setVisibleView(view2);    //Set the filter result as the visible view
 
//Count nodes and edges on filtered graph
graph = graphModel.getDirectedGraphVisible();
System.out.println("Nodes: " + graph.getNodeCount() + " Edges: " + graph.getEdgeCount());
 
//Combine two filters with AND - Set query and query2 as sub-query of AND
IntersectionOperator intersectionOperator = new IntersectionOperator();
Query query3 = filterController.createQuery(intersectionOperator);
filterController.setSubQuery(query3, query);
filterController.setSubQuery(query3, query2);
GraphView view3 = filterController.filter(query3);
graphModel.setVisibleView(view3);    //Set the filter result as the visible view
 
//Count nodes and edges on filtered graph
graph = graphModel.getDirectedGraphVisible();
System.out.println("Nodes: " + graph.getNodeCount() + " Edges: " + graph.getEdgeCount());
 
//Ego filter
EgoFilter egoFilter = new EgoFilter();
egoFilter.setPattern("obamablog.com"); //Regex accepted
egoFilter.setDepth(1);
Query queryEgo = filterController.createQuery(egoFilter);
GraphView viewEgo = filterController.filter(queryEgo);
graphModel.setVisibleView(viewEgo);    //Set the filter result as the visible view
 
//Count nodes and edges on filtered graph
graph = graphModel.getDirectedGraphVisible();
System.out.println("Nodes: " + graph.getNodeCount() + " Edges: " + graph.getEdgeCount());
```