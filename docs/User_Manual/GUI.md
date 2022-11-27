---
id: gui
title: Graphical User Interface
sidebar_position: 3
tags:
  - GUI
  - Startup
---
## Global visual framework

### Organization

Gephi is a flexible desktop application and a visual framework: it does not constrain the user to do some tasks in a predefined way. On the contrary, the user is free to rearrange the environment, move panels, show/hide windows, etc. The GUI is set by default for three task families grouped as Overview, Data Laboratory and Preview.

Modes are accessible under the main menu:
- **Overview**: graph manipulation mode.
- **Data Laboratory**: data visualization in tables.
- **Preview**: visual tuning before vectorial export.

![image](/docs/User_Manual/GUI/00_image.png)

![image](/docs/User_Manual/GUI/01_image.png)

![image](/docs/User_Manual/GUI/02_image.png)

### Workspaces

A workspace is a whole environment for exploring one graph. If you want to analyze more graphs simultaneously, you need to create new workspaces. Create, delete and clean workspace data from the Edit menu.
Note that each new graph import creates a new workspace if you select the "Add full graph" option in the import window. Hence you are still able to work on the first graph later.

![image](/docs/User_Manual/GUI/03_image.png)

## Overview

### Graph and Tools

![image](/docs/User_Manual/GUI/04_image.png)
**Graph window** - Graph rendered on the center and tools on the sides.

![image](/docs/User_Manual/GUI/05_image.png)
**Select** Highlight nodes under the cursor.

![image](/docs/User_Manual/GUI/06_image.png)
**Edge selection color** Incoming links are colored differently than outgoing links.

![image](/docs/User_Manual/GUI/07_image.png)
**Heatmap** Set color intensity on a node neighborhood, by the distance.

![image](/docs/User_Manual/GUI/08_image.png)
**Multiple select** Nodes are selected under the rectangle.

![image](/docs/User_Manual/GUI/09_image.png)
**Shorthest path** Display the shortest path if exist between two clicked nodes.

### Layout

Select an algorithm and set parameters on the fly. Save them into presets.

![image](/docs/User_Manual/GUI/10_image.png)

### Ranking

Set numerical attributes to distribute node/edge colors, sizes, label colors and label sizes. Right-click on the window to display the ranked list of nodes or edges.

![image](/docs/User_Manual/GUI/11_image.png)

### Partition

Node or edge grouping on attribute or computed metric. A color is assigned to each group, and can be changed by right-clicking on the window.

![image](/docs/User_Manual/GUI/12_image.png)
Group List

![image](/docs/User_Manual/GUI/13_image.png)
Pie chart

### Statistics/metrics

Run metrics and save reports in HTML. Node and edge computed results are available as attributes.

![image](/docs/User_Manual/GUI/14_image.png)

### Filters

A library of filters is available to combine. Drag the filter (e.g., Degree Range) to build the query, and then set the parameters visually. Finally apply the query output to select elements or to filter them. When filtering is activated, changes appear in real time.

![image](/docs/User_Manual/GUI/15_image.png)

### Timeline

Move left and right cursors to filter the graph on time intervals.

![image](/docs/User_Manual/GUI/16_image.png)

The timeline opens automatically when you open a dynamic network. Enable the timeline to set the time interval. Drag the bounds of the interval using your mouse.

### Context

Display the number of nodes and edges, the type of the graph and the percentage of visible nodes.

![image](/docs/User_Manual/GUI/17_image.png)

### Edit

View and edit the attributes of a selected node.

![image](/docs/User_Manual/GUI/18_image.png)

## Data Laboratory

Show node and edge attributes in a table, which also allows for dynamic regexp filtering.

![image](/docs/User_Manual/GUI/19_image.png)

## Preview

### Settings

Customizable visuals for vectorial export, which may be saved as presets.

![image](/docs/User_Manual/GUI/20_image.png)

### Visualization

Fine tuning on nodes, edges and labels rendering.

![image](/docs/User_Manual/GUI/21_image.png)