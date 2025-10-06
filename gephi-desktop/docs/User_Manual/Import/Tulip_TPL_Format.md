---
id: tulip-tpl-format
title: Tulip TPL
sidebar_position: 9
---

Tulip TPL is a format used by the Tulip graph visualization framework. Gephi's importer supports basic topology and common attributes, but complex Tulip-specific objects may not be preserved.

## Syntax

Top-level structure uses an S-expression style with the `tlp` token and version, for example:

```
(tlp "2.0"
  (nodes 0 1 2)
  (edge 0 1 0)
  (edge 1 0 2)
)
```

- Nodes are defined in a `(nodes id id ...)` block.
- Edges are defined as `(edge edge_id source_id target_id)` entries.

Attributes are expressed in separate blocks; Gephi will map simple attribute types (strings, numbers) to node/edge attributes when possible.

## Example

Here is a minimal valid TLP example representing three nodes and two directed edges:

```
(tlp "2.0"
  (nodes 0 1 2)
  (edge 0 1 0)
  (edge 1 0 2)
)
```

## Limitations when importing into Gephi

- Only topology (nodes and edges) and primitive attributes (numbers, strings) are reliably imported.
- Layout, visual styles, and Tulip-specific objects may be lost.
- Large TLP files with complex attribute sections may require preprocessing.