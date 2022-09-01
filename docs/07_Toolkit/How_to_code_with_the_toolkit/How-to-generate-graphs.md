---
id: how-to-generate-graphs
title: How to generate graphs
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

Demo how to generate a graph with generators. The code shows how to use **RandomGraph** and **WattsStrogatz** generators and push result into the graph structure using **ImportController**.

In Gephi import and generate are not directly appened to the main graph structure for consistency reasons. New data are pushed in a **Container** and then appened to the graph structure with the help of a **Processor**.
In this demo, two workspaces are created. Manipulate workspaces from **ProjectController**.

Gephi 0.8.x: 
```java
import org.gephi.project.api.ProjectController;
import org.openide.util.Lookup;
import org.gephi.project.api.Workspace;
import org.gephi.io.importer.api.Container;
import org.gephi.io.generator.plugin.RandomGraph;
import org.gephi.io.importer.api.ImportController;
import org.gephi.io.processor.plugin.DefaultProcessor;
import org.gephi.io.processor.plugin.AppendProcessor;
import org.gephi.io.generator.plugin.DynamicGraph;

//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Generate a new random graph into a container
Container container = Lookup.getDefault().lookup(ContainerFactory.class).newContainer();
RandomGraph randomGraph = new RandomGraph();
randomGraph.setNumberOfNodes(500);
randomGraph.setWiringProbability(0.005);
randomGraph.generate(container.getLoader());
 
//Append container to graph structure
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
importController.process(container, new DefaultProcessor(), workspace);
 
//Generate another graph and append it to the current workspace
Container container2 = Lookup.getDefault().lookup(ContainerFactory.class).newContainer();
RandomGraph randomGraph2 = new RandomGraph();
randomGraph2.setNumberOfNodes(100);
randomGraph2.setWiringProbability(0.01);
randomGraph2.generate(container.getLoader());
importController.process(container2, new AppendProcessor(), workspace);     //Use AppendProcessor to append to current workspace
 
//Create new workspace
Workspace workspace2 = pc.newWorkspace(pc.getCurrentProject());
pc.openWorkspace(workspace2);       //Set as current workspace
 
//Generate dynamic graph into workspace 2
Container container3 = Lookup.getDefault().lookup(ContainerFactory.class).newContainer();
 
DynamicGraph dynamicGraph = new DynamicGraph();
dynamicGraph.generate(container3.getLoader());
importController.process(container3, new DefaultProcessor(), workspace2);
```

Gephi 0.9.1:
```java
import org.gephi.project.api.ProjectController;
import org.openide.util.Lookup;
import org.gephi.project.api.Workspace;
import org.gephi.io.importer.api.Container;
import org.gephi.io.generator.plugin.RandomGraph;
import org.gephi.io.importer.api.ImportController;
import org.gephi.io.processor.plugin.DefaultProcessor;
import org.gephi.io.processor.plugin.AppendProcessor;
import org.gephi.io.generator.plugin.DynamicGraph;

//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Generate a new random graph into a container
Container container = Lookup.getDefault().lookup(Container.Factory.class).newContainer();
RandomGraph randomGraph = new RandomGraph();
randomGraph.setNumberOfNodes(500);
randomGraph.setWiringProbability(0.005);
randomGraph.generate(container.getLoader());
 
//Append container to graph structure
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
importController.process(container, new DefaultProcessor(), workspace);
 
//Generate another graph and append it to the current workspace
Container container2 = Lookup.getDefault().lookup(Container.Factory.class).newContainer();
RandomGraph randomGraph2 = new RandomGraph();
randomGraph2.setNumberOfNodes(100);
randomGraph2.setWiringProbability(0.01);
randomGraph2.generate(container2.getLoader());
importController.process(container2, new AppendProcessor(), workspace);     //Use AppendProcessor to append to current workspace

// Unknown error prevents Dynamic Graph from working in Gephi 0.9.1
//Create new workspace
//Workspace workspace2 = pc.newWorkspace(pc.getCurrentProject());
//pc.openWorkspace(workspace2);       //Set as current workspace
 
//Generate dynamic graph into workspace 2
//Container container3 = Lookup.getDefault().lookup(Container.Factory.class).newContainer();
 
//DynamicGraph dynamicGraph = new DynamicGraph();
//dynamicGraph.generate(container3.getLoader());
//importController.process(container3, new DefaultProcessor(), workspace2);
```