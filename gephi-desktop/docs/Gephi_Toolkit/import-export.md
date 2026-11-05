---
title: Import and export
sidebar_position: 5
---

Importers translate external data into a `Container`, while generators create container data programmatically. Processors then copy that container into a workspace. Exporters translate a workspace to a file, writer, or stream.

## Import a file

```java
ImportController importController = Lookup.getDefault()
        .lookup(ImportController.class);

Container container = importController.importFile(new File("network.gexf"));
Workspace workspace = importController.process(container);
```

The importer is normally selected from the file extension. Supported formats include GEXF, GML, GraphML, GDF, CSV, Pajek NET, UCINET DL, GraphViz DOT, Tulip TPL, and VNA. See the [file format documentation](../User_Manual/Import/index.md) for format-specific rules.

## Configure the staged import

Change loader options before calling `process`:

```java
import org.gephi.io.importer.api.EdgeDirectionDefault;

container.getLoader().setEdgeDefault(EdgeDirectionDefault.DIRECTED);
container.getLoader().setAllowAutoNode(false);
```

- `setEdgeDefault` supplies a direction when the source format does not specify one, or deliberately overrides it.
- `setAllowAutoNode(false)` prevents edges that reference unknown node IDs from silently creating those nodes.

The container's report records warnings and errors produced during parsing. Inspect it when accepting files from users, even when import succeeds.

:::warning Treat imports as untrusted input

Catch import exceptions at your application boundary and return a useful message that includes the input name. Gephi 0.11.2 defines specific import exceptions for known failures such as empty files; do not reduce every failure to a generic “graph could not be loaded” message.

:::

## Generate data into a container

Generators use the same container-and-processor pipeline as file and database importers. In a Toolkit application, create a container, let the generator populate its loader, and then process it:

```java
import org.gephi.io.generator.plugin.RandomGraph;
import org.gephi.io.importer.api.Container;

Container container = Lookup.getDefault()
        .lookup(Container.Factory.class)
        .newContainer();

RandomGraph generator = new RandomGraph();
generator.setNumberOfNodes(500);
generator.setWiringProbability(0.005);
generator.generate(container.getLoader());

Workspace workspace = importController.process(container);
```

The bundled generator package contains three graph-producing classes:

- [`RandomGraph`](https://github.com/gephi/gephi/blob/master/modules/GeneratorPlugin/src/main/java/org/gephi/io/generator/plugin/RandomGraph.java) creates a configurable random graph;
- [`MultiGraph`](https://github.com/gephi/gephi/blob/master/modules/GeneratorPlugin/src/main/java/org/gephi/io/generator/plugin/MultiGraph.java) provides sample data with edge types and parallel edges;
- [`DynamicGraph`](https://github.com/gephi/gephi/blob/master/modules/GeneratorPlugin/src/main/java/org/gephi/io/generator/plugin/DynamicGraph.java) provides timestamped sample data with dynamic attributes and is discussed in [Dynamic graphs and workspaces](./dynamic-graphs-and-workspaces.md#generate-dynamic-sample-data).

These implementations are convenient for demonstrations and test fixtures. They also show how a custom `Generator` can create `NodeDraft`, `EdgeDraft`, and column data through `ContainerLoader`. `RandomGraphUI` is a Desktop UI integration point and is not needed for headless Toolkit use.

## Append to an existing workspace

The convenient `process(container)` method creates a new workspace in the current project, or creates a project first if none exists. To add data to an existing workspace instead, select a processor and destination explicitly:

```java
import org.gephi.io.processor.plugin.AppendProcessor;

importController.process(container, new AppendProcessor(), workspace);
```

IDs control whether elements are new or match existing data. Verify node and edge counts after appending, particularly when several sources may reuse IDs.

For several temporal snapshots, `MergeProcessor` can process an array of containers. The [`ImportDynamic.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/ImportDynamic.java) demo shows that workflow.

## Export from the current workspace

The simplest export selects the exporter from the output extension:

```java
ExportController exportController = Lookup.getDefault()
        .lookup(ExportController.class);
exportController.exportFile(new File("result.gexf"));
```

For applications with multiple workspaces, configure the exporter explicitly:

```java
import org.gephi.io.exporter.spi.GraphExporter;

GraphExporter exporter = (GraphExporter) exportController.getExporter("graphml");
exporter.setWorkspace(workspace);
exportController.exportFile(new File("result.graphml"), exporter);
```

## Export only a filtered graph

Graph exporters use the full graph by default. To export the visible view created by a filter:

```java
GraphExporter exporter = (GraphExporter) exportController.getExporter("gexf");
exporter.setExportVisible(true);
exporter.setWorkspace(workspace);
exportController.exportFile(new File("filtered.gexf"), exporter);
```

Setting a filter's `GraphView` as visible and setting `setExportVisible(true)` are both required.

## Export to memory

Character formats can be written to a `Writer`:

```java
import java.io.StringWriter;
import org.gephi.io.exporter.spi.CharacterExporter;
import org.gephi.io.exporter.spi.Exporter;

Exporter graphml = exportController.getExporter("graphml");
graphml.setWorkspace(workspace);

StringWriter writer = new StringWriter();
exportController.exportWriter(writer, (CharacterExporter) graphml);
String serializedGraph = writer.toString();
```

Binary exporters, including PDF, can write to an `OutputStream`. This is useful in a web service where the result is sent in an HTTP response rather than saved locally.

See [`ImportExport.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/ImportExport.java) for file, writer, and byte-array examples, and [`SQLiteImportExport.java`](https://github.com/gephi/gephi-toolkit-demos/blob/59c95188616066397b1f5d3ec8aff75e1ae05667/src/main/java/org/gephi/toolkit/demos/SQLiteImportExport.java) for database import.
