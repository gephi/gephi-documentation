---
id: gdf-file-format
title: GDF
sidebar_position: 2
---

GDF (Graph Description Format) is the file format used by GUESS and supported by Gephi's importer. It is a simple, CSV-like plain text format divided into two sections: nodes and edges. Each section starts with a header line that defines column names and types; subsequent lines list elements with values separated by commas.

## Structure

- The node section header begins with `nodedef>` followed by column definitions such as `name VARCHAR,label VARCHAR`.
- The edge section header begins with `edgedef>` followed by column definitions such as `node1 VARCHAR,node2 VARCHAR,weight DOUBLE`.
- Values are comma-separated and must respect the order declared in the header.

## Basic example

```text
nodedef>name VARCHAR,label VARCHAR
s1,Site number 1
s2,Site number 2
s3,Site number 3
edgedef>node1 VARCHAR,node2 VARCHAR
s1,s2
s2,s3
s3,s2
s3,s1
```

## Example with edge weight

```text
nodedef>name VARCHAR,label VARCHAR
s1,Site number 1
s2,Site number 2
s3,Site number 3
edgedef>node1 VARCHAR,node2 VARCHAR, weight DOUBLE
s1,s2,1.2341
s2,s3,0.453
s3,s2,2.34
s3,s1,0.871
```

## Various attributes example

You can add as many node and edge attributes as needed. Attributes can be used by Gephi (for example in Filters).

```text
nodedef>name VARCHAR,label VARCHAR,class VARCHAR, visible BOOLEAN,labelvisible BOOLEAN,width DOUBLE,height DOUBLE,x DOUBLE,y DOUBLE,color VARCHAR
s1,SiteA,blog,true,true,10.0,10.0,-52.11296,-25.921143,'114,116,177'
s2,SiteB,forum,true,true,10.986123,10.986123,-20.114172,25.740356,'219,116,251'
s3,SiteC,webpage,true,true,10.986123,10.986123,8.598924,-26.867584,'192,208,223'
edgedef>node1 VARCHAR,node2 VARCHAR,directed BOOLEAN,color VARCHAR
s1,s2,true,'114,116,177'
s2,s3,true,'219,116,251'
s3,s2,true,'192,208,223'
s3,s1,true,'192,208,223'
```

## Working with text values

If your text contains commas or quotes, wrap the whole value in single quotes to avoid breaking the column separation.

```text
nodedef>name VARCHAR,label VARCHAR,class VARCHAR, visible BOOLEAN,labelvisible BOOLEAN,width DOUBLE,height DOUBLE,x DOUBLE,y DOUBLE,color VARCHAR
s1,'Hello "world" !',type1,true,true,10.0,10.0,-52.11296,-25.921143,'114,116,177'
s2,'Well, this is',type1,true,true,10.986123,10.986123,-20.114172,25.740356,'219,116,251'
s3,'A correct 'GDF' file',type1,true,true,10.986123,10.986123,8.598924,-26.867584,'192,208,223'
edgedef>node1 VARCHAR,node2 VARCHAR,directed BOOLEAN,color VARCHAR
s1,s2,true,'114,116,177'
s2,s3,true,'219,116,251'
s3,s2,true,'192,208,223'
s3,s1,true,'192,208,223'
```

## Implementation details

- **Missing values**: When a value is missing, keep the comma placeholder. Do not omit the comma.

```text
nodedef>name VARCHAR,label VARCHAR,att1 VARCHAR,att2 VARCHAR,att3 VARCHAR,att4 BOOLEAN
s1,SiteA,blabla,blabla,blabla,true
s2,SiteB, , , ,false
s3,SiteC,blabla, , ,true
```

- **Colors**: Colors are stored as a `VARCHAR` with three comma-separated integer components for red, green and blue (0–255). Example: `'114,116,177'`.

- **Position & size**: Node positions are X and Y (and optional Z) as `DOUBLE` columns. Node size can be specified with a `width DOUBLE` attribute.

## Common problems

- If special characters appear as boxes, ensure the file is encoded as UTF-8 (with BOM if necessary).
- If you get an `ArrayIndexOutOfBoundsException: 1`, check that every node line has the expected number of values (e.g., a missing label can trigger this).