---
id: how-to-export-graph
title: How to export graph
---

This [Toolkit Example](/Toolkit/how-to-build-the-toolkit) is part of the toolkit-demos project, that can be downloaded from the [website](http://gephi.org/toolkit).

***

This demo focuses on Import and Export features, showing different IO possibilities. See [ExportAPI](http://gephi.org/docs/api/org/gephi/io/exporter/api/package-summary.html) documentation and [list of implemented Exporters](http://gephi.org/docs/toolkit/org/gephi/io/exporter/spi/Exporter.html).

Import can be performed from a file, database or Reader/InputStream. The export can be done to files and Writer/OutputStream. The demo import a file and shows how to configure graph export to use the visible graph instead of the full graph. That is essential to export a graph that has been filtered.

The ability to export graph or PDF to Writer or Byte array is showed at the end.

```java
//Init a project - and therefore a workspace
ProjectController pc = Lookup.getDefault().lookup(ProjectController.class);
pc.newProject();
Workspace workspace = pc.getCurrentWorkspace();
 
//Get controllers and models
ImportController importController = Lookup.getDefault().lookup(ImportController.class);
 
//Import file
Container container;
try {
    File file = new File(getClass().getResource("/org/gephi/toolkit/demos/resources/lesmiserables.gml").toURI());
    container = importController.importFile(file);
    container.getLoader().setEdgeDefault(EdgeDefault.DIRECTED);   //Force DIRECTED
    container.setAllowAutoNode(false);  //Don't create missing nodes
} catch (Exception ex) {
    ex.printStackTrace();
    return;
}
 
//Append imported data to GraphAPI
importController.process(container, new DefaultProcessor(), workspace);
 
//Export full graph
ExportController ec = Lookup.getDefault().lookup(ExportController.class);
try {
    ec.exportFile(new File("io_gexf.gexf"));
} catch (IOException ex) {
    ex.printStackTrace();
    return;
}
 
//Export only visible graph
GraphExporter exporter = (GraphExporter) ec.getExporter("gexf");     //Get GEXF exporter
exporter.setExportVisible(true);  //Only exports the visible (filtered) graph
exporter.setWorkspace(workspace);
try {
    ec.exportFile(new File("io_gexf.gexf"), exporter);
} catch (IOException ex) {
    ex.printStackTrace();
    return;
}
 
//Export to Writer
Exporter exporterGraphML = ec.getExporter("graphml");     //Get GraphML exporter
exporterGraphML.setWorkspace(workspace);
StringWriter stringWriter = new StringWriter();
ec.exportWriter(stringWriter, (CharacterExporter) exporterGraphML);
//System.out.println(stringWriter.toString());   //Uncomment this line
 
//PDF Exporter config and export to Byte array
PDFExporter pdfExporter = (PDFExporter) ec.getExporter("pdf");
pdfExporter.setPageSize(PageSize.A0);
pdfExporter.setWorkspace(workspace);
ByteArrayOutputStream baos = new ByteArrayOutputStream();
ec.exportStream(baos, pdfExporter);
byte[] pdf = baos.toByteArray();
```