---
id: how-to-layout-a-graph
title: How to layout a graph
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

## Manually

Layouts are iterative algorithms that change nodes' position at each pass. Each layout algorithm needs to get a graph model to be able to query the network. Parameters can be set directly to the layout. See existing layout implementation [here](http://gephi.org/docs/toolkit/org/gephi/layout/plugin/AbstractLayout.html).

```java
//Run YifanHuLayout for 100 passes - The layout always takes the current visible view
YifanHuLayout layout = new YifanHuLayout(null, new StepDisplacement(1f));
layout.setGraphModel(graphModel);
layout.initAlgo();
layout.resetPropertiesValues();
layout.setOptimalDistance(200f);
 
for (int i = 0; i < 100 && layout.canAlgo(); i++) {
   layout.goAlgo();
}
layout.endAlgo();
```

## Automatically

This demo shows how to use the AutoLayout class to run layout programmatically.

You can set a layout duration, and an execution ratio for several layout. For instance you set 0.8 for a Yifan Hu algorithm and 0.2 for Label Adjust. If execution time is 100 seconds, the first algorithm run for 80 seconds and the second for 20 seconds. It also allows to change property values dynamically (at a certain ratio or interpolated if values are numerical).

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Generate a new random graph into a container
Container container = Lookup.getDefault().lookup(ContainerFactory.class).newContainer();
RandomGraph randomGraph = new RandomGraph();
randomGraph.setNumberOfNodes(500);
randomGraph.setWiringProbability(0.005);
randomGraph.generate(container.getLoader());
 
//Append container to graph structure
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
importController.process(container, new DefaultProcessor(), workspace);
 
//See if graph is well imported
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
DirectedGraph graph = graphModel.getDirectedGraph();
System.out.println("Nodes: " + graph.getNodeCount());
System.out.println("Edges: " + graph.getEdgeCount());
 
//Layout for 1 minute
AutoLayout autoLayout = new AutoLayout(1, TimeUnit.MINUTES);
autoLayout.setGraphModel(graphModel);
YifanHuLayout firstLayout = new YifanHuLayout(null, new StepDisplacement(1f));
ForceAtlasLayout secondLayout = new ForceAtlasLayout(null);
AutoLayout.DynamicProperty adjustBySizeProperty = AutoLayout.createDynamicProperty("forceAtlas.adjustSizes.name", Boolean.TRUE, 0.1f);//True after 10% of layout time
AutoLayout.DynamicProperty repulsionProperty = AutoLayout.createDynamicProperty("forceAtlas.repulsionStrength.name", new Double(500.), 0f);//500 for the complete period
autoLayout.addLayout(firstLayout, 0.5f);
autoLayout.addLayout(secondLayout, 0.5f, new AutoLayout.DynamicProperty[]{adjustBySizeProperty, repulsionProperty});
autoLayout.execute();
```