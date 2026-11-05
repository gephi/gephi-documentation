---
title: Troubleshooting
sidebar_position: 10
---

## `Lookup.lookup(...)` returns `null`

The implementation module is not available to NetBeans Lookup. Confirm that:

- the dependency is `org.gephi:gephi-toolkit:0.11.2`, not only an individual API JAR;
- Maven resolved the dependency successfully;
- packaging has not discarded `META-INF` service and NetBeans module metadata;
- a minimized or shaded JAR has not merged service files incorrectly.

Start with the normal Toolkit dependency and classpath before building a custom “fat JAR.”

## `NoClassDefFoundError` or `ClassNotFoundException`

The Toolkit's dependencies are missing at runtime. Running only your application JAR does not automatically add Maven dependencies to the classpath. During development, use `mvn exec:java` or run from an IDE with Maven support.

The standard `gephi-toolkit` artifact declares its dependencies. The release also provides an `-all` JAR when a single distributable Toolkit JAR is needed, but your own application dependencies still need appropriate packaging.

## Import succeeds but the graph is empty

Check the container report before processing and print counts immediately afterward:

```java
Workspace workspace = importController.process(container);
Graph graph = graphController.getGraphModel(workspace).getGraph();
System.out.printf("nodes=%d edges=%d%n",
        graph.getNodeCount(), graph.getEdgeCount());
```

Common causes are an empty input, wrong CSV role settings, edges referring to unknown IDs while auto-node creation is disabled, or reading a different file than expected.

## The wrong graph is exported

In multi-workspace programs, set the workspace on the exporter explicitly. If a filter is involved, also decide between the full and visible graph:

```java
GraphExporter exporter = (GraphExporter) exportController.getExporter("gexf");
exporter.setWorkspace(workspace);
exporter.setExportVisible(true);
```

Without `setExportVisible(true)`, graph exporters normally serialize the full graph.

## A layout does not stop

Force-directed layouts may keep improving for as long as they are allowed to run. Bound the loop with an iteration counter, use `AutoLayout` with a duration, and always call `endAlgo()` in a `finally` block.

## Maven appears to hang after the program finishes

Gephi, NetBeans modules, or a database driver can leave harmless daemon threads alive. With `exec-maven-plugin`, set:

```xml
<cleanupDaemonThreads>false</cleanupDaemonThreads>
```

This is a launcher concern, not a reason to call `System.exit` throughout library code.

## Preview export is blank

Verify that you configured the `PreviewModel` belonging to the same workspace as the exporter, that the visible view is not empty, and that nodes have coordinates. Refresh preview after graph, layout, or appearance changes.

## Code from an old tutorial no longer compiles or imports dynamic data

Match documentation, demos, Javadoc, and dependency versions. For 0.11.2, use the [0.11.2 Javadoc](https://javadoc.io/doc/org.gephi/gephi-toolkit/0.11.2/index.html) and the [0.11.2 demo update](https://github.com/gephi/gephi-toolkit-demos/pull/18). In particular, replace the old `newProject()`-before-import pattern with `importController.process(container)`.

## Get help

Before asking for help, reduce the problem to a small program and include:

- Java, Maven, and Toolkit versions;
- the complete exception and its cause chain;
- input format and a minimal sample when possible;
- whether the application is headless, multi-threaded, or uses multiple workspaces.

Use [Gephi Discussions](https://github.com/gephi/gephi/discussions) for usage questions, [Toolkit issues](https://github.com/gephi/gephi-toolkit/issues) for Toolkit packaging problems, and [documentation issues](https://github.com/gephi/gephi-documentation/issues) for this guide.

## End of the Gephi Toolkit guide

You have reached the end of the Gephi Toolkit documentation. You should now be able to create a Java project, import or build a graph, analyze and lay it out, then export the result without using Gephi Desktop.

For complete working programs, continue with the [Gephi Toolkit demos](https://github.com/gephi/gephi-toolkit-demos). Use the [0.11.2 Javadoc](https://javadoc.io/doc/org.gephi/gephi-toolkit/0.11.2/index.html) when you need the full contract of a class or method.

:::info The next section is about Gephi plugins

The **Next** link below leaves the Toolkit guide and opens the [Gephi plugin development documentation](../Plugins/index.md). Plugins extend the Gephi Desktop application and follow a different development model. You do not need a plugin to build a standalone application with the Toolkit.

:::
