---
title: Filter, analyze, and style
sidebar_position: 6
---

A typical Toolkit pipeline filters a graph, computes metrics, and maps data values to visual properties. These operations use three different APIs but share the same workspace.

## Filter into a visible view

This example keeps nodes with degree 10 or greater:

```java
import org.gephi.filters.api.FilterController;
import org.gephi.filters.api.Query;
import org.gephi.filters.api.Range;
import org.gephi.filters.plugin.graph.DegreeRangeBuilder.DegreeRangeFilter;
import org.gephi.graph.api.GraphView;

FilterController filterController = Lookup.getDefault()
        .lookup(FilterController.class);

DegreeRangeFilter degreeFilter = new DegreeRangeFilter();
degreeFilter.init(graphModel.getGraph());
degreeFilter.setRange(new Range(10, Integer.MAX_VALUE));

Query query = filterController.createQuery(degreeFilter);
GraphView filteredView = filterController.filter(query);
graphModel.setVisibleView(filteredView);
```

Read the result with `graphModel.getGraphVisible()`. The main graph remains intact.

Filters can form a query tree. An intersection operator with two subqueries means both conditions must match. The [`Filtering.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/Filtering.java) demo includes degree, partition, intersection, and ego filters.

To return to the complete graph:

```java
graphModel.setVisibleView(graphModel.getGraph().getView());
```

Destroy views that are no longer needed in long-running applications:

```java
graphModel.destroyView(filteredView);
```

Do not destroy the main view.

## Run a statistic

Algorithms such as graph distance write their results into graph attributes:

```java
import org.gephi.graph.api.Column;
import org.gephi.statistics.plugin.GraphDistance;

GraphDistance distance = new GraphDistance();
distance.setDirected(true);
distance.execute(graphModel);

Column betweenness = graphModel.getNodeTable()
        .getColumn(GraphDistance.BETWEENNESS);
```

Choose directedness and other parameters deliberately; they change the meaning of the result. Depending on the algorithm, executing against the model may use its visible graph. Decide whether filtering is part of the analysis before running a statistic.

Some metrics are executed through `StatisticsController`, especially when the controller coordinates execution or progress. Follow the API used by the concrete statistic and consult the [0.11.2 Javadoc](https://gephi.org/gephi-toolkit/0.11.2/apidocs/).

## Map data to color or size

The Appearance API creates a function from a column and a transformer type:

```java
import java.awt.Color;
import org.gephi.appearance.api.AppearanceController;
import org.gephi.appearance.api.AppearanceModel;
import org.gephi.appearance.api.Function;
import org.gephi.appearance.plugin.RankingElementColorTransformer;
import org.gephi.appearance.plugin.RankingNodeSizeTransformer;

AppearanceController appearanceController = Lookup.getDefault()
        .lookup(AppearanceController.class);
AppearanceModel appearanceModel = appearanceController.getModel(workspace);

Function colorFunction = appearanceModel.getNodeFunction(
        graphModel.defaultColumns().degree(),
        RankingElementColorTransformer.class);
RankingElementColorTransformer colorTransformer = colorFunction.getTransformer();
colorTransformer.setColors(new Color[] {
    new Color(0xFEF0D9), new Color(0xB30000)
});
colorTransformer.setColorPositions(new float[] {0f, 1f});
appearanceController.transform(colorFunction);

Function sizeFunction = appearanceModel.getNodeFunction(
        betweenness, RankingNodeSizeTransformer.class);
RankingNodeSizeTransformer sizeTransformer = sizeFunction.getTransformer();
sizeTransformer.setMinSize(3f);
sizeTransformer.setMaxSize(20f);
appearanceController.transform(sizeFunction);
```

Always check that an imported or computed column exists before building a function in production code. A misspelled column ID otherwise turns into a less informative failure later in the pipeline.

## Recommended ordering

For many workflows, this order is predictable:

1. import or build the graph;
2. create and select a filtered view, if required;
3. run statistics;
4. apply appearance transformations;
5. run a layout;
6. configure preview and export.

Change the order intentionally when a metric should describe the full graph but the final image should show only a subset.
