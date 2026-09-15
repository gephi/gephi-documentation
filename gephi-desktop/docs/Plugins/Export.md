---
id: Export
title: Export
sidebar_position: 8
---

An exporter serializes workspace data to a `Writer` or `OutputStream`. It should not choose the destination path itself: Gephi owns the file dialog or stream and injects the output object.

This tutorial sketches a `.pairs` graph exporter. Add `io-exporter-api`, `graph-api`, `project-api`, `utils-longtask`, and `org-openide-util-lookup`.

## Export through an installed exporter

Use `ExportController` when your plugin needs a format already provided by Gephi or another installed module:

```java
ExportController exports = Lookup.getDefault().lookup(ExportController.class);
Exporter exporter = exports.getExporter("gexf");
if (exporter == null) {
    throw new IllegalStateException("The requested exporter is not installed");
}

if (exporter instanceof GraphExporter graphExporter) {
    graphExporter.setWorkspace(workspace);
    graphExporter.setExportVisible(true);
}

exports.exportFile(destinationFile, exporter);
```

Choose `exportVisible` deliberately: `true` exports the filtered view and `false` the complete graph. Connect cancellation if the exporter implements `LongTask`. For plugin-controlled destinations, export to a temporary file in the destination directory and move it into place only after success when partial files would be misleading. Implement an exporter below only when adding a new output format.

## Register a builder

Choose the narrowest builder and exporter interfaces:

- `GraphFileExporterBuilder` with `GraphExporter` for graph data.
- `VectorFileExporterBuilder` with `VectorExporter` for preview vector output.
- `ExporterBuilder`/`Exporter` for a non-file-specific target.
- `CharacterExporter` for text; `ByteExporter` for binary.

```java
@ServiceProvider(service = GraphFileExporterBuilder.class)
public final class PairsExporterBuilder implements GraphFileExporterBuilder {
    @Override public String getName() { return "pairs"; }
    @Override public FileType[] getFileTypes() {
        return new FileType[] {
            new FileType(".pairs", "Pairs edge-list files")
        };
    }
    @Override public GraphExporter buildExporter() {
        return new PairsExporter();
    }
}
```

## Implement text export

```java
public final class PairsExporter
        implements GraphExporter, CharacterExporter, LongTask {
    private Workspace workspace;
    private Writer writer;
    private boolean exportVisible;
    private volatile boolean cancelled;
    private ProgressTicket progressTicket;

    @Override public void setWorkspace(Workspace value) { workspace = value; }
    @Override public Workspace getWorkspace() { return workspace; }
    @Override public void setWriter(Writer value) { writer = value; }
    @Override public void setExportVisible(boolean value) { exportVisible = value; }
    @Override public boolean isExportVisible() { return exportVisible; }

    @Override
    public boolean execute() {
        GraphModel model = workspace.getLookup().lookup(GraphModel.class);
        Graph graph = exportVisible ? model.getGraphVisible() : model.getGraph();
        Progress.start(progressTicket, graph.getEdgeCount());

        graph.readLock();
        try {
            for (Edge edge : graph.getEdges()) {
                if (cancelled) {
                    return false;
                }
                writer.write(csv(edge.getSource().getId().toString()));
                writer.write(',');
                writer.write(csv(edge.getTarget().getId().toString()));
                writer.write(System.lineSeparator());
                Progress.progress(progressTicket);
            }
            writer.flush();
            return true;
        } catch (IOException ex) {
            throw new UncheckedIOException("Could not export pairs", ex);
        } finally {
            graph.readUnlock();
            Progress.finish(progressTicket);
        }
    }

    private String csv(String value) {
        return '"' + value.replace("\"", "\"\"") + '"';
    }

    @Override public boolean cancel() { cancelled = true; return true; }
    @Override public void setProgressTicket(ProgressTicket ticket) {
        progressTicket = ticket;
    }
}
```

The example quotes every field so commas, quotes, and line breaks in IDs cannot corrupt the format. A real exporter should define its encoding, line endings, direction, multigraph, dynamic data, and null-value policies in a format specification.

`exportVisible` is significant: `true` means the filtered/visible view, while `false` means the complete graph. Never ignore it. If the format cannot represent a feature, warn through the appropriate UI or documentation rather than silently changing semantics.

## Keep graph locks short

Holding a read lock while writing a slow disk or network stream can block graph changes for a long time. For moderate exports this provides a consistent snapshot. For very large or slow exports, copy the necessary primitive values in bounded batches under a lock and serialize after unlocking. Document whether concurrent edits can appear in the result.

## Add optional settings

Register an `ExporterUI` service when users need format choices:

```java
@ServiceProvider(service = ExporterUI.class)
public final class PairsExporterUI implements ExporterUI {
    private PairsExporter exporter;
    private JCheckBox includeHeader;

    @Override public void setup(Exporter value) {
        exporter = (PairsExporter) value;
    }
    @Override public JPanel getPanel() {
        includeHeader = new JCheckBox("Include header", exporter.isIncludeHeader());
        JPanel panel = new JPanel();
        panel.add(includeHeader);
        return panel;
    }
    @Override public void unsetup(boolean update) {
        if (update) {
            exporter.setIncludeHeader(includeHeader.isSelected());
        }
        exporter = null;
        includeHeader = null;
    }
    @Override public boolean isUIForExporter(Exporter value) {
        return value instanceof PairsExporter;
    }
    @Override public String getDisplayName() { return "Pairs options"; }
}
```

Each export creates a new exporter. If the UI should remember the user's last choice, store the preference in the UI/service layer and load it into the new exporter during `setup()`.

## Exporter checklist

- The correct complete or visible graph is selected.
- Output is escaped according to a documented format, not by ad hoc concatenation.
- Writer/stream ownership is respected; flush it, but let the caller manage its lifecycle unless the SPI contract says otherwise.
- Cancellation returns `false` and leaves no misleading “successful” result.
- Locks and progress are finished in `finally`.
- Tests include Unicode, delimiters inside values, nulls, self-loops, parallel edges, and cancellation.

Production examples live in Gephi 0.11.2's [ExportPlugin](https://github.com/gephi/gephi/tree/v0.11.2/modules/ExportPlugin) and [PreviewExport](https://github.com/gephi/gephi/tree/v0.11.2/modules/PreviewExport) modules.
