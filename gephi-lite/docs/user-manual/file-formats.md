---
title: File formats
sidebar_position: 2
---

## GEXF

[GEXF](https://gexf.net/) is an XML format which has been created by the Gephi community to enhance Graph data interoperability.

Gephi Lite supports reading and writing GEXF (version 1.2 or 1.3) files.

It's the format of choice to exchange Graphs with [Gephi](https://gephi.org/desktop).

:::warning

Gephi Lite does not support those GEXF specifications:

- [dynamics](https://gexf.net/dynamics.html)
- [hierarchy](https://gexf.net/hierarchy.html)
- [phylogeny](https://gexf.net/phylogeny.html)
- [viz:shape](https://gexf.net/viz.html)

:::

## GraphML

Gephi Lite can read [GraphML](http://graphml.graphdrawing.org/) files.

:::warning
Gephi Lite does not support writing GraphML.
:::

:::info
Gephi Lite GEXF and GraphML support are both fueled by the [Graphology library](https://graphology.github.io/standard-library/). Enhancing GEXF or GraphML support would require enhancing Graphology modules.
:::

## Gephi Lite workspace

On top of the data exchange formats (GEXF and GraphML), Gephi Lite proposes its own internal workspace format.

This file is a JSON file which represents not only the graph data but also the Gephi Lite application workspace state:

- Appearance state: how visual attributes were set
- Filter state: filters to apply on the graph

To sum it up, the Gephi Lite workspace file format will save/load the application state together with the graph data.

This format is versioned to allow backward compatibility. The current version of the format is described as the [Gephi Lite workspace JSON schema specification](https://gephi.org/gephi-lite/gephi-lite-format.schema.json).

<!-- HERE WE COULD ADD A WHICH FORMAT TO CHOSE SECTION WHERE WE SPEAK ABOUT CAPTION -->
