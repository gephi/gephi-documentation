---
id: Layout
title: Layout
sidebar_position: 5
---

A layout repeatedly updates node coordinates. Gephi calls `initAlgo()` once, calls `goAlgo()` while `canAlgo()` is true, and finally calls `endAlgo()`. This iterative contract lets users see the graph move and change properties while the algorithm runs.

Add `layout-api`, `graph-api`, and `org-openide-util-lookup`.

## Run an installed layout

A plugin-owned workflow can discover and run an existing layout without registering another one:

```java
LayoutBuilder builder = Lookup.getDefault().lookupAll(LayoutBuilder.class)
    .stream()
    .filter(candidate -> candidate.getName().equals(requestedName))
    .findFirst()
    .orElseThrow();

Layout layout = builder.buildLayout();
layout.setGraphModel(graphModel);
layout.resetPropertiesValues();
applyValidatedProperties(layout, requestedProperties);

layout.initAlgo();
try {
    for (int iteration = 0;
            iteration < maximumIterations && layout.canAlgo() && !cancelled;
            iteration++) {
        layout.goAlgo();
    }
} finally {
    layout.endAlgo();
}
```

Run this loop on a background executor, never on the EDT. Bound the iterations or elapsed time, propagate cancellation, and create a fresh layout for each run. If failure must not leave half-applied coordinates, snapshot positions before execution and restore them under a write lock. Implement the builder and layout contracts below only when adding a new algorithm to Gephi.

## Register a builder

The registered builder is metadata plus a factory. It should return a new layout instance:

```java
@ServiceProvider(service = LayoutBuilder.class)
public final class GridLayoutBuilder implements LayoutBuilder {
    @Override public String getName() { return "Simple grid"; }

    @Override
    public Layout buildLayout() {
        return new GridLayout(this);
    }

    @Override
    public LayoutUI getUI() {
        return new LayoutUI() {
            @Override public String getDescription() {
                return "Moves visible nodes toward a regular grid.";
            }
            @Override public Icon getIcon() { return null; }
            @Override public JPanel getSimplePanel(Layout layout) { return null; }
            @Override public int getQualityRank() { return 1; }
            @Override public int getSpeedRank() { return 5; }
        };
    }
}
```

`LayoutUI` describes the algorithm and may supply a compact custom panel. Most settings should instead be `LayoutProperty` values so Gephi can display, edit, and persist them consistently.

## Implement the iteration lifecycle

This compact implementation snapshots the visible nodes, computes target positions, and moves each node a fraction of the remaining distance per pass:

```java
public final class GridLayout implements Layout {
    private final LayoutBuilder builder;
    private GraphModel graphModel;
    private boolean running;
    private Integer columns;
    private Float spacing;
    private Float speed;

    public GridLayout(LayoutBuilder builder) {
        this.builder = builder;
        resetPropertiesValues();
    }

    @Override public void setGraphModel(GraphModel model) { graphModel = model; }
    @Override public LayoutBuilder getBuilder() { return builder; }
    @Override public void initAlgo() { running = true; }
    @Override public boolean canAlgo() { return running && graphModel != null; }
    @Override public void endAlgo() { running = false; }

    @Override
    public void goAlgo() {
        Graph graph = graphModel.getGraphVisible();
        graph.readLock();
        try {
            Node[] nodes = graph.getNodes().toArray();
            for (int i = 0; i < nodes.length; i++) {
                float targetX = (i % columns) * spacing;
                float targetY = (i / columns) * spacing;
                Node node = nodes[i];
                node.setX(node.x() + (targetX - node.x()) * speed);
                node.setY(node.y() + (targetY - node.y()) * speed);
            }
        } finally {
            graph.readUnlock();
        }
    }

    @Override
    public void resetPropertiesValues() {
        columns = 10;
        spacing = 100f;
        speed = 0.1f;
    }

    // getProperties and JavaBean getters/setters follow.
}
```

An algorithm that converges by itself can set `running = false` when its tolerance is reached. A continuous layout leaves it true until the user clicks Stop. `endAlgo()` must release algorithm-owned resources even if execution is interrupted.

## Expose editable properties

`LayoutProperty` uses JavaBean introspection, so the getter and setter names and boxed types must match exactly:

```java
@Override
public LayoutProperty[] getProperties() {
    try {
        return new LayoutProperty[] {
            LayoutProperty.createProperty(
                this, Integer.class, "Columns", "Grid",
                "Number of nodes in each row.",
                "getColumns", "setColumns"),
            LayoutProperty.createProperty(
                this, Float.class, "Spacing", "Grid",
                "Distance between grid positions.",
                "getSpacing", "setSpacing"),
            LayoutProperty.createProperty(
                this, Float.class, "Speed", "Movement",
                "Fraction of the remaining distance moved per iteration.",
                "getSpeed", "setSpeed")
        };
    } catch (Exception ex) {
        throw new IllegalStateException("Cannot create layout properties", ex);
    }
}

public Integer getColumns() { return columns; }
public void setColumns(Integer value) { columns = Math.max(1, value); }
public Float getSpacing() { return spacing; }
public void setSpacing(Float value) { spacing = Math.max(1f, value); }
public Float getSpeed() { return speed; }
public void setSpeed(Float value) { speed = Math.max(0.001f, Math.min(1f, value)); }
```

Validate values in setters because they can be changed while the algorithm runs. Avoid rebuilding large internal structures on every setter call; mark them dirty and rebuild at the start of the next iteration.

## Per-node temporary state

Some force algorithms need displacement, mass, or convergence state for every node. Use `Node.getLayoutData()` and `setLayoutData()` with a small object implementing `org.gephi.graph.spi.LayoutData`. Clear or replace data during `endAlgo()` if it should not survive the run. Do not put temporary algorithm state into user-visible attribute columns.

## Performance and correctness

- Operate on `getGraphVisible()` unless the UI explicitly promises to lay out hidden nodes too.
- Take one node snapshot per iteration; avoid repeated conversions inside inner loops.
- Keep allocations out of pairwise hot paths.
- Check `canAlgo()` and graph validity; tolerate an empty graph.
- Release locks in `finally`.
- Test deterministic geometry separately from the Gephi lifecycle.
- For large graphs, measure one iteration time and keep it short enough for responsive stop/property changes.

See the built-in [Layout API and plugins for Gephi 0.11.2](https://github.com/gephi/gephi/tree/v0.11.2/modules/LayoutPlugin) for production algorithms, then compare only concepts—not old signatures—with the bootcamp grid examples.
