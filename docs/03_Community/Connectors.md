---
id: connectors
title: Connectors
---

## An R package to build GEXF graph files

**rgexf** is an R package that allows to work with GEXF format graph files (XML) reading and writing GEXF files. Its main function, write.gexf, builds gexf files which as basic arguments requires two data.frames, a nodes matrix and a edges matrix. In addition it currently supports networks dynamics such as start and end attributes (for both, nodes and edges) and spells, including attributes and viz attributes ([link](https://bitbucket.org/gvegayon/rgexf)).
Current version is rgexf v0.14.3 (march 11, 2014) and its available in The Comprehensive R Archive Network (CRAN). [link](http://cran.r-project.org/src/contrib/Archive/rgexf/).

See the [gephi post](https://blog.gephi.org/2013/rgexf-an-r-library-to-work-with-gexf-graph-files/).

### Exporting R data to GEXF graph files (some examples)

`write.gexf()` is a function that as basic arguments requires two matrices, a nodes matrix and a edges matrix, both character matrix. In addition it currently supports dynamics nodes/edges and attributes for nodes/edges.

#### Example 1: Static net

Creating a group of individuals and their relations

```r
> people <- matrix(c(1:4, 'juan', 'pedro', 'matthew', 'carlos'),ncol=2)
> people
    [,1] [,2]    
[1,] "1"  "juan"  
[2,] "2"  "pedro" 
[3,] "3"  "matthew"
[4,] "4"  "carlos"
```

Defining the relations structure
```r
> relations <- matrix(c(1,4,1,2,1,3,2,3,3,4,4,2), ncol=2, byrow=T)
    [,1] [,2]
[1,]    1    4
[2,]    1    2
[3,]    1    3
[4,]    2    3
[5,]    3    4
[6,]    4    2
```

Getting things done
```r
> write.gexf(people, relations)
```

output:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://www.gexf.net/1.2draft" 
xmlns:viz="http://www.gexf.net/1.1draft/viz" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd" version="1.2">
  <graph mode="static">
    <nodes>
      <node id="1" label="juan"/>
      <node id="2" label="pedro"/>
      <node id="3" label="matthew"/>
      <node id="4" label="carlos"/>
    </nodes>
    <edges>
      <edge source="1" target="4"/>
      <edge source="1" target="2"/>
      <edge source="1" target="3"/>
      <edge source="2" target="3"/>
      <edge source="3" target="4"/>
      <edge source="4" target="2"/>
    </edges>
  </graph>
</gexf>
```

#### Example 2: Dynamic net

Defining the dynamic structure, note that there are some nodes that have NA at the end.

```r
> time<-matrix(c(10.0,13.0,2.0,2.0,12.0,rep(NA,3)), nrow=4, ncol=2)
> time
     [,1] [,2]
[1,]   10   12
[2,]   13   NA
[3,]    2   NA
[4,]    2   NA
```

Getting things done
```r
> write.gexf(people, relations, nodeDynamic=time)
```

output
```xml
<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://www.gexf.net/1.2draft" 
xmlns:viz="http://www.gexf.net/1.1draft/viz" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd" version="1.2">
  <graph mode="dynamic" start="2" end="13" timeformat="double" defaultedgetype="undirected">
    <nodes>
      <node id="1" label="juan" start="10" end="12"/>
      <node id="2" label="pedro" start="13"/>
      <node id="3" label="matthew" start="2"/>
      <node id="4" label="carlos" start="2"/>
    </nodes>
    <edges>
      <edge source="1" target="4"/>
      <edge source="1" target="2"/>
      <edge source="1" target="3"/>
      <edge source="2" target="3"/>
      <edge source="3" target="4"/>
      <edge source="4" target="2"/>
    </edges>
  </graph>
</gexf>
```

#### Example 3: Node/Edge at a time

**rgexf** also supports writing graphs one element at a time.

Creating an empty graph (gexf object)
```r
> mygraph <- new.gexf.graph()
```

Adding some nodes
```r
> mygraph <- add.gexf.node(mygraph, id=0, label="He")
> mygraph <- add.gexf.node(mygraph, id=1, label="Her")
```

Adding some edges and dynamics
```r
> mygraph <- add.gexf.edge(mygraph, id=0, source=0, target=1, start=10, end=15)
> mygraph <- add.node.spell(mygraph, id=1, start=3, end=18)
```
