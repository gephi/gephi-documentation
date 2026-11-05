---
title: Layout, preview, and export
sidebar_position: 7
---

Layout and preview are separate stages. A layout writes coordinates and sometimes sizes to graph elements. Preview reads those values and turns them into a rendered document such as SVG or PDF.

## Run a layout for a fixed number of iterations

Most layouts follow the same lifecycle:

```java
import org.gephi.layout.plugin.force.StepDisplacement;
import org.gephi.layout.plugin.force.yifanHu.YifanHuLayout;

YifanHuLayout layout = new YifanHuLayout(
        null, new StepDisplacement(1f));
layout.setGraphModel(graphModel);
layout.resetPropertiesValues();
layout.setOptimalDistance(200f);

layout.initAlgo();
try {
    for (int i = 0; i < 100 && layout.canAlgo(); i++) {
        layout.goAlgo();
    }
} finally {
    layout.endAlgo();
}
```

The lifecycle is:

1. attach the workspace's `GraphModel`;
2. load sensible defaults with `resetPropertiesValues()`;
3. override the properties needed by your application;
4. initialize, iterate while the algorithm can continue, and end it.

The layout uses the current visible graph view. Filter before layout when hidden nodes should not influence placement.

:::tip Bound server-side work

Use a maximum iteration count or a time limit. Do not loop only on `canAlgo()` in a request handler: some force-directed layouts are designed to keep improving rather than reach a quick terminal state.

:::

## Run layouts for a duration

`AutoLayout` divides a fixed duration among one or more algorithms:

```java
import java.util.concurrent.TimeUnit;
import org.gephi.layout.plugin.AutoLayout;
import org.gephi.layout.plugin.forceAtlas.ForceAtlasLayout;

AutoLayout autoLayout = new AutoLayout(10, TimeUnit.SECONDS);
autoLayout.setGraphModel(graphModel);

ForceAtlasLayout forceAtlas = new ForceAtlasLayout(null);
forceAtlas.resetPropertiesValues();
forceAtlas.setAdjustSizes(Boolean.TRUE);

autoLayout.addLayout(forceAtlas, 1.0f);
autoLayout.execute();
```

The ratio `1.0f` gives this algorithm all the available time. Ratios can split the duration between several layouts. [`WithAutoLayout.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/WithAutoLayout.java) also demonstrates properties that change during execution.

## Configure preview

Preview options do not modify graph data. They control how the graph is drawn:

```java
import java.awt.Color;
import org.gephi.preview.api.PreviewController;
import org.gephi.preview.api.PreviewModel;
import org.gephi.preview.api.PreviewProperty;
import org.gephi.preview.types.EdgeColor;

PreviewController previewController = Lookup.getDefault()
        .lookup(PreviewController.class);
PreviewModel previewModel = previewController.getModel(workspace);

previewModel.getProperties().putValue(
        PreviewProperty.SHOW_NODE_LABELS, Boolean.TRUE);
previewModel.getProperties().putValue(
        PreviewProperty.EDGE_CURVED, Boolean.FALSE);
previewModel.getProperties().putValue(
        PreviewProperty.EDGE_COLOR, new EdgeColor(Color.GRAY));
previewModel.getProperties().putValue(
        PreviewProperty.EDGE_THICKNESS, 0.1f);

previewController.refreshPreview(workspace);
```

Use typed values of the expected kind: for example, `0.1f` for a float property and `Boolean.FALSE` for a boolean property.

## Export a preview

The extension chooses a preview exporter for SVG, PDF, or PNG:

```java
ExportController exportController = Lookup.getDefault()
        .lookup(ExportController.class);
exportController.exportFile(new File("network.svg"));
```

When several workspaces are open, configure the exporter explicitly, just as for graph export. For example, a PDF exporter can write to a file or a `ByteArrayOutputStream` and can be given a page size.

If an exported image is blank or surprising, verify all of the following:

- the intended workspace is current or set on the exporter;
- nodes have finite coordinates;
- the visible view contains nodes and edges;
- preview was refreshed after the graph or its appearance changed;
- labels are enabled if you expect to see them.

[`HeadlessSimple.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/HeadlessSimple.java) demonstrates the complete filter-layout-statistics-appearance-preview-PDF pipeline.

## Embedding a preview in Swing

The Toolkit can render a preview into a Swing application, but this is not headless operation: it requires a graphical environment and Swing's event-dispatch rules. Start with [`PreviewJFrame.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/PreviewJFrame.java). On a server or in a container, export SVG, PDF, or PNG instead of creating a `JFrame`.
