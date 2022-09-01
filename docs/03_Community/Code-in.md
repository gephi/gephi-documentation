---
id: code-in
title: Code in
---

This document compiles official Gephi Google Code-in 2010 proposals. One can propose other ideas by going on the forum and start the discussion. The Idea List is also a great source of inspiration.
Each task should not take more than ten days. The difficulty is not always correlated to the duration of the task.

The Google Code-in 2010 is in selection step. Unfortunately Gephi has not been selected this year.

## Code

Tasks related to writing or refactoring code.

### OBJ Importer
* Difficulty: Medium
* Description: Code an Export plug-in to read [OBJ files](http://www.wikiwand.com/en/Obj). Edges should be found by triangulation.

### JVX Exporter
* Difficulty: Easy
* Description: ode an Export plug-in to write [Javaview JVX files](http://www.javaview.de/). See the [question here](https://answers.launchpad.net/gephi/+question/120176).

### OBJ Exporter
* Difficulty: Easy
* Description: Code an Export plug-in to write OBJ files.

### Node Eraser Tool
* Difficulty: Easy
* Description: Removing nodes under the cursor's click surface; the diameter of the surface is variable (like Photoshop).

### Edge Eraser Tool
* Difficulty: Easy
* Description: Like the Add Edge Tool but removes and edge, after selecting its source and target.

### Color Picker Tool
* Difficulty: Easy
* Description: Add an eye dropper for picking colors directly from other nodes.

### Component Selection Tool
* Difficulty: Easy
* Description: Select a component by clicking on its node.

### Pruning Tool
* Difficulty: Easy
* Description: Removing all but the top `<x>` edges per node.

### Edit Edge Tool
* Difficulty: Easy
* Description: Like the Edit Node Tool but for and edge, after selecting its source and target.

### Neighbors Grouping Tool
* Difficulty: Easy
* Description: Group a node and all the nodes it's connected to.

## Documentation

Tasks related to creating/editing documents.

### Reference HowTos
* Difficulty: Easy
* Description: Write documentation about atomic tasks in the software, like 
"How To Open, Close and Save a Project", "How To Create a Graph from scratch", 
"How To Execute a Layout", "How To Filter a graph" etc.

## Outreach

Tasks related to community management and outreach/marketing.

### Social Networks Census
* Difficulty: Easy
* Description: Simple "market study" on who claims to be interested in 
Gephi via Twitter, Facebook and LinkedIn. The goal is to write a report by 
categorizing people's activities and location.

## Quality Assurance

Tasks related to testing and ensuring code is of high quality.

### Release Process Scripting
* Difficulty: Hard
* Description: Create ANT, BASH and BAT scripts to speed-up the release process. See HowTo release Gephi.

### Bug Squashing
* Difficulty: Easy
* Description: Find and report 10 new bugs.

### Crash Report Tunneling
* Difficulty: Medium
* Description: Gephi crash reports (XML files) are sent to a webserver and directly 
forwarded to an email address. The goal of this task is to create a mini PHP system 
to handle these reports and wait for an admin to review them. The admin will choose 
either to ignore or to forward the crash report on Launchpad by a single click. 
If the report is put on Launchpad and if the Gephi user has informed his email, the 
system sends an email to him containing the link to the bug on Launchpad.

## Research

Tasks related to studying a problem and recommending solutions.

No task for the moment.

## Training

Tasks related to helping others learn more.

No task for the moment.

## Translation

Tasks related to localization.

### Software translation
* Difficulty: Hard
* Description: Translate Gephi in your native language. See the Localization page. 
The translation must be validated by a Launchpad Translation Team.

### Unlocalized Strings
* Difficulty: Easy
* Description: Find unlocalized strings in the source code and localize them.

## User Interface

Tasks related to user experience research or user interface design and interaction.

### Mac OS X installer
* Difficulty: Medium
* Description: Create an installer for Mac OS X. A Windows installer already exists.

### Shortcuts
* Difficulty: Easy
* Description: Add shortcuts to the program.

### "Export Neighborhood" option
* Difficulty: Easy
* Description: Right click a node in the graph window and then "export this node, its edges and connected nodes" to a new workspace.