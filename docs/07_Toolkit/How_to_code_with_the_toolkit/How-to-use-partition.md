---
id: how-to-use-partition
title: How to use partition
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo shows how to get partitions and apply color transformation to them. See also [PartitionAPI](http://gephi.org/docs/api/org/gephi/partition/api/package-summary.html) documentation (uncommented).
Partitions are always created from an [AttributeColumn](http://gephi.org/docs/api/org/gephi/data/attributes/api/AttributeColumn.html), in the data since import or computed from an algorithm. The demo so the following tasks:
* Import a graph file.
* Create and export to *partition1.pdf* the graph colored from the **source** column.
* Run modularity algorithm, detecting communities. The algorithm create a new column and label nodes with a community number.
* Create and export to *partition2.pdf* the graph colored from the **modularity_class** column
* Partitions are built from the `PartitionController` service. Then the color transformer is created and passed with the partition to the controller to apply colors.

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
    container.getLoader().setEdgeDefault(EdgeDefault.DIRECTED);   //Force DIRECTED
} catch (Exception ex) {
    ex.printStackTrace();
    return;
}
 
//Append imported data to GraphAPI
importController.process(container, new DefaultProcessor(), workspace);
 
//See if graph is well imported
DirectedGraph graph = graphModel.getDirectedGraph();
System.out.println("Nodes: " + graph.getNodeCount());
System.out.println("Edges: " + graph.getEdgeCount());
 
//Partition with 'source' column, which is in the data
PartitionController partitionController = Lookup.getDefault().lookup(PartitionController.class);
Partition p = partitionController.buildPartition(attributeModel.getNodeTable().getColumn("source"), graph);
NodeColorTransformer nodeColorTransformer = new NodeColorTransformer();
nodeColorTransformer.randomizeColors(p);
partitionController.transform(p, nodeColorTransformer);
 
//Export
ExportController ec = Lookup.getDefault().lookup(ExportController.class);
try {
    ec.exportFile(new File("partition1.pdf"));
} catch (IOException ex) {
    ex.printStackTrace();
    return;
}
 
//Run modularity algorithm - community detection
Modularity modularity = new Modularity();
modularity.execute(graphModel, attributeModel);
 
//Partition with 'modularity_class', just created by Modularity algorithm
AttributeColumn modColumn = attributeModel.getNodeTable().getColumn(Modularity.MODULARITY_CLASS);
Partition p2 = partitionController.buildPartition(modColumn, graph);
System.out.println(p2.getPartsCount() + " partitions found");
NodeColorTransformer nodeColorTransformer2 = new NodeColorTransformer();
nodeColorTransformer2.randomizeColors(p2);
partitionController.transform(p2, nodeColorTransformer2);
 
//Export
try {
    ec.exportFile(new File("partition2.pdf"));
} catch (IOException ex) {
    ex.printStackTrace();
    return;
}
```