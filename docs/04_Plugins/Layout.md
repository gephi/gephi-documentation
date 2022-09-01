---
id: layout
title: Layout
---

## Available layouts

- [[Force Atlas 2]]
- [[Fruchterman-Reingold]]
- [[OpenOrd]]
- [[YifanHu Multilevel]]

## Create a new Layout

This How To shows how to create a new layout algorithm in Gephi.

Please look at [[Plugin Quick Start]] to know how to create a new Netbeans Module. When you have your plugin module, that we will call *MyLayout*, you can start this tutorial.

### Set Dependencies

Add `LayoutAPI`, `GraphAPI` (`UtilitiesAPI` for `@ServiceProvider` see below and `LookupAPI` since it's almost always useful) modules as dependencies for your plugin module *MyLayout*. See [[How To Set Module Dependencies]].

### Create LayoutBuilder

* Layout Builder provides information about the layout algorithm and is responsible for creating your Layout algorithm instances. All Layout algorithms should have their own builder.
* Create a new builder class, for instance *MyLayoutBuilder* that implements [`LayoutBuilder`](http://gephi.org/docs/api/org/gephi/layout/spi/LayoutBuilder.html).
* The builder interface is requesting a [`LayoutUI`](http://gephi.org/docs/api/org/gephi/layout/spi/LayoutUI.html) object. Create an inner or anonymous class that implements `LayoutUI`.
* Add `@ServiceProvider` annotation to your builder class. Add the following line before *MyLayoutBuilder* class definition, as shown below:

```java
import org.openide.util.lookup.ServiceProvider;
 
@ServiceProvider(service = LayoutBuilder.class)
public class MyLayoutBuilder implements LayoutBuilder {
...
```

### Create Layout

Create a new class that implements [`Layout`](http://gephi.org/docs/api/org/gephi/layout/spi/Layout.html). This is the place the algorithm belongs.

Methods `canAlgo()`, `initAlgo()`, `goAlgo()` and `endAlgo()` are the logic of the algorithm. But the algorithm is manipulating a graph, so where is this graph? The graph can be get from the `GraphModel`, which is injected through the `setGraphModel()` method (fill `setGraphModel()` with `this.graphModel = graphModel;`). The system always sets this graph model before `initAlgo()` is called.

Add the graph model as a new private field of your class.
In your `goAlgo()` method, add the following code to get the current visible graph:

```java
graph = graphModel.getHierarchicalGraphVisible();
```

### Properties

Your algorithm may have settings and properties that users may control. To be visible and editable in the Layout UI, properties need to be properly defined.

Let's say you have a float speed parameter that you want to expose. That is how to create the appropriate LayoutPropery:

```java
LayoutProperty mySpeedProperty = LayoutProperty.createProperty(
    this, 
    Float.class,
    "Speed"
    "Category",
    "A short description what is this propery doing and how users may modify it",
    "getSpeed", 
    "setSpeed");
```

Note that you need to create proper getter and setter for each property you want to expose.

## Advanced concepts

### Layout Data

A special mechanism is available if you need to store temporary objects in nodes. In the following example, we will create a new type of layout data which stores a dx and dy value.

Create a new *MyLayoutData* class that implements [`LayoutData`](http://gephi.org/docs/api/org/gephi/graph/spi/LayoutData.html) and add two floats dx and dy.
How to init? Place the following code at the beginning of `goAlgo()`:

```java
for (Node n : nodes) {
   if (n.getNodeData().getLayoutData() == null || !(n.getNodeData().getLayoutData() instanceof MyLayoutData)) {
      n.getNodeData().setLayoutData(new MyLayoutData());
   }
}
```

That ensure you have a layout data object for each of your nodes.

### Custom properties

Properties can be basic types like Boolean, Float etc. If you want to expose custom types, for instance date, you can provide a `PropertyEditor` class when building the property.

Note that a custom `PropertyEditor` class has been created for `AttributeColumn` in the `AttributeColumnPropertyEditor` module. Add this module as a new dependency.