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

## Graphology JSON

Gephi Lite can read [Graphology](https://graphology.github.io/) graphs serialized as JSON (with
[`graph.export()`](https://graphology.github.io/serialization.html)), in a file with the `.json` extension.

This is handy to load graphs built with Graphology scripts, in Node.js or in the browser.

:::warning
Gephi Lite does not support writing Graphology JSON. Use the Gephi Lite workspace format instead.
:::

## Gephi Lite workspace

On top of the data exchange formats (GEXF and GraphML), Gephi Lite proposes its own internal workspace format.

This file is a JSON file which represents not only the graph data but also the Gephi Lite application workspace state:

- Appearance state: how visual attributes were set, including the background (such as the
  [map style](./map.md#map-style))
- Filter state: filters to apply on the graph
- Layout state: the last layout run with its parameters, and the layout quality settings

To sum it up, the Gephi Lite workspace file format will save/load the application state together with the graph data.

The current version of the format is described as the
[Gephi Lite workspace JSON schema specification](https://gephi.org/gephi-lite/gephi-lite-format.schema.json).

### Files from other Gephi Lite versions

Workspace files are versioned. Gephi Lite fully opens files saved with the same major and minor version only (for
instance, Gephi Lite 1.1.x opens files from 1.1.x).

When a file comes from another version, Gephi Lite shows an error, with an **Open anyway** button. The file then opens
in a degraded mode: the graph data (nodes, edges, their attributes and positions) is imported, but the appearance,
filters and layout state are lost.

When such a file is opened [from a URL](./share-graph-as-url.md), it is opened in degraded mode directly, with a warning
notification.

<!-- HERE WE COULD ADD A WHICH FORMAT TO CHOSE SECTION WHERE WE SPEAK ABOUT CAPTION -->
