---
id: trivial-graph-format
title: TGF
sidebar_position: 10
---

The Trivial Graph Format (TGF) is a minimal, plain-text adjacency-list format commonly used to exchange small graphs. Gephi includes an importer that supports the common TGF variant where nodes are listed first (one per line), followed by a line containing only `#`, then edges (one per line). Node lines map an ID to an optional label; edge lines list source and target node IDs and an optional edge label.

## Format summary

- Node section: one node per line with `ID [label]`.
- Separator: a line containing only `#` separates nodes from edges.
- Edge section: one edge per line with `sourceID targetID [label]`.

Whitespace is used to separate fields. Labels may contain spaces when they follow the first space on the line.

## Example

Minimal example with two nodes and one labeled edge:

```
1 First node
2 Second node
#
1 2 connecting edge
```

## Gephi importer behaviour

Gephi's importer supports the common TGF variant described above. Key behaviours:

- Lines before the `#` are node definitions: the first token is the node ID; any text after the first space is used as the label. If no label is provided the ID will be used as the label.
- Lines after the `#` are edge definitions: the first token is the source ID, the second token is the target ID; any remaining text after the second token is used as the edge label.

## Limitations and notes

- The importer assumes IDs are whitespace-free tokens.
- Labels are taken as the remainder of the line after the first (for nodes) or second (for edges) space; leading spaces in labels are preserved by substring logic.
