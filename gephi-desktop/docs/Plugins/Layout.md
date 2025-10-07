---
id: Layout
title: Layout
sidebar_position: 3
---

## Create a new Layout

This HowTo shows how to create a new layout algorithm in Gephi.

Please look at [How to add a new module](https://github.com/gephi/gephi-plugins?tab=readme-ov-file#how-to-add-a-new-module) first. When you have your plugin module, that we will call *MyLayout*, you can start this tutorial.

### Set Dependencies

Add `layout-api`, `graph-api` and `org-openide-util-lookup` modules as dependencies for your plugin module *MyLayout*. See [How to configure module dependencies](https://github.com/gephi/gephi-plugins?tab=readme-ov-file#where-are-dependencies-configured).

### Create LayoutBuilder

* Layout Builder provides information about the layout algorithm and is responsible for creating your Layout algorithm instances. All Layout algorithms should have their own builder.
* Create a new builder class, for instance *MyLayoutBuilder* that implements [`LayoutBuilder`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/layout/spi/LayoutBuilder.html).
* The builder interface is requesting a [`LayoutUI`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/layout/spi/LayoutUI.html) object. Create an inner or anonymous class that implements `LayoutUI`.
* Add `@ServiceProvider` annotation to your builder class. Add the following line before *MyLayoutBuilder* class definition, as shown below:

```java
import org.openide.util.lookup.ServiceProvider;
 
@ServiceProvider(service = LayoutBuilder.class)
public class MyLayoutBuilder implements LayoutBuilder {
...
```

### Create Layout

Create a new class that implements [`Layout`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/layout/spi/Layout.html). This is the place the algorithm belongs.

Methods `canAlgo()`, `initAlgo()`, `goAlgo()` and `endAlgo()` are the logic of the algorithm. But the algorithm is manipulating a graph, so where is this graph? The graph can be get from the `GraphModel`, which is injected through the `setGraphModel()` method (fill `setGraphModel()` with `this.graphModel = graphModel;`). The system always sets this graph model before `initAlgo()` is called.

Add the graph model as a new private field of your class.
In your `goAlgo()` method, add the following code to get the current visible graph:

```java
graph = graphModel.getGraphVisible();
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

Create a new *MyLayoutData* class that implements [`LayoutData`](https://javadoc.io/doc/org.gephi/gephi/latest/org/gephi/graph/spi/LayoutData.html) and add two floats dx and dy.
How to init? Place the following code at the beginning of `goAlgo()`:

```java
for (Node n : nodes) {
    MyLayoutData layoutData = n.getLayoutData();
    n.setLayoutData(layoutData);
}
```

That ensure you have a layout data object for each of your nodes.

### Custom properties

Properties can be basic types like Boolean, Float etc. If you want to expose custom types, for instance date, you can provide a `PropertyEditor` class when building the property.