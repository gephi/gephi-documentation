---
id: statistics
title: Statistics
---

## Available statistics

- [[Average Clustering Coefficient]]
- [[Average Path Length]]
- [[Betweenness Centrality]]
- [[Closeness Centrality]]
- [[Connected Components]]
- [[Degree]]
- [[Degree Power Law]]
- [[Diameter]]
- [[Eigenvector Centrality]]
- [[Graph Density]]
- [[HITS]]
- [[Modularity]]
- [[PageRank]]

## Create a new Metric

This HowTo shows how to create a new statistic/metric algorithm in Gephi.

Please look at [[Plugin Quick Start]] to know how to create a new Netbeans Module. When you have your plugin module, that we will call *MyMetric*, you can start this tutorial.

### Set Dependencies

Add `StatisticsAPI`, `GraphAPI` and `AttributesAPI` modules as dependencies for your plugin module *MyMetric*. See [[How To Set Module Dependencies]]. Also add `LongTaskAPI` and `Lookup`, which will be used.

### Create StatisticsBuilder

* Statistics Builder provides information about the metric algorithm and is responsible for creating your Statistics algorithm instances. All metric algorithms should have their own builder.
* Create a new builder class, for instance `MyMetricBuilder` that implements [`StatisticsBuilder`](http://gephi.org/docs/api/org/gephi/statistics/spi/StatisticsBuilder.html).
* Fill `getName()` method by returning a display name like *My Metric*. Leaves other methods untouched for the moment.
* Add `@ServiceProvider` annotation to your builder class. Add the following line before *MyMetricBuilder* class definition, as shown below:

```java
@ServiceProvider(service = StatisticsBuilder.class)
public class MyMetricBuilder implements StatisticsBuilder {
...
```

### Create Statistics

Create a new class that implements [`Statistics`](http://gephi.org/docs/api/org/gephi/statistics/spi/Statistics.html) and name it *MyMetric*. This is the place the algorithm belongs.
Locate the `execute()` method, you will add your code here. The `getReport()` method should return plain text or HTML text that describe the algorithm execution. Create a new field

`` private String report = "";``

and return report in `getReport()`. That done, go back to `StatisticsBuilder` and fill remaining methods like above:

```java
public Statistics getStatistics() {
    return new MyMetric();
}

public Class<? extends Statistics> getStatisticsClass() {
    return MyMetric.class;
}
```

Details about how to use `GraphModel` and `AttributeModel` are said in the next section.

### Set LongTask

To let your algorithm task be cancelled and its progress watched, implement `LongTask` interface on *MyMetric*.
Add two fields:

```java
private boolean cancel = false;
private ProgressTicket progressTicket;
```

and implement new methods:

```java
public boolean cancel() {
    cancel = true;
    return true;
}

public void setProgressTicket(ProgressTicket progressTicket) {
    this.progressTicket = progressTicket;
}
```

Use the cancel field to terminate your algorithm execution properly and return from `execute()`.
See [[HowTo use Progress]] for more details.

### Create StatisticsUI

Create a new class that implements `StatisticsUI` and name it *MyMetricUI*. The user interfaces is defined here and allows to be automatically added to the `Statistics` module in Gephi.
Add `@ServiceProvider` annotation to your UI class. Add the following line before *MyMetricUI* class definition, as shown below:

```java
@ServiceProvider(service = StatisticsUI.class)
public class MyMetricUI implements StatisticsUI{
...
```

First implement description method:

```java
public String getDisplayName() {
    return "My Metric";
}

public String getCategory() {
    return StatisticsUI.CATEGORY_NETWORK_OVERVIEW;
}

public int getPosition() {
    return 800;
}
 
 public Class<? extends Statistics> getStatisticsClass() {
   return MyMetric.class;
 }
```

The category is just where you want your metric to be displayed: **NODE**, **EDGE** or **NETWORK**. The position control the order the metric front-end are displayed. Returns a value between 1 and 1000, that indicates the position. Less means upper.

Now create a new JPanel for your metric settings panel. Name it *MyMetricPanel*. Add setters and getters for all properties users can edit. Let's say the panel gives the choice on the graph type and has `isDirected()` and `setDirected()` methods.

Now the `setup()` and `unsetup()` are filled. It follow the injection pattern, an instance of *MyMetric* is pushed to let the UI control it.

First add fields to store the current metric:

```java
private MyMetricPanel panel;
private MyMetric myMetric;
```

and fill `getSettingsPanel()`, `setup()` and `unsetup()`:

```java
public JPanel getSettingsPanel() {
    panel = new MyMetricPanel();
    return panel;
}

public void setup(Statistics statistics) {
    this.myMetric = (MyMetric) statistics;
    if(panel!=null) {
        panel.setDirected(myMetric.isDirected());
    }
}
 
public void unsetup() {
    if(panel!=null) {
        myMetric.setDirected(panel.isDirected());
    }
    panel = null;
}
```

The final step is the `getValue()`, which returns the result value on the front-end. If your metric doesn't have a single result value, return `null`.

## Implementation help

The `execute()` method gives both `GraphModel` for getting graph structure and AttributeModel to write results in new attribute columns.

### Use Progress

If you know how many steps your algorithm is doing, for instance if your algorithm just reads nodes:

``Progress.start(progressTicket, graph.getNodeCount());``

and `Progress.progress(progressTicket)` within the loop.

### Lock your algorithm

It's preferable to execute your algorithm in a read lock, in order no other thread can modify the graph while execution. Never return `execute()` with a lock open, see [Graph Locking](http://gephi.org/docs/api/org/gephi/graph/api/Graph.html)

```java
graph.readLock();
//Your algorithm
graph.readUnlockAll();
```

### Write results for each node/edge

It's easy, you create a new column and set row's value for each node. If you want to write an in-degree column, in `execute()`:

```java
AttributeTable nodeTable = attributeModel.getNodeTable();
AttributeColumn inCol = nodeTable.getColumn("indegree");
 
if (inCol == null) {
    inCol = nodeTable.addColumn("indegree", "In Degree", AttributeType.INT, AttributeOrigin.COMPUTED, 0);
}
 
for (Node n : graph.getNodes()) {
    AttributeRow row = (AttributeRow) n.getNodeData().getAttributes();
    row.setValue(inCol, graph.getInDegree(n));
}
```

### Sample

```java
public void execute(GraphModel graphModel, AttributeModel attributeModel) {
    report += "Algorithm started ";
    Graph graph = graphModel.getGraphVisible();
    graph.readLock();

    try {
        Progress.start(progressTicket, graph.getNodeCount());

        for (Node n : graph.getNodes()) {
            //do something
            Progress.progress(progressTicket);
            if (cancel) {
                break;
            }
        }
        graph.readUnlockAll();
    } catch (Exception e) {
        e.printStackTrace();
        //Unlock graph
        graph.readUnlockAll();
   }
}
```