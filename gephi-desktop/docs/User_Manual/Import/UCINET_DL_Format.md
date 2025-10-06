---
id: ucinet-dl-format
title: UCINET DL
sidebar_position: 8
---

UCINET DL is the common format used by the UCINET package. Gephi supports the `fullmatrix` and `edgelist1` sub-formats.

## Full matrix

A full matrix DL file declares `DL N = <n>` followed by a `Data:` block containing an N×N matrix. A cell value of `1` typically indicates the presence of an edge; numeric values can be used for weighted edges.

Basic example:

```text
DL N = 5
Data:
0 1 1 1 1
1 0 1 0 0
1 1 0 0 1
1 0 0 0 0
1 0 1 0 0
```

With node labels (labels line appears before `data:`):

```text
dl n=5
format = fullmatrix
labels:
barry,david,lin,pat,russ
data:
0 1 1 1 0
1 0 0 0 1
1 0 0 1 0
1 0 1 0 1
0 1 0 1 0
```

Edge weights can be represented by replacing `1` with the desired numeric weight.

## Edge list (`edgelist1`)

For sparse graphs, use the `edgelist1` format where each data line is a pair of node identifiers (optionally followed by a weight). Labels can be declared with `labels:` or embedded in the data.

Basic example with numeric labels declared separately:

```text
DL n=5
format = edgelist1
labels:
george, sally, jim, billy, jane
data:
1 2
1 3
2 3
3 1
4 3
```

Example with labels embedded in the data:

```text
DL n=5
format = edgelist1
labels embedded:
data:
george sally
george jim
sally jim
billy george
jane jim
```

Edge weights as the third column:

```text
dl
format=edgelist1
n=3
data:
1 2 1.56263736263736
1 3 1.48687978687979
2 3 1.39597069597070
3 1 0.676190476190476
```