---
id: scripting-plugin
title: Scripting Plugin
---

This introduction tutorial will guide you through the features of the Gephi Scripting Plugin. The plugin originated as a [GSoC 2011 project](https://gephi.org/2011/gsoc-mid-term-scripting-plugin), in a joint proposal with the [GUESS](http://graphexploration.cond.org/) project which aimed at porting the Gython language as a console plugin for Gephi.

![console](https://cloud.githubusercontent.com/assets/197285/5621763/951d8a5e-9539-11e4-9a4f-9f925060ddb9.png)

*A sample scripting console session.*

## Background

The Scripting Plugin provides a console in which the user can execute Python commands and manipulate the graph. The plugin allows users to do tasks that are usually repetitive and tedious on the GUI in a very easy way, by making the graph accessible through a concise scripting language called Gython.

Gython was originally conceived by the GUESS project and consists of a Domain-Specific Language for manipulating graph structures, implemented over Python. Among the main features of the language are:

- Nodes and edges are exported to the scripting language as regular objects. Attributes of these objects can be accessed directly (e.g. v1.color).
- Additional operators for handling graph structures, like the A -> B operator, which selects all the edges that connect the nodes (or set of nodes) A and B.
- Filters can be easily created with the comparison operators on nodes or edges attributes (e.g., dept == "IT" builds a filter that selects all nodes in the IT department).
- The attributes of a set of nodes can be set easily with a single command (e.g., (dept == "IT").color = blue sets the color of all the nodes in the IT department to blue).

## Installation

The Scripting Plugin can be installed through the Gephi's Tools/Plug-ins menu:

1. Go to the Tools > Plug-ins menu on Gephi's user interface.
2. Open the Available Plugins tab.
3. Click the "Reload Catalog" button, to make sure you have an up-to-date catalog.
4. Select the "Scripting Plugin" on the list and click the Install button.

After installation, the plugin can be accessed through the left slide on Gephi's UI (as shown on figure) or through the Window > Console menu. 

![console-location](https://cloud.githubusercontent.com/assets/197285/5621764/9525a69e-9539-11e4-9232-f70fd38fe917.png)

*Location of the Scripting Console on Gephi's UI.*

## Usage

Since the plugin's language is based on Python, it is desirable that you have some basic Python knowledge to work with the plugin. Although, you should be able to follow this quick start guide even if you have never programmed before.

After installing the plugin, you can open the Console through the Window menu from Gephi's user interface. The Console window works similarly to a command line window that you would find in most operating systems: you type commands into this console and hit enter to have them evaluated.

If you type there a simple arithmetic expression like 2 + 2, you should get the following output on the console:

```python
>>> 2 + 2
4
```

The next sections assume that you have a graph opened on the current workspace. You can use any of the [Gephi sample datasets](http://wiki.gephi.org/index.php/Datasets) or any graph of your own. Note that there is one console session for each workspace. This means that you can only access the current workspace through the console session.

### Accessing the Graph

The main graph object can be accessed through the reserved variable name `g` (or through the alias `graph`). This object has a few methods and attributes. The most important ones are probably the attributes `nodes` and `edges`, which are respectively the set of the graph's nodes and edges.

Let's say that, for example, you would like to see the set of nodes and the set of edges of the graph:

```python
>>> g.nodes
set([v1, v2, v3, v4, v5, v6, v7, v8])
>>> g.edges
set([e1, e2, e3, e4, e5])
```

Based on the output above, we can conclude that this graph has 8 nodes and 5 edges. To get the number of nodes and edges through code, you can use the len built-in function from Python:

```python
>>> len(g.nodes)
8
>>> len(g.edges)
5
```

As you can see, each node and edge of the graph can also be accessed through reserved variables. You can access the nodes simply by prefixing the node id with "v", while the edges can be accessed by prefixing the edge id with "e". Gython names them based on their internal identification number on the Gephi toolkit.

The graph object "g" has three methods to look if the graph is directed, undirected or mixed: isDirected, isUndirected and isMixed:

```python
>>> g.isDirected()
False
>>> g.isUndirected()
True
```

### Nodes

To access a node from the console, just prefix the node's id with v. If you're unsure of the node's id, you can check the Data Laboratory or just see the entire list of nodes by calling "g.nodes" in the console.

The nodes objects (v1, v2, etc) make it very easy to read/write attributes to nodes. For instance, if you have a node attribute column called "gender" you can access it directly for both reading and writing, for example:

```python
>>> v42.gender = "female"
>>> v42.gender
"female"
```

Topological attributes and other default attribute columns are also available from the node object attributes:

Attribute  | Type | Read-Only | Description
-----------| ---- | --------- | -----------
color | java.awt.Color (or simply "color") | No | The color of the node
size | Float | No | The size of the node
label | String | No | The label of the node
x | Float | No | The x coordinate of the node
y | Float | No | The y coordinate of the node
fixed | Boolean | No | True if the node's position is fixed
indegree | Integer | Yes | The number of incoming edges incident to node
outdegree | Integer | Yes | The number of outgoing edges incident to node
degree | Integer | Yes | The degree of the node
neighbors | Set | Yes | A list of the nodes that are connected to the node 


So, if you want to set v1's color to red, you can run the following command:

```python
>>> v1.color = red
```

To get the set of neighbors of a given node:

```python
>>> v1.neighbors
set([v5, v7])
```

Or to get the degree of a node:

```python
>>> v1.degree
2
```

Creating new attribute columns is straightforward. If you try to set a node's attribute that does not exist, its corresponding attribute column will be created automatically.

### Edges

Accessing edges through the scripting console is done in a similar way as nodes, but through the reserved variable names prefixed with "e". You can also access your edge's attributes with the same notation as nodes. Let's say you have a edge attribute column called "relationship":

```python
>>> e4.relationship = "friends"
>>> e4.relationship
"friends"
```

Just like nodes, edges also have some default attributes available:

Attribute  | Type | Read-Only | Description
-----------| ---- | --------- | -----------
color | java.awt.Color (or simply "color") | No | The color of the edge
weight | Float | No | The color of the edge
label | String | No | The label of the edge
directed | Boolean | Yes | Indicates if this edge is directed
source | Node | Yes | The source of this edge
target | Node | Yes | The target of this edge


These attributes work just like the nodes' attributes. So, if you want to see which is the source node of the edge e3, you would just run the following command:

```python
>>> e3.source
v2
```

### The Additional Operators

If compared to Python, the Gython grammar has four additional operators for selecting edges. These operators work as follows:

- v1 <-> v2: selects the undirected edge connecting nodes v1 and v2.
- v1 -> v2 (or v2 <- v1): selects the directed edge from node v1 to node v2.
- v1 ? v2: selects any edges connecting nodes v1 and v2.

These operators can be applied to sets of nodes too. So, for instance, if you want to get all the directed edges from nodes v3, v4 or v5 to any of the graph's nodes, you could get them by doing the following (recall that the nodes attribute from the main graph (g) corresponds to the set of all the graph's nodes):

```python
>>> set([v3, v4, v5]) -> g.nodes
set([e4, e7, e9, e10])
```

Now let's say you want to update an attribute of these edges. For example, to set the weight of these edges to 2.5, we could assign the resulting set of edges to a new variable and modify the attribute as follows:

```python
>>> our_edges = set([v3, v4, v5]) -> g.nodes
>>> our_edges.weight = 2.5
```

Or, we could simply do the following:

```python
>>> (set([v3, v4, v5]) -> g.nodes).weight = 2.5
```

### Modifying the Graph

Modifying the graph through the console is a straighforward process. The main graph object "g" has the following methods for modifying the graph structure:

- `addNode()`: creates a new node on the graph.
- `addDirectedEdge(source, target)`: creates a directed edge between the source and target nodes.
- `addUndirectedEdge(source, target)`: creates an undirected edge between the source and target nodes.
- `addEdge(source, target)`: equivalent to `addUndirectedEdge(source, target)`.

Using these methods, you could create two new nodes and connect them with an undirected edge by running the following commands:

```python
>>> g.addNode()
v1
>>> g.addNode()
v2
>>> g.addUndirectedEdge(v1, v2)
e1
```

Note that the addNode method tells us the id of the newly created node, while the same thing happens to the addUndirectedEdge method.

The addNode method also has a very handy feature, for setting attributes while you're creating nodes. Let's create a new node with the green color and some given coordinates:

```python
>>> g.addNode(color = green, x = -32, y = 16)
v3
```

To delete nodes and edges from the graph you can use the del statement like this:

```python
>>> del v2
>>> del e3
```

### Applying Filters

The scripting plugin makes building complex filters a really simple operation. All the nodes and edges' attributes are available through global variables on the console (even the nodes' topology attributes like degree, indegree and outdegree). To build filters, you only have to use these attributes with one of the comparison operators: `==, !=, >, <, >=` and `<=`.

For instance, if you would like to create a filter that matches only nodes with degree greater than 5, you could type:

```python
>>> degree > 5
<org.gephi.scripting.wrappers.GyFilter object at 0x2>
```

You can build more complex filters with the & and | operators, which correspond to the AND and OR logical operators. For instance, if you have a node attribute "age" and you would like to match nodes older than 21 that have at least one neighbor (degree >= 1):

```python
>>> (age > 21) & (degree >= 1)
```

Or if you would like to match nodes that are into the "HR" or the "IT" departments:

```python
>>> (dept == "HR") | (dept == "IT")
```

You can put together as many filters as you want. Don't forget the parenthesis around the filters, as they're necessary because of Python's operator precedence.

Even though the above examples teach you how to build filters, that code is pretty much useless until now. Let's create a new filter again (based on the first example) and, this time, apply it to the main graph. To do that, you have to use the filter method from the main graph object ("g" or "graph"). The filter method is really simple, it applies the filter that is passed as parameter and returns a subgraph that is the result of the filtering operation:

```python
>>> mySubGraph = g.filter(degree > 5)
```

Note that the resulting subgraph object has the same methods and attributes as the main graph object "g". This means that you can get the nodes and edges through the nodes and edges attributes or even apply more filters to your subgraph through the filter method:

```python
>>> mySubGraph.nodes
set([v1, v5])
>>> myOtherSubGraph = mySubGraph.filter(age > 42)
```

The only difference between a subgraph object and the main graph object "g" is that the addNode and addEdge methods are not available on the subgraph. Since the nodes attribute from the subgraph object is just a regular Python set, you can check if a given node is in a subgraph by typing:

```python
>>> v1 in mySubGraph.nodes
True
>>> v2 in mySubGraph.nodes
False
```

To see a subgraph in the Graph View component of Gephi, you can just assign it to the "visible" global variable or call the setVisible function:

```python
>>> visible = mySubGraph
>>> setVisible(myOtherSubGraph)
```

Finally, to add a filter to the Filters User Interface on Gephi, you just have to use the addFilter function:

```python
>>> addFilter((dept == "HR") & (age == 42), name = "42 year-old people from the HR department")
```

Now you should see a new filter called "42 year-old people from the HR department" on the UI. Note that the "name" parameter to the addFilter function is optional. 

### Running Layouts

There are two global functions that are used to running and stopping layouts execution from the console: runLayout and stopLayout.

The function runLayout takes a single argument: a reference to the layout builder of the layout that is going to be executed. If you would like to run the ForceAtlas 2 algorithm, you would have to import it's builder and then run it, for instance:

```python
>>> import org.gephi.layout.plugin.forceAtlas2.ForceAtlas2Builder
>>> runLayout(org.gephi.layout.plugin.forceAtlas2.ForceAtlas2Builder)
```

Of course, this is not good looking and not even easy to remember. To make this process more intuitive, the scripting plugin comes with aliases to the layout builders of all the layout algorithms that come with Gephi:

- YifanHu
- YifanHuProportional
- ForceAtlas
- ForceAtlas2
- FruchtermanReingold
- LabelAdjust
- YifanHuMultiLevel
- RandomLayout
- ClockwiseRotate
- CounterClockwiseRotate
- Contract
- Expand

So, to run the ForceAtlas 2 algorithm, we can just execute the following command:

```python
>>> runLayout(ForceAtlas2)
```

If you want to run an algorithm for a given number of iterations, the runLayout function also has an optional argument called iters. Let's use this argument to run 500 iterations of the Yifan-Hu algorithm:

```python
>>> runLayout(YifanHu, iters = 500)
```

To force stop the execution of a layout algorithm that is being currently executed, you have to call the stopLayout function, which takes no arguments:

```python
>>> stopLayout()
```

### Exporting

Since there aren't any customization options yet, exporting through the console is really straightforward. Everything is done just by calling the export function with the output file name as argument, for example:

```python
>>> exportGraph("/home/user/output.pdf")
```

Or if you want to export to a png image file:

```python
>>> exportGraph("/home/user/output.png")
```

### Using Third-Party Libraries

There's a lot of Python/Jython code available on the web. Using third-party libraries with the Scripting Plugin is very simple, you just have to put the library in the "scripts" directory under the [Gephi user directory](https://github.com/gephi/gephi/wiki/Troubleshooting#where-are-user-files). On Linux, this path should be something like:

```
/home/luiz/.gephi/0.8.1/dev/scripts
```

Or like this, on Windows 7:

```
C:\Users\Luiz\AppData\Roaming\.gephi\0.8.1\dev\scripts
```

After putting the library on that path, you should be able to import its modules as described on the respective library's documentation. Remember that the Scripting Plugin is based on Jython, therefore some more complex Python libraries are not guaranteed to work properly without some code modifications.

### Clearing the console
If you want to clear the console you can do so like this:
```python
console.text_pane.setText("")
```

## Additional Examples

This section provides some interesting and more complex examples of the scripting plugin. Feel free to share your snippets here!

To run these code snippets, you should save the code in a .py file and call the execfile() function with the full path to it. For instance:

```python
>>> execfile("/home/user/prim.py")
```

Relative paths work too, but they have to be relative to the run path (which is the path in which Gephi is installed, most of the times). This works for Windows too, but remember to escape the backslash characters from the file path like this:

```python
>>> execfile("C:\\Users\\user\\Documents\\prim.py")
```

### Generating Random Graphs

The following code snippet builds a random graph with 50 nodes and 50% of chance of an edge existing between two given nodes. After building the graph, it runs the Force Atlas layout algorithm for 500 iterations.

```python
import random
 
# create nodes
for i in range(50):
	g.addNode()
 
# create edges randomly
for u in g.nodes:
	for v in g.nodes:
		if random.random() < 0.5:
			g.addEdge(u, v)
 
# run force atlas layout
run_layout(ForceAtlas, iters=500)
```

### Depth-First Search

The following code snippet shows how to traverse the graph by doing a [Depth-First Search](http://en.wikipedia.org/wiki/Depth-first_search) that starts from the node v1. Once the DFS algorithm visits a node, it will change its color to red.

```python
visited = set([])
 
def dfs(u):
	visited.insert(u)
 
	u.color = red
 
	for v in u.neighbors:
		if v not in visited:
			dfs(v)
 
dfs(v1)
```

### Finding a Minimum Spanning Tree

This code snippet shows an implementation of the [Prim's Algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm) for finding the total weight of a minimum spanning tree on a given undirected graph.

```python
# the set of nodes that are not yet in the MST
U = g.nodes
 
# D[v] = the cost of adding node v to the MST
D = {}
for v in U:
	D[v] = float('inf')
 
# initially, the cost of adding some node to the MST is zero
D[iter(U).next()] = 0
 
# the total cost of the MST
total = 0.0
 
# while there are nodes to add to the tree
while len(U) > 0:
	# find the cheapest node that can be added
	node = iter(U).next()
	for v in U:
		if D[v] < D[node]:
			node = v
 
	# add it to the MST
	total += D[node]
	U.remove(node)
 
	# update the costs for the neighbor nodes
	for e in node <-> U:
		D[e.target] = min(D[e.target], e.weight)
 
# print the total weight of the MST
print "The total weight of the MST is %f" % total
```

### Finding a Shortest Path

The following code finds a shortest path between two given nodes on the graph by using the [Bellman-Ford algorithm](http://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm). It also highlights a shortest path between the nodes on the graph, by coloring it red and graying out nodes and edges that are not in the path.

```python
def shortest_path(start, end):
	# initialize distances and predecessor edges
 	dist, prev = {}, {}
 	for v in g.nodes:
 		dist[v], prev[v] = float('inf'), None
 	dist[start] = 0
 
	# Bellman-Ford algorithm
 	for i in range(len(g.nodes)):
 		for e in g.edges:
			if dist[e.target] > dist[e.source] + e.weight:
				dist[e.target] = dist[e.source] + e.weight
				prev[e.target] = e
 
	# color all the nodes and edges as RGB 200, 200, 200
	for v in g.nodes:
		v.color = color(200, 200, 200)
	for e in g.edges:
		e.color = color(200, 200, 200)
 
	# highlight a shortest path with the red color (if one exists)
	if dist[end] < float('inf'):
		e = prev[end]
		end.color = red
		while e != None:
			e.color = red
			e.source.color = red
			e = prev[e.source]
 
	# return the total weight of the path (distance)
	return dist[end]
```

Note that this code only defines a function called shortest_path. Therefore, after loading this code with execfile, you'll have to call the function from the console like this:

```python
>>> shortest_path(v1, v3)
```

## Feedback

### Reporting Bugs

If you find a bug, please report it to our [Issues Tracker](https://github.com/gephi/gephi-plugins/issues?labels=python-scripting-plugin) at GitHub. Just make sure to assign the python-scripting-plugin label to the issue you're reporting.

### Source Code

The source code is available on the [python-scripting-plugin branch](https://github.com/gephi/gephi-plugins/tree/python-scripting-plugin) of the gephi-plugins repository on GitHub. 