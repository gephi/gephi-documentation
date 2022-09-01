---
id: how-to-import-dynamic-network
title: How to import dynamic network
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo shows how to create a dynamic network from a set of 'static' files using the `DynamicProcessor` (Time Frame Import). It also shows how to read and filter dynamic attributes. See [AttributesAPI](http://gephi.org/docs/api/org/gephi/data/attributes/type/package-summary.html) types documentation to learn more about dynamic types.

It uses a simple dataset of three GEXF files. The graph has a *price* attribute, which will therefore be set a `DYNAMIC_INTEGER` type automatically. It does the following steps:

* Create a project and a workspace, it is mandatory.
* Import *timeframe1.gexf* into an import container.
* Create an configure the `DynamicProcessor`.
* Append the container for the time *2007*.
* Import timeframe2.gexf and append it for *2008*.
* Import timeframe3.gexf and append it for *2009*.
* Read the *price* value for each node, one can see the value for each interval.
* Use `AVERAGE` and `MAX` evaluators to see how to get a Integer result from a `DynamicInteger` for any time interval.
* Create a dynamic range and attribute range filter queries. The aim is to keep the graph [2007-2008] with average price superior or equal to seven.
* Add the filter query to the filter model and execute it. Get a `GraphView` as a result.
* Verify the node *4* doesn't belong to the result, as it's average price is lower than seven.

The `DynamicProcessor` is able to import `DOUBLE` (default) or `DATE` values.

When filtering the graph using a `DynamicRangeFilter`, parent filter queries (e.g executed after) are using the visible interval to get a simple result from a dynamic value. In this example that means the `AttributeRangeFilter` is getting the *price* from the [2007, 2008] interval only. The filter uses the default `Estimator` set in the `DynamicModel`. One can set these default estimators from the `DynamicController`.

```java
public void script() {
	//Init a project - and therefore a workspace
    ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
    pc.newProject();
    Workspace workspace = pc.getCurrentWorkspace();
 
    //Import first file
    ImportController importController = Lookup.getDefault().lookup(ImportController.class);
    Container container;
    try {
        File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/timeframe1.gexf").toURI());
        container = importController.importFile(file);
    } catch (Exception ex) {
        ex.printStackTrace();
        return;
    }
 
    //Initialize the DynamicProcessor - which will append the container to the workspace
    DynamicProcessor dynamicProcessor = new DynamicProcessor();
    dynamicProcessor.setDateMode(false);    //Set 'true' if you set real dates (ex: yyyy-mm-dd), it's double otherwise
    dynamicProcessor.setLabelmatching(true);   //Set 'true' if node matching is done on labels instead of ids
 
    //Set date for this file
    dynamicProcessor.setDate("2007");
 
    //Process the container using the DynamicProcessor
    importController.process(container, dynamicProcessor, workspace);
 
    //Import second file
    try {
        File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/timeframe2.gexf").toURI());
        container = importController.importFile(file);
    } catch (Exception ex) {
        ex.printStackTrace();
        return;
    }
 
    //Set date for this file
    dynamicProcessor.setDate("2008");
 
    //Process the second container
    importController.process(container, dynamicProcessor, workspace);
 
    //Import third file
    try {
        File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/timeframe3.gexf").toURI());
        container = importController.importFile(file);
    } catch (Exception ex) {
        ex.printStackTrace();
        return;
    }
 
    //Set date for this file
    dynamicProcessor.setDate("2009");
 
    //Process the third container
    importController.process(container, dynamicProcessor, workspace);
 
    //Get the price attribute
    GraphModel graphModel = Lookup.getDefault().lookup(GraphController.class).getModel();
    Graph graph = graphModel.getGraph();
    for (Node n : graph.getNodes()) {
        DynamicInteger value = (DynamicInteger) n.getNodeData().getAttributes().getValue("price");
        System.out.println("'" + n.getNodeData().getLabel() + "': " + value.toString());
    }
 
    //Get the price attribute in average - learn more about ESTIMATOR
    for (Node n : graph.getNodes()) {
        DynamicInteger value = (DynamicInteger) n.getNodeData().getAttributes().getValue("price");
 
        Integer priceFrom2007to2009Avg = value.getValue(new Interval(2007, 2009), Estimator.AVERAGE);
        System.out.println("With AVERAGE estimator: '" + n.getNodeData().getLabel() + "': " + priceFrom2007to2009Avg);
 
        Integer priceFrom2007to2009Max = value.getValue(new Interval(2007, 2009), Estimator.MAX);
        System.out.println("With MAX estimator: '" + n.getNodeData().getLabel() + "': " + priceFrom2007to2009Max);
    }
 
    //Create a dynamic range filter query
    FilterController filterController = Lookup.getDefault().lookup(FilterController.class);
    FilterBuilder[] builders = Lookup.getDefault().lookup(DynamicRangeBuilder.class).getBuilders();
    DynamicRangeFilter dynamicRangeFilter = (DynamicRangeFilter) builders[0].getFilter();     //There is only one TIME_INTERVAL column, so it's always the [0] builder
    Query dynamicQuery = filterController.createQuery(dynamicRangeFilter);
 
    //Create a attribute range filter query - on the price column
    AttributeModel attributeModel = Lookup.getDefault().lookup(AttributeController.class).getModel();
    AttributeColumn priceCol = attributeModel.getNodeTable().getColumn("price");
    AttributeRangeBuilder.AttributeRangeFilter attributeRangeFilter = new AttributeRangeBuilder.AttributeRangeFilter(priceCol);
    Query priceQuery = filterController.createQuery(attributeRangeFilter);
 
    //Set dynamic query as child of price query
    filterController.add(priceQuery);
    filterController.add(dynamicQuery);
    filterController.setSubQuery(priceQuery, dynamicQuery);
 
    //Set the filters parameters - Keep nodes between 2007-2008 which have average price >= 7
    dynamicRangeFilter.setRange(new Range(2007.0, 2008.0));
    attributeRangeFilter.setRange(new Range(7, Integer.MAX_VALUE));
 
    //Execute the filter query
    GraphView view = filterController.filter(priceQuery);
    Graph filteredGraph = graphModel.getGraph(view);
 
    //Node 3 shoudln't be in this graph
    System.out.println("Node 3 in the filtered graph: " + filteredGraph.contains(graph.getNode("3")));
```