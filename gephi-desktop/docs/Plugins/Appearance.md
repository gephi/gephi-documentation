---
id: Appearance
title: Appearance
sidebar_position: 12
---

Appearance transformers add ways to map graph values to visual properties such as node size, element color, label size, or label color. They change graph element appearance; they are not Preview renderers.

Use direct Graph API mutations when your plugin applies one particular style as part of its own command. Implement a transformer when users should choose a new reusable mapping from Gephi's Appearance panel.

Add `graph-api` for direct styling. Add `appearance-api` and `org-openide-util-lookup` when contributing a transformer.

## Apply an appearance from your own command

For a fixed operation, change the visible elements under the appropriate graph lock:

```java
Graph graph = graphModel.getGraphVisible();
graph.writeLock();
try {
    for (Node node : graph.getNodes()) {
        node.setColor(new Color(31, 119, 180));
        node.setSize(12f);
    }
} finally {
    graph.writeUnlock();
}
```

Resolve `graphModel` for the current workspace when the operation starts. Use the visible graph when the command promises to style the filtered result, and the complete graph only when it explicitly promises to style all elements. This path applies a style; it does not add a new mapping to the Appearance panel.

## Choose the mapping type

- `SimpleTransformer<E>` applies one configured style to every eligible element.
- `RankingTransformer<E>` receives a numeric value and its normalized position from 0 to 1.
- `PartitionTransformer<E>` receives a categorical value and its partition configuration.

All three also implement `Transformer`, whose `isNode()` and `isEdge()` methods declare their target.

## A ranking transformer

This service maps a normalized number to node opacity:

```java
@ServiceProvider(service = Transformer.class)
public final class RankingNodeOpacityTransformer
        implements RankingTransformer<Node> {
    private float minimum = 0.2f;
    private float maximum = 1f;

    @Override
    public void transform(
            Node node, Ranking ranking,
            Number value, float normalizedValue) {
        float opacity = minimum
            + normalizedValue * (maximum - minimum);
        Color color = node.getColor();
        node.setColor(new Color(
            color.getRed(), color.getGreen(), color.getBlue(),
            Math.round(opacity * 255f)));
    }

    @Override public boolean isNode() { return true; }
    @Override public boolean isEdge() { return false; }

    public float getMinimum() { return minimum; }
    public void setMinimum(float value) { minimum = clamp(value); }
    public float getMaximum() { return maximum; }
    public void setMaximum(float value) { maximum = clamp(value); }
    private float clamp(float value) {
        return Math.max(0f, Math.min(1f, value));
    }
}
```

The Appearance engine supplies the value and normalized value. Do not scan the graph inside `transform()`; it is called once per element. Decide how missing values behave in the associated function/UI and keep the transformer itself quick.

## Make it visible in the Appearance panel

A transformer service performs the operation. A matching singleton `TransformerUI<T>` describes how it appears and configures the current `Function`:

- `getTransformerClass()` returns the exact transformer class.
- `getCategory()` selects or defines the visual category.
- `getPanel(Function)` returns controls for the current ranking, partition, or simple function.
- Name, description, icon, and registration `position` control presentation.
- Optional control buttons add compact actions; `onApply(Function)` reacts after application.

Register it separately:

```java
@ServiceProvider(service = TransformerUI.class, position = 2000)
public final class RankingNodeOpacityUI
        implements TransformerUI<RankingNodeOpacityTransformer> {
    // Implement the TransformerUI contract and return
    // RankingNodeOpacityTransformer.class from getTransformerClass().
}
```

Because `TransformerUI` is a singleton, store no workspace-specific function in a field after the panel is done with it. Configure the transformer attached to the supplied `Function`, following the current built-in Appearance UIs for the exact function-to-transformer access pattern.

## Ranking and partition design

For ranking, validate the endpoints and define interpolation clearly. Normalized input can still encounter a zero-range column; do not divide by the raw range yourself when Gephi already supplies `normalizedValue`.

For partitions, choose a deterministic value-to-style mapping and provide a stable fallback for null or newly appearing categories. Do not use `toString()` as a persistent category identity unless the underlying type guarantees it.

## Appearance checklist

- Node/edge applicability is correct.
- The transformer implements exactly the simple, ranking, or partition contract it needs.
- Per-element work is constant-time and has no graph-wide scans.
- Minimum/maximum and missing values have explicit behavior.
- A matching `TransformerUI` is registered and does not retain workspace state.
- Changes are tested in Overview, Preview, and export where those visual properties should carry through.

Use Gephi 0.11.2's [AppearanceAPI](https://github.com/gephi/gephi/tree/v0.11.2/modules/AppearanceAPI) for contracts and [AppearancePlugin](https://github.com/gephi/gephi/tree/v0.11.2/modules/AppearancePlugin) for built-in color and size transformers.
