---
id: GML_File_Format
title: GML
sidebar_position: 5
---

GML (Graph Modeling Language) is a plain text file format with a simple, human-readable syntax used to represent graphs. Note that Gephi does not provide complete support for GML — some data structures are not fully supported.


## Basic example

```text
graph
[
 node
 [
 id A
 ]
 node
 [
 id B
 ]
 node
 [
 id C
 ]
 edge
 [
 source B
 target A
 ]
 edge
 [
 source C
 target A
 ]
]
```

## Labels example

```text
graph
[
 node
 [
 id A
 label "Node A"
 ]
 node
 [
 id B
 label "Node B"
 ]
 node
 [
 id C
 label "Node C"
 ]
 edge
 [
 source B
 target A
 label "Edge B to A"
 ]
 edge
 [
 source C
 target A
 label "Edge C to A"
 ]
]
```