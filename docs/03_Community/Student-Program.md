---
id: student-program
title: Student Program
---

Gephi Student Program is an inititive to propose various tasks adapted to computer science students and help them to create Gephi plugins. Proposals amount of work fit to a semester or a quartile and can be achieved during official lectures hours or as free-time projects. Graphs and networks are at the heart in variety of problems, for instance Network Science, Sociology, Data Mining, Statistics, HCI (Human-Computer Interaction) and more. The ability to visualize and manipulate graph structures in a simple way is central to understand these problems.

Gephi is programmed in Java and can be easily extensible by plugins. The possibility of applications and interaction with other tools are infinite. For instance:
* Get graph data from any web API and push streamed graph in real-time
* Try out a new algorithm or metrics
* Build any type of graph from any type of data (words, friends, web-pages, cells, software code, ideas, companies, routers, cities, etc.)
* Try out a new visualization or interaction technique
* Design original user interface

## Proposals

*Please add your ideas here*

### Speech analysis
Build a set of text-mining methods to extract graph of words from a speech. Edges are computed when words are present in the same sentence. Optionnaly use NGrams instead of words only.

### TreeMap
Integrate TreeMap visualization for hierarchical graphs.

### Minimap
Minimaps help to navigate inside an [image](http://danielmclaren.net/2007/04/05/flash-minimap-component) or a graph. One existed in Gephi 0.6 but has never been set for 0.7. Adding it would be very useful, especially on handling large graphs.

### Mediawiki, Dokuwiki and Drupal Vizualization
Integrate Gephi with Drupal (drupal.org) and/or Mediawiki (mediawiki.org) and/or Dokuwiki (see [this thread](http://forum.gephi.org/viewtopic.php?f=6&t=472&p=1382)).

### Histogram widget
Create small and dynamic bar chart widget in full Java Swing. Bar chart are for instance used in 'range' filters to show the range of values and how much the filter is covering with alpha. A more detailed bar chart is required and could be displayed for instance, if user stay 2 seconds on the small bar chart. This bigger chart would have scroll support and selection of the scale, as well as mouse over on values.

### Tools
Tools manipulate visually the graph and play with its position, color, size and other visual properties. Tools receives events about mouse movement or node selection and react on it.

### Ideas
Local force-vector: Execute locally a layout algorithm

### Lasso selection
Selection items on graph with a lasso.

### Initial positioning
When a graph is loaded without (X, Y) positions for nodes, the position is set as random in a range (-1000, 1000) for both axis. Layout algorithms are predictable - from similar starting positions, a layout algorithm will result in (slightly) the same position at the end. The issue is with a random positioning at the beginning, several layout execution bring different results. For improving structures mental map, it would be interesting to develop a pseudo-random initial positioning algorithm.
The algorithm would take nodes identifiers (string) as input and calculate a unique hash key, convertible as (X, Y) positions.

### Integrate Web Browser
There are various ways to integrate a web browser into a Java Swing application. Different solutions have to be evaluated and compared, in terms of portability and compatibility with modern Javascript and HTML5.
Having a browser inside Gephi would be extremely useful for displaying complex results and interact with it. Currently, the Statistics/Metrics reports are already HTML but the browser is slow and doesn't allow any Javascript. What if we could replace static JFreeChart graphs by Protovis or any other JS-based chart library? What if we could natively render SVG within Gephi using the browser. The browser could also be used by plug-ins and gain flexibility.
EDIT: <http://netbeans.dzone.com/how-to-nb-djnative-swing>

### Try Mondrian integration
Test how possible is the integration of Mondrian components in Gephi, for instance ScatterPlot.

### Overlapping Community Detection
Implementation of a clustering method which allows for overlapping communities
The clique percolation method is great, see <http://cfinder.org> and the underlying [paper](http://www.nature.com/nature/journal/v435/n7043/full/nature03607.html).
And <http://sites.google.com/site/linegraphs/>

### Interoperability in formats
Interested in data formats? Work on file formats implementations in Gephi (import and export) to increase stability and interoperability with other tools. Build unit tests to test how robust importers are. Figure out common mistakes in formatting and implement automatic error detection/corrections.

### Scientometrics Plugin
A module dedicated to scientometrics / bibliometrics. The user could provide a file with data formatted in a bibliometric format (say, BibTeX, or ISI) and Gephi would import it and offer a menu of networks to create from it. See [Network WorkBench](http://nwb.slis.indiana.edu/) for features inspiration.
* network of co-authors
* network of co-citations
* co-word analysis from the abstracts, or from the titles, etc.

### Semantic Analysis Plugin
Many libraries already exists in the Java world. See possibilities to use them to bring direct Semantic networks creation in Gephi.
Ideas of features: - to remove stop-words - to identify time-stamps and use them to generate a dynamic graph - to include / exclude languages from the analysis (based on tags) - to compute statistics (frequency of words, frequency of lemmes, burst analysis, etc.)

### Gremlin
[Gremlin](http://wiki.github.com/tinkerpop/gremlin/) is a graph-based programming language. Create a connector between Gremlin and Gephi by adding an interface to Gephi inside Blueprints.

### Sub-graph matching
See: <http://en.wikipedia.org/wiki/Subgraph_isomorphism_problem>
Recent paper: <http://www.umiacs.umd.edu/research/LCCD/projects/COSI.jsp>

### New clustering algorithm
Implement Link communities in complex networks. [link](http://barabasilab.neu.edu/projects/linkcommunities/).

### Multi-line text
The current visualization allows only to have text on a single line. Add the multi-line feature:
* Be able to sets lines manually
* Automatically create lines from a text, find '\n'
* Code for lines positioning. Some code already exists at 'org.gephi.visualization.opengl.text.TextUtils.reflow()'

### Hierarchical Clustering
Implement Hierarchical Clustering: with for example this [code](http://deim.urv.cat/~sgomez/multidendrograms.php).
A better dendrograms display could also be done, as the current one is not satisfactory.

### Palette Manager
Gephi's Ranking module has a set of embedded palette, it would be nice to let user save their own.
Inspiration: ColorBrewer

### Curved edges arrow
The preview module currently doesn't display arrows for curved edges, only for straight. Adding arrows for curved edges would require a little bit of geometry and integrate the new setting in the current API.

### Linear Network Visualization
Implement the new [Linear Network Visualization](http://mkweb.bcgsc.ca/linnet/) technique in Gephi. You'll be mentored by Martin Krzywinski, the mind behind this idea to implement it in the best way in Gephi.
Specifications for version 0.1:
* three axes
* node to axis mapping by connectivity (not user configurable)
* directional graphs: in, out, in/out
* nondirectional graphs: degree 1, 2, >2
* node position on axis by degree, in ascending order outward
* node position can be rank ordered
* axis length can be normalized

Follow the HowTo write a layout tutorial to nicely integrate it in Gephi.

### Effective Labeling
Labeling is essential for graph visualization. But labeling can be quite complex, probably the reason why only simplistic labeling mechanisms are applied most of the time. Gephi should consider implementing better labeling. A possible solution could be to integrate the labeling by Luboschik et al., 2008 ([link](http://www.informatik.uni-rostock.de/~malub/pub/08/labeling/info.html)). Moreover, particularly the interactive graph view of Gephi would benefit from a kind of focus+context labeling. The idea is to show detail labels in the focus (e.g., in the center of the window or directly at the mouse cursor) and to show only a few aggregated labels for the context. Labeling could also be made zoom-dependent, meaning that only few aggregated labels are shown for overviews, and more and more detailed labels fade in as soon as the user zooms into the graph. This way heavy cluttering of labels could be avoided.

### Main Flow of Ideas, Analysis of a Network of Citations
Method for analyzing a network of citations, a network derived from a set of patents or scientific papers. The methodology could be find in Verspagen (2005), Mapping Tecnological Trajectories as Patent Citation Networks. A Study on the History of Fuel Cell Research ([link](http://dimetic.dime-eu.org/dimetic_files/Vol10No1(2007)93-115.pdf)) starting from page 99-103. This method construct a main path corresponding to the main flow of ideas.

### Layout on GPU
Implement a layout algorithm using GPU.

### Alpha shapes
Given a set of points, draw the alpha shape in Preview. Alpha shapes are better than convex hulls. Example: <http://vis4.net/labs/184>