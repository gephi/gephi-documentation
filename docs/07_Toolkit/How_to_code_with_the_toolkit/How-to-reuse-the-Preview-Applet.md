---
id: how-to-reuse-the-preview-applet
title: How to reuse the Preview Applet
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo shows how to have the Gephi Preview applet in another application. It simply creates a JFrame where the Processing-based component is set up. The applet reacts to the mouse events (drag and mouse wheel) to zoom and pan.
The demo shows how to configure the preview model to customize the output.

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Import file
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
Container container;
try {
    File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/Java.gexf").toURI());
    container = importController.importFile(file);
} catch (Exception ex) {
    ex.printStackTrace();
    return;
}
 
//Append imported data to GraphAPI
importController.process(container, new DefaultProcessor(), workspace);
 
//Preview configuration
PreviewController previewController = Lookup.getDefault().lookup(PreviewController.class);
PreviewModel previewModel = previewController.getModel();
previewModel.getProperties().putValue(PreviewProperty.SHOW_NODE_LABELS, Boolean.TRUE);
previewModel.getProperties().putValue(PreviewProperty.NODE_LABEL_COLOR, new DependantOriginalColor(Color.WHITE));
previewModel.getProperties().putValue(PreviewProperty.EDGE_CURVED, Boolean.FALSE);
previewModel.getProperties().putValue(PreviewProperty.EDGE_OPACITY, 50);
previewModel.getProperties().putValue(PreviewProperty.EDGE_RADIUS, 10f);
previewModel.getProperties().putValue(PreviewProperty.BACKGROUND_COLOR, Color.BLACK);
previewController.refreshPreview();
 
//New Processing target, get the PApplet
ProcessingTarget target = (ProcessingTarget) previewController.getRenderTarget(RenderTarget.PROCESSING_TARGET);
PApplet applet = target.getApplet();
applet.init();
 
//Refresh the preview and reset the zoom
previewController.render(target);
target.refresh();
target.resetZoom();
 
//Add the applet to a JFrame and display
JFrame frame = new JFrame("Test Preview");
frame.setLayout(new BorderLayout());
 
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
frame.add(applet, BorderLayout.CENTER);
 
frame.pack();
frame.setVisible(true);
```