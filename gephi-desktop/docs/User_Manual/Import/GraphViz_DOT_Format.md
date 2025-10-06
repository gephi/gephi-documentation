---
id: graphviz-dot-format
title: GraphViz DOT
sidebar_position: 4
---

DOT is the textual language used by GraphViz to describe graphs. It is human-readable and supports descriptions of subgraphs and visual attributes such as color, width and labels.

Gephi currently does not provide complete support for DOT: subgraphs, custom attributes and sizes are not supported. Gephi imports labels and colors when present, and supports both directed and undirected graphs.

## Resources

- GraphViz website: http://www.graphviz.org/

## Basic example

```dot
digraph sample {
 A -> B;
 B -> C;
}
```

## Labels example

```dot
digraph sample2 {
 A -> B [ label = "Edge A to B" ];
 B -> C [ label = "Edge B to C" ];
 A [label="Node A"];
}
```

## Adjacency lists example

```dot
digraph sample3 {
 A -> {B ; C ; D}
 C -> {B ; A}
}
```
