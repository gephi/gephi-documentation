---
id: gui
title: Graphical User Interface
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

![image](https://cloud.githubusercontent.com/assets/177962/5592891/ff1400d0-91e9-11e4-97bf-f9bcb28c95e1.png)

![image](https://cloud.githubusercontent.com/assets/177962/5592889/d47429fe-91e9-11e4-801b-af3430b381b9.png)

![image](https://cloud.githubusercontent.com/assets/177962/5592892/0b62b3ea-91ea-11e4-8fcc-158facd255eb.png)

### Workspaces

A workspace is a whole environment for exploring one graph. If you want to analyze more graphs simultaneously, you need to create new workspaces. Create, delete and clean workspace data from the Edit menu.
Note that each new graph import creates a new workspace if you select the "Add full graph" option in the import window. Hence you are still able to work on the first graph later.

![image](https://cloud.githubusercontent.com/assets/177962/5592898/4c1f69aa-91ea-11e4-82cb-d6e5f73f40d7.png)

## Overview

### Graph and Tools

![image](https://cloud.githubusercontent.com/assets/177962/5592901/5db09874-91ea-11e4-8601-cb3f7b5d7c7e.png)
**Graph window** - Graph rendered on the center and tools on the sides.

![image](https://cloud.githubusercontent.com/assets/177962/5592902/6c2804f0-91ea-11e4-9ed5-0b5643303610.png)
**Select** Highlight nodes under the cursor.

![image](https://cloud.githubusercontent.com/assets/177962/5592904/7ceb37ee-91ea-11e4-8d10-e3049f77f4f0.png)
**Edge selection color** Incoming links are colored differently than outgoing links.

![image](https://cloud.githubusercontent.com/assets/177962/5592907/88b4e462-91ea-11e4-9ce7-144b5c211dcf.png)
**Heatmap** Set color intensity on a node neighborhood, by the distance.

![image](https://cloud.githubusercontent.com/assets/177962/5592910/93e37574-91ea-11e4-9640-e6f70fa02ea6.png)
**Multiple select** Nodes are selected under the rectangle.

![image](https://cloud.githubusercontent.com/assets/177962/5592912/9fe36f46-91ea-11e4-9f5c-bc4258d8fcd0.png)
**Shorthest path** Display the shortest path if exist between two clicked nodes.

### Layout

Select an algorithm and set parameters on the fly. Save them into presets.

![image](https://cloud.githubusercontent.com/assets/177962/5592915/c1db479a-91ea-11e4-8a75-b0a98ec98fb7.png)

### Ranking

Set numerical attributes to distribute node/edge colors, sizes, label colors and label sizes. Right-click on the window to display the ranked list of nodes or edges.

![image](https://cloud.githubusercontent.com/assets/177962/5592917/ce762b32-91ea-11e4-83aa-b7bdb67c7739.png)

### Partition

Node or edge grouping on attribute or computed metric. A color is assigned to each group, and can be changed by right-clicking on the window.

![image](https://cloud.githubusercontent.com/assets/177962/5592918/dd088172-91ea-11e4-9443-d5058c1f71bf.png)
Group List

![image](https://cloud.githubusercontent.com/assets/177962/5592919/e2bbd560-91ea-11e4-9cf1-cd8a9101cd16.png)
Pie chart

### Statistics/metrics

Run metrics and save reports in HTML. Node and edge computed results are available as attributes.

![image](https://cloud.githubusercontent.com/assets/177962/5592923/f6a3699e-91ea-11e4-8276-cd7237738a92.png)

### Filters

A library of filters is available to combine. Drag the filter (e.g., Degree Range) to build the query, and then set the parameters visually. Finally apply the query output to select elements or to filter them. When filtering is activated, changes appear in real time.

![image](https://cloud.githubusercontent.com/assets/177962/5592924/02dc483e-91eb-11e4-840f-50b8d081b90d.png)

### Timeline

Move left and right cursors to filter the graph on time intervals.

![image](https://cloud.githubusercontent.com/assets/177962/5592925/0f878ada-91eb-11e4-871f-d1d63d585861.png)

The timeline opens automatically when you open a dynamic network. Enable the timeline to set the time interval. Drag the bounds of the interval using your mouse.

### Context

Display the number of nodes and edges, the type of the graph and the percentage of visible nodes.

![image](https://cloud.githubusercontent.com/assets/177962/5592927/1d806a76-91eb-11e4-9e15-6f62d129c1d8.png)

### Edit

View and edit the attributes of a selected node.

![image](https://cloud.githubusercontent.com/assets/177962/5592929/292a6f5c-91eb-11e4-9c89-dd63b31d0fe4.png)

## Data Laboratory

Show node and edge attributes in a table, which also allows for dynamic regexp filtering.

![image](https://cloud.githubusercontent.com/assets/177962/5592930/3eac363a-91eb-11e4-8e89-5d1ad36764b7.png)

## Preview

### Settings

Customizable visuals for vectorial export, which may be saved as presets.

![image](https://cloud.githubusercontent.com/assets/177962/5592932/514e57e6-91eb-11e4-8e94-562145c49fcd.png)

### Visualization

Fine tuning on nodes, edges and labels rendering.

![image](https://cloud.githubusercontent.com/assets/177962/5592936/5de54e24-91eb-11e4-8302-0bf891c4cfe8.png)