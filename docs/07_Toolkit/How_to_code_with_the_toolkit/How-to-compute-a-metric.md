---
id: how-to-compute-a-metric
title: How to compute a metric
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

How to execute a metric algorithm and get the result for each node. The algorithm write values in a column it creates. It is also possible to get the statistics report, as in Gephi. See the [list of implemented metrics](http://gephi.org/docs/toolkit/org/gephi/statistics/spi/Statistics.html).

```java
//Get graph model and attribute model of current workspace
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
AttributeModel attributeModel = Lookup.getDefault().lookup(AttributeController.class).getModel();
 
//Get Centrality
GraphDistance distance = new GraphDistance();
distance.setDirected(true);
distance.execute(graphModel, attributeModel);
 
//Get Centrality column created
AttributeColumn col = attributeModel.getNodeTable().getColumn(GraphDistance.BETWEENNESS);
 
//Iterate over values
for (Node n : graph.getNodes()) {
   Double centrality = (Double)n.getNodeData().getAttributes().getValue(col.getIndex());
}
```