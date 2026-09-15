---
id: Filter
title: Filter
sidebar_position: 10
---

Filters derive a graph view without deleting elements from the main graph. The filter pipeline copies a view, applies nested queries, and can make the result visible. Changing a filter property reruns the query.

Add `filters-api`, `graph-api`, `project-api`, and `org-openide-util-lookup`.

## Apply an installed filter

Use `FilterController` when your plugin needs to run a filter that is already installed. Static builders are services; column-dependent builders are supplied by `CategoryBuilder` for the current workspace:

```java
Workspace workspace = projectController.getCurrentWorkspace();
List<FilterBuilder> builders = new ArrayList<>(
    Lookup.getDefault().lookupAll(FilterBuilder.class));

for (CategoryBuilder category
        : Lookup.getDefault().lookupAll(CategoryBuilder.class)) {
    FilterBuilder[] dynamicBuilders = category.getBuilders(workspace);
    if (dynamicBuilders != null) {
        Collections.addAll(builders, dynamicBuilders);
    }
}

FilterBuilder builder = chooseBuilder(builders);
Filter filter = builder.getFilter(workspace);
// Set validated values through filter.getProperties() when needed.

FilterController filters = Lookup.getDefault().lookup(FilterController.class);
Query query = filters.createQuery(filter);
filters.add(query);
filters.filterVisible(query);
```

A query can instead be exported with `exportToNewWorkspace(query)` or `exportToColumn(columnName, query)`. To restore the complete visible view, use `graphModel.setVisibleView(null)`. Discover by stable identity where the API supplies one; display names may be localized. Implement the SPI below only when contributing a genuinely new filter.

## Choose the filter contract

- `NodeFilter` is a predicate: return `true` to keep a node.
- `EdgeFilter` is the equivalent predicate for edges.
- `ComplexFilter` receives a graph view and can remove both nodes and edges.
- `CategoryBuilder` creates workspace-dependent families of filters, commonly one per attribute column.

Prefer a predicate when it expresses the rule. It composes cleanly and lets the pipeline own view mutation.

## Register a workspace-aware builder

In Gephi 0.11.2, `FilterBuilder.getFilter` receives the workspace:

```java
@ServiceProvider(service = FilterBuilder.class)
public final class MinimumDegreeBuilder implements FilterBuilder {
    @Override public Category getCategory() { return FilterLibrary.TOPOLOGY; }
    @Override public String getName() { return "Minimum degree"; }
    @Override public String getDescription() {
        return "Keeps nodes whose degree is at least the threshold.";
    }
    @Override public Icon getIcon() { return null; }

    @Override
    public Filter getFilter(Workspace workspace) {
        return new MinimumDegreeFilter();
    }

    @Override public JPanel getPanel(Filter filter) {
        return new MinimumDegreePanel((MinimumDegreeFilter) filter);
    }
    @Override public void destroy(Filter filter) { }
}
```

Use the workspace argument when construction depends on its tables or model. Do not cache the resulting filter in the singleton builder.

## Implement a node predicate

```java
public final class MinimumDegreeFilter implements NodeFilter {
    private Integer minimum = 1;

    @Override public String getName() { return "Minimum degree"; }
    @Override public boolean init(Graph graph) { return graph.getNodeCount() > 0; }
    @Override public boolean evaluate(Graph graph, Node node) {
        return graph.getDegree(node) >= minimum;
    }
    @Override public void finish() { }

    @Override
    public FilterProperty[] getProperties() {
        try {
            return new FilterProperty[] {
                FilterProperty.createProperty(
                    this, Integer.class, "minimum", "getMinimum", "setMinimum")
            };
        } catch (NoSuchMethodException ex) {
            throw new IllegalStateException(ex);
        }
    }

    public Integer getMinimum() { return minimum; }
    public void setMinimum(Integer value) { minimum = Math.max(0, value); }
}
```

`init()` is called for the graph being filtered, `evaluate()` for each element, and `finish()` after evaluation. Keep `evaluate()` fast and free of UI work. The property uses JavaBean methods so the filter engine can observe updates.

## Update properties through the panel

The settings panel must set the `FilterProperty`, not call the filter setter directly; that is how the engine learns that it must refresh:

```java
public final class MinimumDegreePanel extends JPanel {
    public MinimumDegreePanel(MinimumDegreeFilter filter) {
        JSpinner spinner = new JSpinner(new SpinnerNumberModel(
            filter.getMinimum(), 0, Integer.MAX_VALUE, 1));
        spinner.addChangeListener(event -> {
            try {
                filter.getProperties()[0].setValue(spinner.getValue());
            } catch (Exception ex) {
                throw new IllegalStateException("Cannot update filter", ex);
            }
        });
        add(new JLabel("Minimum:"));
        add(spinner);
    }
}
```

In production, retain the property once instead of recreating the array on every event, localize labels, and validate values.

## Complex filters

A `ComplexFilter` may remove elements from the supplied **working view** and return it:

```java
@Override
public Graph filter(Graph graph) {
    for (Edge edge : graph.getEdges().toArray()) {
        if (edge.getWeight() < minimumWeight) {
            graph.removeEdge(edge);
        }
    }
    return graph;
}
```

Never modify `graphModel.getGraph()` from a complex filter. Work only on the graph passed to `filter()`. Snapshot an iterable before removing its elements. Be explicit about whether removing a node also removes its incident edges and how directed or parallel edges affect the rule.

## Attribute-dependent filter families

A `CategoryBuilder` receives a workspace and can inspect `GraphModel.getNodeTable()` and `getEdgeTable()` to return one `FilterBuilder` per compatible column. Exclude property columns and unsupported array/dynamic types unless the filter handles them. Rebuild for each workspace; a `Column` from one model is not context-free.

## Filter checklist

- `true` consistently means “keep,” not “remove.”
- The builder implements the 0.11.2 workspace-aware signature.
- Properties have matching getter/setter types and the UI changes them through `FilterProperty`.
- Predicate evaluation is quick, deterministic, and side-effect free.
- Complex filters mutate only the supplied working view.
- Empty graphs, missing values, direction, self-loops, and multigraphs are tested.

See Gephi 0.11.2's [FiltersPlugin](https://github.com/gephi/gephi/tree/v0.11.2/modules/FiltersPlugin) and [FiltersPluginUI](https://github.com/gephi/gephi/tree/v0.11.2/modules/FiltersPluginUI) for built-in implementations.
