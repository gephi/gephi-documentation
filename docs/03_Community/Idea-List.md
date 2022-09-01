---
id: idea-list
title: Idea List
---

## Layouts

* flip the graph horizontally or vertically (Geometric transformation plug-in)
* tree layout
* hyperbolic layout (see this thread)
* bipartite (and multipartite) graph layout (see this thread and this one)

## Hierarchies

* Option to size meta-nodes according to the #nodes having a specific attribute value. Currently, it is according to #nodes.

## Statistics

* Add the support of edge weight in the centrality measures: betweenness, closeness, eccentricity. [issue #557]
* When computing Shortest Paths, add an option in the metrics panel to save the paths in a new attribute column (of type String List).

## Tools

* Node shapes (circle, rectangle, triangle, pie, etc.) and its partition
* Zoom in / Zoom out
* A lasso type selection
* Painter Tool, color applies incrementally, good idea ?
* Ability to move nodes selected with the Rectangle Tool.
* Pruning: removing all but the top `<x>` edges per node
* Ability to add node and edge attributes in editing window
* Invert selection, add to selection, subtract from selection, intersect with selection
* Select a component by clicking on its node
* Node Eraser: removing nodes under the cursor's click surface; the diameter of the surface is variable (like Photoshop)
* Edge Eraser
* Hops/traversal depth: hide nodes beyond the `<x>` limit of hops from a selected node.
* Edit edge
* Add an eye dropper for picking colors directly from other nodes
* Group a node and all the nodes it's connected to
* Local layout on a given group (see forum topic)
* Local layout on selected nodes
* Undo last action
* Edge painter

## Filters

* Supports list attributes
* Keep edges with a particular rule on source node and another rule on target node. (not sufficiently defined)
* Allow creation of a filter over a variable max distance parameter from a specific node. i.e: Filter all the nodes within a distance of X starting from node N. (Although the heatmap allows highlighting it doesn't allow filtering nor max distance variation).

## Dynamics

* video recoding, with output either video format or a series of PNG [issue #558]

## Reliance

* autosave the current project every xx minutes

## Graph

* Support for hyperedges
* Create adjacency matrix from Graph
* Our nodes of graph should support multi shapes. For example circle or Cafe24 screenshots triangle.
* I want to draw the nodes of graph in the pie-chart shap to explain the overlpping partition of the network . The fractions of a pie-chart shows the probility of a node belonging to different communities. If anyone knows how to achieve the gole please contact me: hblxidian@gmail.com
* support for fuzzy cognitive mapping (FCM), for example: https://github.com/megadix/jfcm

## Usability

* Fullscreen mode with only the graph, and maybe the timeline.
* Option to disable fast pan on Graph window using right-click on the mouse.
* Reorganize tools groups (see forum topic)
* Write "Require reboot" on settings panels
* Copy/paste from an opened Excel file
* Option to correlate the drag of a group node to its children (see forum topic)
* Widgets to zoom in/out, rotate and incline the graph view in Overview.
* Copy/Paste selection in Edit menu
* Shortcuts to pan ("spacebar") and zoom ("z") (see forum topic)
* Merging the Selection and Move tools
* Search panel added as a Viz addon (like Hierarchy) to search nodes on their ID and Labels. The user can browse the results with Prev/Next buttons. The search supports regular expressions.

## Visualization

* Nodes as images, loaded from URI attributes
* Background image
* Keep ratio in screenshots
* Allow linebreaks for better readability of long text labels see this post on forum
* Palette support. For example, the partitioning tool can sometimes suggest a large number of partitions. It would be great if the colors could be chosen from a predefined palette to make visualizations more pleasant.
* Hide edge labels based on selection, like nodes

## IO

* Dynamic Graph SQL see this post on forum
* Access DB connector
* Import Pajek vector files to support attributes
* Import Pajek partition files
* JPG export
* Option to force re-casting attributes instead of using string by default (useful when type is not well defined in file)
* Merge parallel edges in dynamic mode, in GEXF import
* Export SVG with 3D/Shaded nodes as in Pajek

## Partition

* merging 2 partitions and assigning all the nodes the color that nodes of the chosen partition have.
* to complement node color and size partitions, add node shape and frame border partitions.
* Supports list attributes

## Data Table

* Display color and size columns (not by default).
* Display the "Settle" value of nodes (not by default).
* Join external tabular data (spreadsheet) using any column into gephi.

## Preview

* Cartography maker with automatic legend (colors, sizes) + title and paragraph of description
* Choosing text position [issue #560]

## Misc

* Palette controller - save user palette
* "Absolute" node size and edge width to allow comparisons between graphs (respect of scales in parameters)
* Gremlin integration (see this thread)
* Plug-in to manage external tools so that one can call an external program and re-use the results, like in CIShell
* Binding to R like in Visone

## Install

* When uninstall, option to keep preferences (see InnoSetup options)

## Project Management

* Use Maven for building (advantage: built-in dependency management for additional libs)? (see this GSoC proposal)
* script to execute before commit, which check if a module has been changed to increment its version inside Module/manifest.mf