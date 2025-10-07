---
id: GEXF_File_Format
title: GEXF
sidebar_position: 1
---

GEXF (Graph Exchange XML Format) is an XML-based format for exchanging graph structures, attributes and visualization metadata. It supports static and dynamic graphs, typed attributes (including list types), hierarchical structures and a visualization (viz) module for styling nodes and edges. The official reference and examples are available at [https://gexf.net](https://gexf.net).

## Minimal (Hello world) example

A minimal static directed graph with 2 nodes and 1 edge:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://gexf.net/1.3" version="1.3">
  <graph mode="static" defaultedgetype="directed">
    <nodes>
      <node id="0" label="Hello" />
      <node id="1" label="World" />
    </nodes>
    <edges>
      <edge source="0" target="1" />
    </edges>
  </graph>
</gexf>
```

---

## Header and metadata

Typical recommended header that includes XML Schema references and `meta` data:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://gexf.net/1.3"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://gexf.net/1.3
                           http://gexf.net/1.3/gexf.xsd"
       version="1.3">
  <meta lastmodifieddate="2009-03-20">
    <creator>Gephi.org</creator>
    <description>A sample GEXF file</description>
  </meta>
  ...
</gexf>
```

The `meta` element is useful to store creator, description, keywords and last-modified date. Including the schema location is recommended for validation.

---

## Attributes and associated data

GEXF allows declaring typed attributes for nodes and edges inside `attributes` elements. Supported primitive types follow XSD (string, integer, float, double, boolean, date, anyURI) and additional types (liststring, listinteger, bigdecimal, etc.) are defined by the spec.

Attributes declaration example and node attribute usage:

```xml
<graph defaultedgetype="directed">
  <attributes class="node">
    <attribute id="0" title="url" type="string"/>
    <attribute id="1" title="indegree" type="float"/>
    <attribute id="2" title="frog" type="boolean">
      <default>true</default>
    </attribute>
  </attributes>

  <nodes>
    <node id="0" label="Gephi">
      <attvalues>
        <attvalue for="0" value="http://gephi.org"/>
        <attvalue for="1" value="1"/>
      </attvalues>
    </node>
    <node id="1" label="Webatlas">
      <attvalues>
        <attvalue for="0" value="http://webatlas.fr"/>
        <attvalue for="1" value="2"/>
      </attvalues>
    </node>
  </nodes>
</graph>
```

### List attributes

GEXF supports list types such as `liststring` and `listint`. List values are written as comma-separated values inside brackets, e.g. `[foo, bar]`.

---

## Topology: nodes, edges, parallel edges

- Nodes: declared with `<node id="..." label="..."/>` where `id` must be unique.
- Edges: declared with `<edge source="..." target="..."/>` and optional attributes such as `id`, `weight` (double), `type` (directed/undirected/mutual).
- Parallel edges (multigraphs): supported via an additional `kind` attribute that distinguishes parallel edges; `source-target-kind` must be unique.

Example of parallel edges:

```xml
<edge source="0" target="1" weight="1.0" kind="friend"/>
<edge source="0" target="1" weight="1.0" kind="neighbor"/>
```

---

## Dynamics (graphs over time)

GEXF supports dynamic graphs via the `mode="dynamic"` attribute on `<graph>`. Time can be represented with intervals (default) or timestamps (use `timerepresentation="timestamp"`). The `timeformat` attribute controls encoding (e.g. `double`, `date`, `dateTime`).

A dynamic graph example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://gexf.net/1.3"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://gexf.net/1.3
                             http://gexf.net/1.3/gexf.xsd"
       version="1.3">
  <graph mode="dynamic" defaultedgetype="directed" timeformat="date">
    <attributes class="node" mode="static">
      <attribute id="0" title="url" type="string"/>
      <attribute id="1" title="frog" type="boolean"><default>true</default></attribute>
    </attributes>
    <attributes class="node" mode="dynamic">
      <attribute id="2" title="indegree" type="float"/>
    </attributes>

    <nodes>
      <node id="0" label="Gephi" start="2009-03-01">
        <attvalues>
          <attvalue for="0" value="http://gephi.org"/>
          <attvalue for="2" value="1"/>
        </attvalues>
      </node>
      <node id="1" label="Webatlas">
        <attvalues>
          <attvalue for="0" value="http://webatlas.fr"/>
          <attvalue for="2" value="1" end="2009-03-01"/>
          <attvalue for="2" value="2" start="2009-03-01" end="2009-03-10"/>
          <attvalue for="2" value="1" start="2009-03-11"/>
        </attvalues>
      </node>
    </nodes>

    <edges>
      <edge source="0" target="1" start="2009-03-01"/>
      <edge source="0" target="2" start="2009-03-01" end="2009-03-10"/>
    </edges>
  </graph>
</gexf>
```

### Spells and timestamps

- Use `<spells>` with `<spell start="..." end="..."/>` to express multiple disjoint intervals for a node/edge.
- Alternatively use compact `timestamps` or `intervals` attributes (parser-dependent).
- Intervals are inclusive. `start`/`end` may be omitted to represent an unbounded side (infinite bound).

---

## Visualization module (VIZ)

The VIZ module extends GEXF with a `viz` namespace (`xmlns:viz="http://gexf.net/1.3/viz"`) and allows attaching color, position, size and shape metadata to nodes and edges. Gephi supports the VIZ module for styling.

### Node viz example:

```xml
<gexf xmlns="http://gexf.net/1.3" xmlns:viz="http://gexf.net/1.3/viz">
  <graph>
    <nodes>
      <node id="a" label="glossy">
        <viz:color r="239" g="173" b="66" a="0.6"/>
        <viz:position x="15.783598" y="40.109245" z="0.0"/>
        <viz:size value="2.0375757"/>
        <viz:shape value="disc"/>
      </node>
    </nodes>
  </graph>
</gexf>
```

### Edge viz example:

```xml
<edge id="e1" source="n0" target="n1">
  <viz:color r="157" g="213" b="78"/>
  <viz:thickness value="5.124"/>
  <viz:shape value="solid"/>
</edge>
```

- Colors: RGBA (`r`,`g`,`b` integers 0–255; `a` float 0.0–1.0) or `hex="#RRGGBB"`.
- Position: `x`, `y`, `z` floats (Gephi treats `z` as optional height).
- Size/Thickness: non-negative floats.
- Shapes: nodes (`disc`, `square`, `triangle`, `diamond`, `image`), edges (`solid`, `dotted`, `dashed`, `double`).

Note: Viz attributes are not dynamic in GEXF 1.3; to represent viz over time use slices or multiple graphs.

---

## Best practices & parser advice

- Always place `<edges>` after `<nodes>` to avoid parser errors.
- Use `count` attributes in `<nodes>` and `<edges>` to help parsers allocate memory.
- Prefer `liststring` for repeated textual attributes when applicable.
- Set `idtype` on `<graph>` to hint if IDs are integers or strings for optimization.
- Validate files using the GEXF XSD when possible.

---

## MIME type

When serving GEXF over HTTP use `Content-Type: application/gexf+xml`.

---

## Resources & references

- [Official GEXF website and primer](https://gexf.net)
- [GEXF specification & source code](https://github.com/gephi/gexf/)
