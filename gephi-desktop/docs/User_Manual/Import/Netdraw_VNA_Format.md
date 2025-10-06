---
id: netdraw-vna-format
title: Netdraw VNA
sidebar_position: 6
---

The VNA format (used by Netdraw) is similar to Pajek but uses section headers prefixed with `*`. It defines nodes and ties (edges) and supports attributes. Each section contains a header row that lists column names.

## Basic example

```text
*node data
ID name gender age
j101 joe male 56
w067 wendy female 23
b303 bill male 48
*tie data
from to strength
j101 w067 1
w067 j101 2
j101 b303 1
w067 b303 5
```

## With node properties

Netdraw VNA files can include node properties such as position and visual attributes. Gephi supports common properties including `X`, `Y`, `SIZE`, `COLOR` (0-255, red component), and `SHORTLABEL`.

```text
*Node data
ID x y color shape size shortlabel
HOLLY 1160 271 255 1 10 HOLLY
BRAZEY 1214 577 255 1 10 BRAZEY
CAROL 671 612 255 1 10 CAROL
# ... more nodes ...
*Tie data
from to friends strength
HOLLY PAM 1 1
PAT HOLLY 1 2
PAULINE PAT 1 2
# ... more ties ...
```

## Notes

- Sections are separated by an asterisk-prefixed header (e.g. `*Node data`, `*Tie data`).
- Column headers are required in each section and define the fields that follow.
- File comments and extra metadata may be present in VNA files; Gephi will import commonly supported columns but may ignore unknown or complex properties.