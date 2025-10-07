---
id: GraphML_Format
title: GraphML
sidebar_position: 3
---

[GraphML](http://graphml.graphdrawing.org/) is an XML structured format using the `.graphml` extension. It supports attributes for nodes and edges, hierarchical graphs and benefits from a flexible architecture. Gephi supports a limited set of this format (no sub-graphs and hyperedges).

## File structure

The file content is wrapped into a `graphml` element. Then attributes columns (i.e. titles) are defined in `key` elements and finally the network in the `graph` markup.

Basic options can be set to set the graph element:
```xml
<graph edgedefault="directed">
```
or
```xml
<graph edgedefault="undirected">
```

## Attributes definition

Each attribute title is defined in a `key` element with an identifier, a name, a title, edge or node, and the type of data. The supported data types:

- boolean
- int
- long
- float
- double
- string

Inside the markup, a `default` element can set the default value for the attribute. Below is an example of definition of two attributres, one for nodes and one for edges.

```xml
<key id="d0" for="node" attr.name="color" attr.type="string">
  <default>yellow</default>
</key>
<key id="d1" for="edge" attr.name="weight" attr.type="double"/>
```

Custom data can be added by other software. The example under represents graphical representations (i.e. shapes), but it is not supported by Gephi at all. Verify files namespace to ensure compatibility.

```xml
<node id="n2">
  <data key="d0">
    <y:ShapeNode>
      <y:NodeLabel visible="true" autoSizePolicy="content">n2</y:NodeLabel>
    </y:ShapeNode>
  </data>
</node>
```

## Attributes values

Attributes values have to be set within the node element as the following example:

```xml
<node id="n0">
  <data key="d0">green</data>
</node>
```

## Basic Sample

```xml
<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns
         http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">
  <graph id="G" edgedefault="undirected">
    <node id="n0"/>
    <node id="n1"/>
    <edge id="e1" source="n0" target="n1"/>
  </graph>
</graphml>
```

## With one attribute example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">
  <key id="d0" for="node" attr.name="color" attr.type="string">
    <default>yellow</default>
  </key>
  <key id="d1" for="edge" attr.name="weight" attr.type="double"/>
  <graph id="G" edgedefault="undirected">
    <node id="n0">
      <data key="d0">green</data>
    </node>
    <node id="n1"/>
    <node id="n2">
      <data key="d0">blue</data>
    </node>
    <node id="n3">
      <data key="d0">red</data>
    </node>
    <node id="n4"/>
    <node id="n5">
      <data key="d0">turquoise</data>
    </node>
    <edge id="e0" source="n0" target="n2">
      <data key="d1">1.0</data>
    </edge>
    <edge id="e1" source="n0" target="n1">
      <data key="d1">1.0</data>
    </edge>
    <edge id="e2" source="n1" target="n3">
      <data key="d1">2.0</data>
    </edge>
    <edge id="e3" source="n3" target="n2"/>
    <edge id="e4" source="n2" target="n4"/>
    <edge id="e5" source="n3" target="n5"/>
    <edge id="e6" source="n5" target="n4">
      <data key="d1">1.1</data>
    </edge>
  </graph>
</graphml>
```