---
id: how-to-execute-a-metric-over-time
title: How to execute a metric over time
---

**NOTE: this example is not up to date with latest Gephi 0.9.2 It needs to be reviewed. Now, dynamics are part of the core Graph API https://gephi.org/gephi/0.9.2/apidocs**

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo main aim is to show how to execute a metric on a dynamic graph. It does the following steps:

* Create a project and a workspace, it is mandatory.
* Generate a random graph into a container.
* Append this container to the main graph structure.
* Create a *date* column (a simple `INT` between 1990 and 2010) and set random values for each node.
* Use the Data Laboratory merge strategy to convert this column to a real time interval column.
* Get a `DynamicGraph` and count the number of nodes for each year. That shows how to get the subgraph for a particular period.
* Put the result into a dynamic data structure, that shows how to store result associated to a particular period.
* Create a `InOutDegree` metric, execute it for each year and collect the results in a dynamic data structure.

Instead of generating a random 'static' graph and add a fake date column, a dynamic network can be imported with the GEXF file format.

The demo shows how to get a `DynamicGraph` instance, and get sub graphs for a particular time period. Note that the dynamic graph maintains only one sub graph at one time, so keeping multiple `Graph` instances for further analysis won't work.

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

//Add a fake 'Date' column to nodes
AttributeModel attributeModel = Lookup.getDefault().lookup(AttributeController.class).getModel();
AttributeColumn dateColumn = attributeModel.getNodeTable().addColumn("date", AttributeType.INT);

//Add a random date to all nodes - between 1990 and 2010
GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
Graph graph = graphModel.getGraph();
Random random = new Random();
for (Node n : graph.getNodes()) {
   Integer randomDataValue = new Integer(random.nextInt(21) + 1990);
   n.getNodeData().getAttributes().setValue(dateColumn.getIndex(), randomDataValue);
}
 
//Use the Data laboratory merge strategy to convert this Integer column to the TimeInterval column
AttributeColumnsMergeStrategiesController dataLabController = Lookup.getDefault().lookup(AttributeColumnsMergeStrategiesController.class);
dataLabController.mergeNumericColumnsToTimeInterval(attributeModel.getNodeTable(), dateColumn, null, 1990, 2010);

//Use the DynamicModel dynamic graph factory
DynamicModel dynamicModel = Lookup.getDefault().lookup(DynamicController.class).getModel();
DynamicGraph dynamicGraph = dynamicModel.createDynamicGraph(graph);

//Get the number of nodes for each period of one year - and store it in a proper data structure
DynamicInteger numberofNodes = new DynamicInteger();
for (int i = 1990; i < 2009; i++) {
    int low = i;
    int high = i + 1;
    Graph subGraph = dynamicGraph.getSnapshotGraph(low, high);
    int count = subGraph.getNodeCount();
    //DynamicInteger is immutable
    numberofNodes = new DynamicInteger(numberofNodes, new Interval<Integer>(low, high, count));
}

//Get all intervals and print values
System.out.println("Number of nodes:");
for (Interval<Integer> interval : numberofNodes.getIntervals(Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY)) {
    int low = (int) interval.getLow();
    int high = (int) interval.getHigh();
    System.out.println(low + "-" + high + "  ->  " + interval.getValue());
}
 
//Create a InOutDegree metric to get the average degree for each time interval
InOutDegree inOutDegree = new InOutDegree();
 
//Compute the metric for each subgraph and put result in a DynamicDouble
DynamicDouble averageDegree = new DynamicDouble();
for (int i = 1990; i < 2009; i++) {
    int low = i;
    int high = i + 1;
    Graph subGraph = dynamicGraph.getSnapshotGraph(low, high);
    inOutDegree.execute(subGraph, attributeModel);
    double result = inOutDegree.getAverageDegree();
    averageDegree = new DynamicDouble(averageDegree, new Interval<Double>(low, high, result));
}
 
//Get all intervals and print values
System.out.println("Average degree:");
for (Interval<Double> interval : averageDegree.getIntervals(Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY)) {
    int low = (int) interval.getLow();
    int high = (int) interval.getHigh();
    System.out.println(low + "-" + high + "  ->  " + interval.getValue());
}
```