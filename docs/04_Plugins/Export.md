---
id: export
title: Export
---

This HowTo shows, in about 15 minutes how to create a new exporter in Gephi. Exporters export data from Gephi to various targets, like files or streams.

Please look at [[Plugin Quick Start]] to know how to create a new Netbeans Module. When you have your plugin module, that we will call *MyExporter*, you can start this tutorial.

One can find file exporter examples in the `ExportPlugin` and `PreviewExport` modules.

## Create a new Exporter

### Set Dependencies

Add `ExportAPI`, `ProjectAPI`, and `Lookup` modules as dependencies for your plugin module *MyExport*. See [[How To Set Module Dependencies]].

### Create Exporter Builder

`ExporterBuilder` is a factory class for building the important instance, all Exporters should have their own builder.
Create a new builder *MyExporterBuilder* class, which implements one of the following interface:

* [`GraphFileExporterBuilder`](http://gephi.org/docs/api/org/gephi/io/exporter/spi/GraphFileExporterBuilder.html) - For graph export (like GEXF, GraphML, CSV...)
* [`VectorFileExporterBuilder`](http://gephi.org/docs/api/org/gephi/io/exporter/spi/VectorFileExporterBuilder.html) - Vector graphics (like SVG, PDF, ...)
* [`ExportBuilder`](http://gephi.org/docs/api/org/gephi/io/exporter/spi/ExporterBuilder.html) - Anything else

Let's say we create a exporter for a custom graph format with *.foo* extension, so we choose `GraphFileExporterBuilder`.

Fill the `getFileTypes()` and `getName()` methods like below, for a single file format supported named *foo*.

```java
public String getName() {
   return "foo";
}
 
public FileType[] getFileTypes() {
   return new FileType[]{new FileType(".foo", "Foo files")};
}
```

Add `@ServiceProvider` annotation to your builder class to declare you are implementing an `Exporter` service. Add the following line before *MyExporterBuilder* class definition, as shown below:

```java
@ServiceProvider(service = GraphFileExporterBuilder.class)
public class MyExporterBuilder implements GraphFileExporterBuilder{
...
```

This annotation registers your implementation in the system, in order it can be discovered at runtime.

Put `GraphFileExporterBuilder.class` as the annotation service parameter for graph files, `VectorFileExporterBuilder.class` for vector graphics and `ExportBuilder.class` for the rest.

### Create Exporter

Create a new exporter class, which implements `GraphExporter`, `VectorExporter` or simply `Exporter`, depending what you set for the builder.

The exporter is where the job is done, in its `execute()` method. The main input object the export needs is the Workspace. In Gephi, data are stored within workspaces. It is the place the exporter will find what to export. Before being executed by the export controller, the exporter will receive the workspace and other parameters through setters methods.

Implement also [`ByteExporter`](http://gephi.org/docs/api/org/gephi/io/exporter/spi/ByteExporter.html) interface for byte streams or [`CharacterExporter`](http://gephi.org/docs/api/org/gephi/io/exporter/spi/CharacterExporter.html) for texts. These are the two ways you can output data in a exporter, either text (`java.io.Writer`) or byte (`java.io.OutputStream`). Note that XML is text-based. So exporters are not specifically exporting to a file or a stream, they export to a Writer or an `OutputStream`. The controller later decides what to do with it.

Add also `LongTask` interface to your class, in order you will be able to use progress and cancel management. Add `LongTaskAPI` as a dependency to profit from LongTask.
Your exporter should now look like below:

```java
public class MyExporter implements GraphExporter, CharacterExporter {
 
    private boolean exportVisible = false;
    private Workspace workspace;
    private Writer writer;
 
    @Override
    public boolean execute() {
        //Do the job
    }
 
    @Override
    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }
 
    @Override
    public Workspace getWorkspace() {
        return workspace;
    }
 
    @Override
    public void setWriter(Writer writer) {
        this.writer = writer;
    }
 
     @Override
    public void setExportVisible(boolean exportVisible) {
        this.exportVisible = exportVisible;
    }
 
    @Override
    public boolean isExportVisible() {
        return exportVisible;
    }
}
```

The `GraphExporter` interface has an additional parameter: `exportVisible`. It indicates if either the complete or only the visible graph should be exported. At any time the system keeps the complete graph in memory. When users use filtering, the visible graph is different, as some nodes/edges have been removed. Below is the way to retrieve the good graph with this parameter.

```java
public boolean execute() {
   GraphModel graphModel = workspace.getLookup().lookup(GraphModel.class);
   Graph graph = null;
   if (exportVisible) {
      graph = graphModel.getGraphVisible();
   } else {
      graph = graphModel.getGraph();
   }
   //Do the job
}
```

### Finish the builder

In the builder, return a new instance of your exporter in the `buildExporter()` method.

```java
@Override
public GraphExporter buildExporter() {
   return new MyExporter();
}
```

## With settings UI

You can create an `ExporterUI` class for your exporter. It is not mandatory and the exporter will work normally with default settings.

### Create MyExporterUI

Create a new exporter UI class, for instance *MyExporterUI* that implements `ExporterUI`.

Your UI class is responsible of providing the JPanel associated to your exporter and set settings value to your *MyExporter* instance. The system will ask for a JPanel, show a setting dialog and then call `unsetup()`. If users validate the settings panel by hitting OK, the `unsetup()` method is called with update set as true and ask the UI to write the setting values.
The sample below will help you:

```java
public class MyExporterUI implements ExporterUI {
 
   private JPanel panel;
   private MyExporter exporter;
 
   public void setup(Exporter exporter) {
     this.exporter= (MyExporter)exporter;
   }
 
   public JPanel getPanel() {
     panel = new JPanel();
     return panel;
   }
 
   public void unsetup(boolean update) {
     if(update) {
        //The user clicked OK when closing settings
     } else {
        //Cancel was hit
     }
     panel = null;
     exporter = null;
   }
 
   public String getDisplayName() {
     return "Exporter Foo";
   }
 
   public boolean isUIForExporter(Exporter exporter) {
     return exporter instanceof MyExporter;
   }
}
```

### Register the UI

Add `@ServiceProvider` annotation to your UI class. Add the following line before *MyexporterUI* class definition, as shown below:

```java
@ServiceProvider(service = ExporterUI.class)
public class MyExporterUI implements ExporterUI{
...
```

Note that by doing this your class becomes a singleton.

### Remember settings

How to remember last settings set to the exporter, as each time a new export is made, a new instance of Exporter is created.

It is the `ExporterUI`'s role to remember settings. The only thing to do is load settings at `setup()` and save settings at unsetup. Look at existing classes in the `ExporterPluginUI` module to have an example.

![image](https://cloud.githubusercontent.com/assets/177962/5606752/2c16cdf0-943e-11e4-81d7-d6eee0930f29.png)
