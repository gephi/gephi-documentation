---
id: Pajek_NET_Format
title: Pajek NET
sidebar_position: 7
---

Pajek NET files (extension `.net`) are plain text files representing network topology. This format focuses on the graph structure (nodes and edges); attribute support is limited — typically only labels are reliably imported by Gephi.

## Nodes

Nodes are declared after the `*Vertices N` line where `N` is the number of nodes. Each node line contains a numeric identifier and an optional quoted label.

```text
*Vertices 82670
1 "entity"
2 "thing"
3 "anything"
4 "something"
5 "nothing"
6 "whole"
```

When nodes have no labels, the importer relies on the vertices count and generates numbered identifiers:

```text
*Vertices 2536
```

## Edges

Edges can be described either as a list of node pairs (with the `*arcs` or `*edges` marker) or as adjacency lists (`*edgeslist`).

Pair list example (`*arcs`):

```text
*arcs
4244 107
4244 238
4244 4292
4247 107
4248 1
4248 54
```

Edge weights can be added as a third column:

```text
*arcs
4244 107 5
```

Adjacency list example (`*edgeslist`):

```text
*edgeslist
4941 386 395 451
1 3553 3586 3587 3637
2 3583
3 4930
4 88
5 13 120
```

## Additional information

- Lines starting with `%` are treated as comments.
- Pajek files may contain extra visual attributes (e.g. `x_fact`, `y_fact`, `ic`) but Gephi typically only imports the label.

## Sample

```text
*Vertices 9
*Edges
1 2
1 9
2 9
2 3
2 8
3 8
3 4
4 5
4 7
5 7
5 6
6 4
```