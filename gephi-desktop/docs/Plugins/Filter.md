---
id: filter
title: Filter
sidebar_position: 9
---

Filters are pruning the graph by keeping only nodes and edges that satisfies filters conditions. They are either predicates or functions that reduce the graph, predicates are easy and return only true or false, whereas functions input a graph and output a graph.

Create a new plugin module, that we will call *MyFilter*.

One can find filters examples in the [FiltersPlugin module](https://github.com/gephi/gephi/tree/master/modules/FiltersPlugin/src/main).

## How filtering works in Gephi

Gephi has a filter pipeline working with graph copies, where each filter can remove nodes and edges with settings. The Graph API in Gephi has the concept of View, a copy of the complete graph structure identified by an ID and where filters can work on it without disturbing other views. So, when a filter is removing nodes, it is removing them on a copy of the graph structure, the complete graph (named the main view) remains the same. This copy is eventually set as the visible view, the graph shown in the graph window. That is how users visualize a filtered graph. When filtering is disabled, the main view is simply set again as the visible view.

The filter pipeline is executed on a separate Thread and therefore doesn't block the rest of the application.
Filters are wrapped into queries, which can be chained and combined. Similar as SQL nested queries concept, filter queries can have sub-queries and be represented as a tree, where the last executed query is the root. For example, the query **INDEGREE(3, EDGE_WEIGHT(2))** would be executed like below:

* A complete copy of the graph structure is created in a new view
* It is passed to the **EDGE_WEIGHT** filter, which removes edges under weight 2
* The sub-graph is passed to the **INDEGREE** filter, which removes nodes with in-degree less than 3 here
* The graph view is set as *visible view*, the graph windows automatically refreshes

When a property is changed in the user interface, for instance the weight threshold, the complete process above is just re-executed and the former graph view is destroyed.

## Create a new Filter

### Set Dependencies

Add `filters-api`, `graph-api`, and `org-openide-util-lookup` modules as dependencies for your plugin module.

### Create FilterBuilder

* `FilterBuilder` is a factory class for building the Filters. The builder is registered in the `FilterLibrary`. The library is the upper panel where users choose the filters they want to use. Another type of builders, named `CategoryBuilder` can create several builders at once and will be detailed later.
* Create a new builder *MyFilterBuilder* class, which implements [`FilterBuilder`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/filters/spi/FilterBuilder.html).
* Add `@ServiceProvider` annotation to your builder class, in order it is detected by the filter library.
Here is how it should look like:

```java
@ServiceProvider(service = FilterBuilder.class)
public class MyFilterBuilder implements FilterBuilder {
 
    public Category getCategory() {
        return FilterLibrary.NODE;
    }
 
    public String getName() {
        return "My Filter";
    }
 
    public Icon getIcon() {
        return null;
    }
 
    public String getDescription() {
        return "A filter example";
    }
 
    public Filter getFilter() {
        //TODO
    }
 
    public JPanel getPanel(Filter filter) {
        return null;
    }
 
    public void destroy(Filter filter) {
    }
}
```

Notice the `getCategory()` method. As the `FilterLibrary` is a tree, this builder needs a parent. That is the category. Use default categories defined in `FilterLibrary` like above or simply return your own:

```java
public Category getCategory() {
    return new Category("Samples Filters");
}
```

### Create Filter

Before creating the filter class, you should decide which filter interface to implement:

* [`NodeFilter`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/filters/spi/NodeFilter.html): Basic filters for nodes, that works as predicates. For a given node the filter's role is to return true if the node is kept or false if it is removed.
* [`EdgeFilter`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/filters/spi/EdgeFilter.html): Basic filters for edges, that works as predicates. For a given edge the filter's role is to return true if the edge is kept or false if it is removed.
* [`ComplexFilter`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/filters/spi/ComplexFilter.html): Filter working with full graphs and returning a subgraph.

The `ComplexFilter` interface is useful when both nodes and edges have to be filtered.
For instance, in the case of an edge weight filter (a filter that keeps edges only in a particular weight threshold) we only need `EdgeFilter`. But if I want to design a filter that prunes the graph until it's average degree is 5.5 I need to have control on both nodes and edges. The complex filter is a black box, where nodes and edges can be filtered (e.g. removed) with tricky or complex processes.

#### NodeFilter

Create a new *MyFilter* class, which implements `NodeFilter` interface. The main filter method is `evaluate()`. The `init()` asks if the filter is valid for the given graph. Only valid filters are executed by the system.
The example below removes isolated nodes (e.g. with degree equal to 0). The filter is said valid only if the graph have nodes.

```java
public class MyFilter implements NodeFilter {
 
    public boolean init(Graph graph) {
        return graph.getNodeCount() > 0;
    }
 
    public boolean evaluate(Graph graph, Node node) {
        return graph.getDegree(node) > 0;
    }
 
    public void finish() {
    }
 
    public String getName() {
        return "My Filter";
    }
 
    public FilterProperty[] getProperties() {
        return new FilterProperty[0];   //Will be explained later
    }
}
```

#### ComplexFilter

The complex filter interface is very simple, the `filter()` method directly gives the [`Graph`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/graph/api/Graph.html).

``public Graph filter(Graph graph);``

Here is a example of a complex filter. It removes the 50% edges with the lowest weight.

```java
public Graph filter(Graph graph) {
   int edgeCount = graph.getEdgeCount();
   edgeCount /= 2;
 
   Edge[] edges = graph.getEdges().toArray();
   Arrays.sort(edges, new Comparator<Edge>() {
      public int compare(Edge o1, Edge o2) {
         return Float.compare(o1.getWeight(), o2.getWeight());
      }
   });
 
   for (int i = 0; i < edgeCount; i++) {
      Edge edge = edges[i];
      graph.removeEdge(edge);
   }
   return graph;
}
```

It uses the `removeEdge()` method from the `Graph` API and returns the graph it received.

**Can a filter also add elements?**
Yes, as far as they are part of the main view as well.
As an example, here is how the NOT operator works:

```java
Graph mainGraph = graph.getView().getGraphModel().getGraph();
for (Node n : mainGraph.getNodes().toArray()) {
    if (!graph.contains(n)) {
        //The node n is not in graph
        graph.addNode(n);
    } else {
        //The node n is in graph
        graph.removeNode(n);
    }
}
```

### Finish the builder

In the builder, return a new instance of your filter in the `getFilter()` method.

```java
@Override
public Filter getFilter() {
   return new MyFilter();
}
```

### Properties

It's very likely your filter will need to define properties, for instance a threshold or a pattern. In the case your filter has a user interface, the Filters API implementation has a system to automatically refresh the filter when a property value is changed. But for that it needs to be aware of these properties. That's why `Filter` interface has a `getProperties()` method.

If your filter doesn't have any user interface, it is therefore not necessary to return properties. Otherwise, it is mandatory.
Below is how to define a simple `useRegex` boolean property:

``FilterProperty p = FilterProperty.createProperty(this, Boolean.class, "useRegex");``

As it uses introspection to get and set the value, your class simply needs proper getters and setters. As a result that is how the method id filled:

```java
public FilterProperty[] getProperties() {
        return new FilterProperty[]{
            FilterProperty.createProperty(this, Boolean.class, "useRegex")
        };
	}
 
    public boolean isUseRegex() {
        return useRegex;
    }
 
    public void setUseRegex(boolean useRegex) {
        this.useRegex = useRegex;
    }
```

When the `useRegex` value will be changed (through a checkbox for example), the system will be notified and re-execute the filter.

### Provide a UI

The `getPanel()` method in *MyFilterBuilder* can return a user interface for the filter.
One can find existing filters user interface code in the `FiltersPluginUI` module.
The panel is needed to configure a `Filter` instance, already created. That's why the `getPanel()` method gives the `Filter`. Cast this filter to *MyFilter*, it cannot be anything else and configure settings.
When settings are modified, use properties to set the new value. Below is an example of a simple panel, with a checkbox to set the `useRegex` property which we defined earlier.

```java
public class MyFilterPanel extends javax.swing.JPanel implements ItemListener {
 
    private MyFilter filter;
    private javax.swing.JCheckBox regexCheckbox;
 
    public MyFilterPanel(MyFilter filter) {
        this.filter = filter;
 
        regexCheckbox = new javax.swing.JCheckBox("Use Regex");
        add(regexCheckbox);
 
        regexCheckbox.addItemListener(this);
    }
 
    public void itemStateChanged(ItemEvent e) {
        FilterProperty useRegex = filter.getProperties()[0];
        useRegex.setValue(regexCheckbox.isSelected());
    }
}
```

It is important to set the value to the `FilterProperty`, not to *MyFilter* directly.

## Appendix

### Create a CategoryBuilder

Category builders are typically designed to build a filter that work on Attributes. For example, the `AttributeRangeFilter` works with all attribute columns. That means a `FilterBuilder` has to be created for each column, under a category (e.g. a folder).
The following example shows how several `AttributeRangeFilterBuilder` (which implements `FilterBuilder`) are created, one per attribute column.

```java
@ServiceProvider(service = CategoryBuilder.class)
public class AttributeRangeBuilder implements CategoryBuilder {
 
    public Category getCategory() {
        return new Category("Range", null, FilterLibrary.ATTRIBUTES);    //The 'Range' folder will be in the 'Attributes' folder
    }

    public FilterBuilder[] getBuilders(Workspace workspace) {
        List<FilterBuilder> builders = new ArrayList<>();
        GraphModel am = Lookup.getDefault().lookup(GraphController.class).getGraphModel(workspace);
        List<Column> columns = new ArrayList<>();
        columns.addAll(am.getNodeTable().toList());
        columns.addAll(am.getEdgeTable().toList());
        for (Column c : columns) {
            if (!c.isProperty() && !c.isArray()) {
                if (AttributeUtils.isNumberType(c.getTypeClass())) {
                    AttributeRangeFilterBuilder b = new AttributeRangeFilterBuilder(c);
                    builders.add(b);
                }
            }
        }
        return builders.toArray(new FilterBuilder[0]);
    }
}
```

### Provide an icon

Simply return an icon in the `FilterBuilder` implementation.

### Custom Properties

Properties natively supports all Java types, as well as Range and `Column`. For other types you may have to register a property editor to guarantee serialization to work.
Serialization is used to write and read properties values, when a Gephi project is saved.
Implement a property editor class and register it:

* Create a new class that extends `java.beans.PropertyEditorSupport` and fill `getAstext()` and `setAsText()` methods.
* Register this editor by doing `java.beans.PropertyEditorManager.registerEditor()` method.