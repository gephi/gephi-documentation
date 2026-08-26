---
id: Preview_renderer
title: Preview renderer
sidebar_position: 13
---

Preview renderers control the publication-oriented view used on screen and in SVG/PDF export. They do not change the Overview visualization engine. A renderer consumes preview `Item` objects and draws them to one or more `RenderTarget`s.

Add `preview-api` and `org-openide-util-lookup`. Add `preview-plugin` only if you intentionally extend a built-in renderer or use its item implementation classes.

## Understand the rendering pipeline

For each refresh Gephi:

1. Runs the required `ItemBuilder`s to create preview items from the graph.
2. Calls each renderer's `preProcess()` once.
3. Uses `isRendererForitem()` to select a renderer for each item.
4. Calls `render()` for every accepted item.
5. Calls `postProcess()` once.

`render()` can run thousands of times. Put global aggregation in `preProcess()`, per-item prepared values in `Item.setData()`, and global prepared values in `PreviewProperties`. Registered renderers are singleton services: do not store workspace/render mutable state in fields.

## Register a renderer

```java
@ServiceProvider(service = Renderer.class, position = 500)
public final class NodeHaloRenderer implements Renderer {
    private static final String ENABLED = "org.example.nodeHalo.enabled";

    @Override public String getDisplayName() { return "Node halo"; }

    @Override
    public PreviewProperty[] getProperties() {
        return new PreviewProperty[] {
            PreviewProperty.createProperty(
                this, ENABLED, Boolean.class,
                "Show node halos",
                "Draws a halo around every node.",
                PreviewProperty.CATEGORY_NODES
            ).setValue(Boolean.TRUE)
        };
    }

    @Override public void preProcess(PreviewModel model) { }

    @Override
    public boolean isRendererForitem(Item item, PreviewProperties properties) {
        return Item.NODE.equals(item.getType())
            && properties.getBooleanValue(ENABLED);
    }

    @Override
    public boolean needsItemBuilder(
            ItemBuilder builder, PreviewProperties properties) {
        return ItemBuilder.NODE_BUILDER.equals(builder.getType())
            && properties.getBooleanValue(ENABLED);
    }

    @Override
    public void render(
            Item item, RenderTarget target, PreviewProperties properties) {
        if (target instanceof G2DTarget g2d) {
            renderG2D(item, g2d);
        } else if (target instanceof SVGTarget svg) {
            renderSVG(item, svg);
        } else if (target instanceof PDFTarget pdf) {
            renderPDF(item, pdf);
        }
    }

    @Override
    public CanvasSize getCanvasSize(Item item, PreviewProperties properties) {
        float x = item.getData("x");
        float y = item.getData("y");
        float diameter = item.<Float>getData("size") + 8f;
        return new CanvasSize(
            x - diameter / 2f, y - diameter / 2f,
            diameter, diameter);
    }

    @Override
    public void postProcess(
            PreviewModel model, RenderTarget target,
            PreviewProperties properties) { }

    // renderG2D, renderSVG, and renderPDF use each target's drawing API.
}
```

The `position` determines renderer order. Use a unique, namespaced property ID. `needsItemBuilder()` should return false when the renderer is disabled so Preview can avoid unnecessary item creation.

The standard node builder stores `x`, `y`, `size`, and `color`; edge and label builders add their own data. If your renderer needs data not supplied by a standard item, write an `ItemBuilder` for a custom item type instead of overloading unrelated keys.

## Support every relevant target

The default targets expose different drawing backends:

- `G2DTarget.getGraphics()` returns `Graphics2D` for on-screen preview.
- `SVGTarget` creates DOM elements and exposes named top-level groups.
- `PDFTarget.getContentStream()` returns PDFBox's `PDPageContentStream`.

If a visual feature appears on screen but vanishes from exported SVG/PDF, the renderer is incomplete. Share geometry and color calculations across the three drawing methods; only target-specific drawing should differ. Test each target with transparency, scaling, negative coordinates, and an empty graph.

`getCanvasSize()` must include the entire mark, including halo, stroke, arrow, or label. An underestimated box can crop output. Return `new CanvasSize()` only when the size genuinely cannot be computed.

## Preprocess without singleton state

For a global minimum and maximum:

```java
@Override
public void preProcess(PreviewModel model) {
    float min = Float.POSITIVE_INFINITY;
    float max = Float.NEGATIVE_INFINITY;
    for (Item edge : model.getItems(Item.EDGE)) {
        float weight = edge.getData("weight");
        min = Math.min(min, weight);
        max = Math.max(max, weight);
    }
    model.getProperties().putValue("org.example.weight.min", min);
    model.getProperties().putValue("org.example.weight.max", max);
}
```

Read these properties in `render()`. Do not assign `min` and `max` to fields: two previews or workspaces could otherwise overwrite the singleton renderer's state.

## Extend or replace a built-in renderer

Extending `NodeRenderer`, `EdgeRenderer`, `NodeLabelRenderer`, `EdgeLabelRenderer`, or `ArrowRenderer` makes your renderer an alternative/replacement for that built-in type. This requires the `preview-plugin` dependency and couples the plugin more tightly to Gephi's implementation. Prefer a separate decorator renderer when it can draw the additional mark independently.

When replacement is necessary, register it with a deliberate position and test compatibility with the Renderers manager. Multiple plugins may extend the same built-in renderer.

## Custom properties

Basic property types are handled automatically. A custom value type needs a `PropertyEditor` that can parse/serialize values and optionally provide a custom editor. Register the editor and ensure malformed persisted settings fall back safely. For a simple range, two bounded numeric properties are often clearer than a custom type.

## Renderer checklist

- The service has a stable position and display name.
- Property IDs are namespaced, typed, documented, and have defaults.
- `preProcess()` and `render()` keep state in items/properties, not fields.
- G2D, SVG, and PDF output agree.
- Canvas bounds include every painted pixel.
- Expensive aggregation runs once, not per item.
- Disabled renderers do not request unnecessary builders.
- SVG/PDF escaping and graphics-state save/restore are tested.

Use Gephi 0.11.2's [Preview API](https://github.com/gephi/gephi/tree/v0.11.2/modules/PreviewAPI) and [built-in renderers](https://github.com/gephi/gephi/tree/v0.11.2/modules/PreviewPlugin/src/main/java/org/gephi/preview/plugin/renderers) as the exact reference.
