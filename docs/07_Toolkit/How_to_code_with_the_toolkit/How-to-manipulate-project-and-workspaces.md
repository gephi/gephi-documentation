---
id: how-to-manipulate-project-and-workspaces
title: How to manipulate project and workspaces
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

Demo about manipulating several workspaces. The aim of this demo is to use two workspaces, layout networks in parallel and finally export the workspaces as PDF files. See [ProjectAPI](http://gephi.org/docs/api/org/gephi/project/api/package-summary.html) documentation also.

Workspaces are the container for all data and are manipulated from the `ProjectController`. The demo show key aspects:
* How to duplicate a workspace.
* How to set a workspace as the current workspace. This is very useful as many modules just do their job on this current workspace and doesn't allow to specify which workspace to work on from the API. Therefore it is often required to set current workspace, as showed in export here.

```java
public void script() {
    //Init a project - and therefore a workspace
    ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
    pc.newProject();
    final Workspace workspace1 = pc.getCurrentWorkspace();
 
    //Generate a new random graph into a container
    Container container = Lookup.getDefault().lookup(ContainerFactory.class).newContainer();
    RandomGraph randomGraph = new RandomGraph();
    randomGraph.setNumberOfNodes(500);
    randomGraph.setWiringProbability(0.005);
    randomGraph.generate(container.getLoader());
 
    //Append container to graph structure
    ImportController importController = Lookup.getDefault().lookup(ImportController.class);
    importController.process(container, new DefaultProcessor(), workspace1);
 
    //Duplicate this workspace
    final Workspace workspace2 = pc.duplicateWorkspace(workspace1);
 
    //Create Thread Pool for parallel layout
    ExecutorService executor = Executors.newFixedThreadPool(2);
 
    //Run Tasks and wait for termination in the current thread
    Future<?> f1 = executor.submit(createLayoutRunnable(workspace1));
    Future<?> f2 = executor.submit(createLayoutRunnable(workspace2));
    try {
        f1.get();
        f2.get();
    } catch (Exception ex) {
        Exceptions.printStackTrace(ex);
    }
    executor.shutdown();
 
    //Export
    ExportController ec = Lookup.getDefault().lookup(ExportController.class);
    try {
        pc.openWorkspace(workspace1);
        ec.exportFile(new File("parallel_worspace1.pdf"));
        pc.openWorkspace(workspace2);
        ec.exportFile(new File("parallel_worspace2.pdf"));
    } catch (IOException ex) {
        Exceptions.printStackTrace(ex);
        return;
    }
}
 
private Runnable createLayoutRunnable(final Workspace workspace) {
    return new Runnable() {
 
        public void run() {
        GraphModel gm = Lookup.getDefault().lookup(GraphController.class).getModel(workspace);
        AutoLayout autoLayout = new AutoLayout(10, TimeUnit.SECONDS);
        autoLayout.setGraphModel(gm);
        autoLayout.addLayout(new YifanHuLayout(null, new StepDisplacement(1f)), 1f);
        autoLayout.execute();
        }
    };
}
```