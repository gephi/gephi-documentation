---
id: Import
title: Import
sidebar_position: 7
---

An importer parses an external source into a neutral `ContainerLoader`. Gephi validates that container, shows an import report, and only then processes it into a workspace. Importers should not write directly to the current `GraphModel`.

This tutorial builds a text importer for `.pairs` files containing one `source,target` edge per line. Add `io-importer-api`, `utils-longtask`, `org-openide-filesystems`, and `org-openide-util-lookup`.

## Import through an installed importer

Use `ImportController` when your plugin needs to import a format Gephi already supports:

```java
ImportController imports = Lookup.getDefault().lookup(ImportController.class);
Container container = imports.importFile(file);
if (container == null) {
    throw new IllegalArgumentException("No installed importer accepted the file");
}

Processor processor = chooseProcessor(
    Lookup.getDefault().lookupAll(Processor.class));

Workspace result = imports.process(container, processor, workspace);
```

Ensure that the intended project and workspace exist before processing. Importing creates a neutral container; processing is the distinct step that commits it to a workspace. Select the processor through an explicit policy—ordinary imports normally use Gephi's installed standard processor—rather than relying on collection order or a localized display name. Run file parsing and processing off the EDT, connect cancellation when the selected implementation supports `LongTask`, and present the import report when warnings matter. Implement an importer below only for a format that installed importers do not handle.

## Register the file format

```java
@ServiceProvider(service = FileImporterBuilder.class)
public final class PairsImporterBuilder implements FileImporterBuilder {
    @Override public String getName() { return "Pairs edge list"; }

    @Override
    public FileType[] getFileTypes() {
        return new FileType[] {
            new FileType(".pairs", "Pairs edge-list files")
        };
    }

    @Override
    public boolean isMatchingImporter(FileObject fileObject) {
        return "pairs".equalsIgnoreCase(fileObject.getExt());
    }

    @Override
    public FileImporter buildImporter() {
        return new PairsImporter();
    }
}
```

The builder is a singleton service; the importer it returns carries one operation's state and must be new each time. Match both the advertised extension and the actual file criteria. For ambiguous formats, inspect a small prefix safely rather than claiming every text file.

## Parse into drafts

Gephi supplies the `Reader`, container, and progress ticket:

```java
public final class PairsImporter implements FileImporter, LongTask {
    private Reader reader;
    private Report report;
    private ProgressTicket progressTicket;
    private volatile boolean cancelled;

    @Override public void setReader(Reader reader) { this.reader = reader; }
    @Override public Report getReport() { return report; }

    @Override
    public boolean execute(ContainerLoader container) {
        report = new Report();
        Progress.start(progressTicket);

        try (BufferedReader lines = new BufferedReader(reader)) {
            String line;
            int lineNumber = 0;
            while (!cancelled && (line = lines.readLine()) != null) {
                lineNumber++;
                if (line.isBlank() || line.startsWith("#")) {
                    continue;
                }

                String[] fields = line.split(",", -1);
                if (fields.length != 2
                        || fields[0].isBlank() || fields[1].isBlank()) {
                    report.logIssue(new Issue(
                        "Line " + lineNumber + ": expected source,target",
                        Issue.Level.WARNING));
                    continue;
                }

                NodeDraft source = node(container, fields[0].trim());
                NodeDraft target = node(container, fields[1].trim());
                EdgeDraft edge = container.factory().newEdgeDraft();
                edge.setSource(source);
                edge.setTarget(target);
                container.addEdge(edge);
            }
            return !cancelled;
        } catch (IOException ex) {
            report.logIssue(new Issue(
                "Could not read the file: " + ex.getMessage(),
                Issue.Level.SEVERE));
            return false;
        } finally {
            Progress.finish(progressTicket);
        }
    }

    private NodeDraft node(ContainerLoader container, String id) {
        NodeDraft node = container.getNode(id);
        if (node == null) {
            node = container.factory().newNodeDraft(id);
            node.setLabel(id);
            container.addNode(node);
        }
        return node;
    }

    @Override public boolean cancel() { cancelled = true; return true; }
    @Override public void setProgressTicket(ProgressTicket ticket) {
        progressTicket = ticket;
    }
}
```

This example warns and skips malformed records. For a format invariant that makes the whole file unusable, log a severe or critical issue and return `false`. Never use one vague “invalid file” message when a line number, field, and expected value can guide the user.

### Text, XML, and binary input

- Wrap text readers in `BufferedReader` or use `ImportUtils.getTextReader(reader)` when line numbers are useful.
- Prefer a streaming XML parser for large XML documents; `ImportUtils.getXMLReader(reader)` provides StAX support.
- Avoid DOM for unbounded files because it materializes the whole document.
- Implement the appropriate byte/file-aware SPI for genuinely binary formats rather than converting arbitrary bytes through a character reader.

Treat all imported content as untrusted: bound sizes where the format allows it, validate numeric ranges, avoid entity expansion in XML, and never execute paths or commands found in data.

## When a custom processor is appropriate

The importer creates and validates drafts; a `Processor` decides how one or more `ContainerUnloader`s become workspace data. The standard processor already handles ordinary “append to current/new workspace” behavior. Write a custom processor only for a distinct merge or workspace-creation policy. It must implement `setContainers`, optional `setWorkspace`, `process`, progress, display name, and report; a matching `ProcessorUI` exposes it in the import workflow. Keep format parsing in the importer so the same container can still be processed in different ways.

## Add settings UI only when needed

Register `ImporterUI` as a separate service. In Gephi 0.11.2, `setup` receives an **array** because one dialog can configure several importers:

```java
@ServiceProvider(service = ImporterUI.class)
public final class PairsImporterUI implements ImporterUI {
    private PairsImporter[] importers;
    private JCheckBox directed;

    @Override
    public void setup(Importer[] values) {
        importers = Arrays.stream(values)
            .map(PairsImporter.class::cast)
            .toArray(PairsImporter[]::new);
    }

    @Override
    public JPanel getPanel() {
        directed = new JCheckBox("Create directed edges", true);
        JPanel panel = new JPanel();
        panel.add(directed);
        return panel;
    }

    @Override
    public void unsetup(boolean update) {
        if (update) {
            for (PairsImporter importer : importers) {
                importer.setDirected(directed.isSelected());
            }
        }
        importers = null;
        directed = null;
    }

    @Override public String getDisplayName() { return "Pairs options"; }
    @Override public boolean isUIForImporter(Importer value) {
        return value instanceof PairsImporter;
    }
}
```

The example parser must then apply `directed` to each edge using the direction method defined by `EdgeDraft`. Copy settings back only when `update` is true. Validate them again in the importer.

## Importer checklist

- Duplicate node IDs, missing endpoints, parallel edges, self-loops, encoding, and direction have explicit policies.
- Attribute columns are declared with correct types before values are assigned.
- Warnings identify the record; fatal problems return `false`.
- Parsing is streaming and cancellation is checked frequently.
- The supplied reader is not replaced with a hard-coded file path.
- Tests cover empty, malformed, Unicode, large, and cancelled input.

See the [Gephi 0.11.2 ImportPlugin](https://github.com/gephi/gephi/tree/v0.11.2/modules/ImportPlugin) for production parsers and the bootcamp's matrix importer for the overall builder/importer/UI shape only.
