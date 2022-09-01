---
id: how-to-manipulate-attributes
title: How to manipulate attributes
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

Shows how to manipulate attributes. Attributes are the data associated to nodes and edges. The role of  [AttributeAPI](http://gephi.org/docs/api/org/gephi/data/attributes/api/package-summary.html) is to store the different columns information.

The demo shows how to add columns and values to nodes and how to iterate.

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Get controllers and models
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
 
//Import file
Container container;
try {
    File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/polblogs.gml").toURI());
    container = importController.importFile(file);
    container.getLoader().setEdgeDefault(EdgeDefault.DIRECTED);   //Force DIRECTED
    container.setAllowAutoNode(false);  //Don't create missing nodes
} catch (Exception ex) {
    ex.printStackTrace();
    return;
}
 
//Append imported data to GraphAPI
importController.process(container, new DefaultProcessor(), workspace);
 
//List node columns
AttributeController ac = Lookup.getDefault().lookup(AttributeController.class);
AttributeModel model = ac.getModel();
for (AttributeColumn col : model.getNodeTable().getColumns()) {
    System.out.println(col);
}
 
//Add boolean column
AttributeColumn testCol = model.getNodeTable().addColumn("test", AttributeType.BOOLEAN);
 
//Write values to nodes
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
for (Node n : graphModel.getGraph().getNodes()) {
    n.getNodeData().getAttributes().setValue(testCol.getIndex(), Boolean.TRUE);
}
 
//Iterate values - fastest
AttributeColumn sourceCol = model.getNodeTable().getColumn("source");
for (Node n : graphModel.getGraph().getNodes()) {
    System.out.println(n.getNodeData().getAttributes().getValue(sourceCol.getIndex()));
}
 
//Iterate values - normal
for (Node n : graphModel.getGraph().getNodes()) {
    System.out.println(n.getNodeData().getAttributes().getValue("source"));
}
```