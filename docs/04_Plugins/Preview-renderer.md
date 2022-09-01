---
id: preview-renderer
title: Preview renderer
---

## Introduction

Preview is a highly customizable module and plug-ins can implements new renderers to display additional elements on screen, for instance hulls for groups. It's also possible to overwrite existing renderers and replace node or edge aspect.

Please look at [[Plugin Quick Start]] to know how to create a new Netbeans Module. When you have your plugin module, that we will call **MyRenderer**, you can start this tutorial.

**One can find renderers examples in the [PreviewPlugin](https://github.com/gephi/gephi/tree/master/modules/PreviewPlugin) module.**

### How renderers work

Renderers describe how a particular item is rendered and has the code to dray on a rendering target (Processing, SVG or PDF). Items are for example the node or edges of the graph and are given to renderers to be drawn. Each item (e.g. node, edge) should have it's renderer.

Rendering is a three-steps process:

1. First the `preProcess()` method is called on all renderers to let them initialize additional attributes for their items. The best example is the edge renderer which will initialize the source and target position in the `EdgeItem` object during this phase. In general the `preProcess()` method is the best for complex algorithms or gathering data from other items. Note that the `preProcess()` method is called only once per refresh, unlike `render()` which is called many times.
2. The `isRendererForitem()` is then used to determine which renderer should be used to render an item. The method provides an access to the preview properties. For instance, if the properties says the edge display is disabled, the edge renderer should return false for every item. Note that nothing avoids several renderer to returns true for the same item.
3. The `render()` method is finally called for every item which the renderer returned `true` at `isRendererForitem()`. It receives the properties and the render target. It uses the item attributes and properties to determine item aspects and the render target to obtain the canvas.

If you want to create your own `Item` look at [[HowTo add a preview item]]

## Create a new Renderer

### Set Dependencies

Add Preview API, Processing Wrapper, iText Wrapper and Lookup modules as dependencies for your plugin module. See [[How To Set Module Dependencies]].

### Create new Renderer

Create a new renderer **`MyRenderer`** class, which implements `Renderer`.

Add `@ServiceProvider` annotation to your renderer class, so it is detected by the system.

Here is how it should look like:

```java
@ServiceProvider(service = Renderer.class)
public class MyRenderer implements Renderer {
 
    public String getDisplayName(){
        //return user friendly name for the renderer
    }
 
    public void preProcess(PreviewModel previewModel) {
        //TODO
    }
 
    public void render(Item item, RenderTarget target, PreviewProperties properties) {
        //TODO
    }
 
    public PreviewProperty[] getProperties() {
        //TODO
    }
 
    public boolean isRendererForitem(Item item, PreviewProperties properties) {
        //TODO
    }
 
    public boolean needsItemBuilder(ItemBuilder itemBuilder, PreviewProperties properties) {
        //TODO
    }
}
```

### Implement the `isRendererForItem`

Each item returns a different value for its `getType()` method so it's easy to know if the item is a node, an edge or a label.

The method also receives the current properties and can query values.

Here is the code from the edge arrow renderer that only works when items are non-directed edges:

```java
public boolean isRendererForitem(Item item, PreviewProperties properties) {
    return item.getType().equals(Item.EDGE) && properties.getBooleanValue(PreviewProperty.DIRECTED)
                && (Boolean) item.getData(EdgeItem.DIRECTED);
}
```

### Implement `getProperties`

You can add your own properties attached to the renderer. Typically each renderer has its own properties. For instance the node renderer has border size or color as properties. Once defined a property will be shawn to the user who can change its value.

Properties have a identifier, a display name, a description and a type. It's important to have a unique identifier to each property. Be sure to choose something not already taken.

Properties are displayed in categories. You can either set an existing category or define a new one. Existing categories are `PreviewProperty.CATEGORY_NODES`, `PreviewProperty.CATEGORY_EDGES`, `PreviewProperty.CATEGORY_NODE_LABELS`, `PreviewProperty.CATEGORY_EDGE_LABELS` and `PreviewProperty.CATEGORY_EDGE_ARROWS`.

Here is how to create a property `"Border width"`:

```java
public PreviewProperty[] getProperties() {
    return new PreviewProperty[]{
                    PreviewProperty.createProperty(this, "border_width", Float.class,
                    "Border width",
                    "",
                    PreviewProperty.CATEGORY_NODES).setValue(1f)};
}
```

Properties should have a default value. It is set at the creation of the property simply by calling `setValue()`. 

### Implement render

The render method receives an item and draw it to a render target. There is three possible render targets:

- [Processing](http://gephi.org/docs/api/org/gephi/preview/api/ProcessingTarget.html)
- [SVG](http://gephi.org/docs/api/org/gephi/preview/api/SVGTarget.html)
- [PDF](http://gephi.org/docs/api/org/gephi/preview/api/PDFTarget.html)

Renderers should implement the drawing routines for the three targets. One might ask why the same code has to be duplicated in three different ways. Unfortunately there is no unified drawing toolkit flexible and efficient enough to support this task at this point. The good news is that renderers have total control on what is drawn. It's verbose but flexible.

When the target is Processing, renderers obtain the [PGraphicsJava2D](http://processing.googlecode.com/svn/trunk/processing/build/javadoc/core/index.html?processing/core/PGraphicsJava2D.html) object. For the SVG target, renderers obtain Batik's [Document](http://xmlgraphics.apache.org/batik/using/dom-api.html) instance. As the PDF target rely on the iText library renderers obtain the [PdfContentByte](http://api.itextpdf.com/itext/index.html?com/itextpdf/text/pdf/PdfContentByte.html) object.

Example how to handle the three targets in render:

```java
public void render(Item item, RenderTarget target, PreviewProperties properties) {
    if (target instanceof ProcessingTarget) {
        renderProcessing(item, (ProcessingTarget) target, properties);
    } else if (target instanceof SVGTarget) {
        renderSVG(item, (SVGTarget) target, properties);
    } else if (target instanceof PDFTarget) {
        renderPDF(item, (PDFTarget) target, properties);
    }
}
 
public void renderProcessing(Item item, ProcessingTarget target, PreviewProperties properties) {
    PGraphics graphics = target.getGraphics();
    ...
}
 
public void renderPDF(Item item, PDFTarget target, PreviewProperties properties) {
    PdfContentByte cb = target.getContentByte();
    ...
}
 
public void renderSVG(Item item, SVGTarget target, PreviewProperties properties) {
    Element elem = target.createElement("circle");
    ...
    target.getTopElement("nodes").appendChild(elem);
}
```

Look at renderers examples in the [PreviewPlugin](https://github.com/gephi/gephi/tree/master/modules/PreviewPlugin) module.

## Overwrite an existing renderer

The default renderers can be overridden or extended.
Extend or replace an existing renderer

To extend or completely replace a default Renderer by your own implementation, create a new Renderer and set the annotation like below. In addition add [[Preview Plugin]] module as a dependency.

`@ServiceProvider(service=Renderer.class, position=XXX) public class MyRenderer extends NodeRenderer`

Being XXX the new position of the renderer Then you can reuse parts of the base class or just override them.

Default renderers are:

- `org.gephi.preview.plugin.renderers.NodeRenderer`
- `org.gephi.preview.plugin.renderers.EdgeRenderer`
- `org.gephi.preview.plugin.renderers.NodeLabelRenderer`
- `org.gephi.preview.plugin.renderers.EdgeLabelRenderer`
- `org.gephi.preview.plugin.renderers.ArrowRenderer`

## Appendix

### Custom properties

Properties are usually default Java primitives like `Float` or `Color`. Custom property types can be used if a valid property editor is defined. Property editors define how a property value should be serialized and provide a custom UI to let the user modify the value. For instance to define a new property type `NumberRange` one could create a UI with two text fields to enter number ranges.

Create the new type class and then create a new property editor:

```java
public class NumberRangePropertyEditor extends java.beans.PropertyEditorSupport {
        @Override
        public Component getCustomEditor() {
                //TODO returns custom JPanel
        }
 
        @Override
        public String getAsText() {
                //TODO returns the value as string
        }
 
        @Override
        public void setAsText(String text) {
                //TODO set value from the text
        }
 
        @Override
        public boolean supportsCustomEditor() {
                return true;
        }
}
```

One can find property editors examples in the [DesktopPreview](https://github.com/gephi/gephi/tree/master/modules/DesktopPreview) module.

### Complex pre-process

In each renderer the `preProcess()` method allows to access all preview data and execute complex algorithms.

### How to read all items of a particular type

Simply by querying the preview model:

```java
Item[] edgeItems = previewModel.getItems(Item.EDGE);
```

### How to use constants and data generated in pre-process

Renderers should remain **stateless**. That means one shouldn't define any variable or fields in the renderer class itself. Instead all data can be put in the property system.

Here is an example how to calculate the min and max edge weight in the `preProcess()` and use it in `render()`:

```java
public void preProcess(PreviewModel previewModel) {
    PreviewProperties properties = previewModel.getProperties();
    Item[] edgeItems = previewModel.getItems(Item.EDGE);
 
    for (Item edge : edgeItems) {
        minWeight = Math.min(minWeight, (Float) edge.getData(EdgeItem.WEIGHT));
        maxWeight = Math.max(maxWeight, (Float) edge.getData(EdgeItem.WEIGHT));
    }
    properties.putValue("weight.min", minWeight);
    properties.putValue("weight.max", maxWeight);
}
 
public void render(Item item, RenderTarget target, PreviewProperties properties) {
    float minWeight = properties.getFloatValue("weight.min");
    float maxWeight = properties.getFloatValue("weight.max");
    ...
}
```

For additional data generated per item, simply call `item.setData()`.

### Default item data

**Node**
- x (float)
- y (float)
- size (float)
- color (color)

**Edge**
- weight (float)
- directed (boolean)
- mutual (boolean)
- self_loop (boolean)
- meta_edge (boolean)
- color (color)

**Node Label**
- label (string)
- color (color)
- size (float)
- width (float)
- height (float)
- visible (boolean)

**Edge Labels**
- label (string)
- color (color)
- size (float)
- width (float)
- height (float)
- visible (boolean)

**Edges have additional data set by the default edge renderer:**
- source (nodeitem)
- target (nodeitem)
