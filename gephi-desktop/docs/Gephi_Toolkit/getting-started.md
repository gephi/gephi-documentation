---
title: Getting started
sidebar_position: 2
---

This page creates a small command-line application that imports a graph, inspects it, and exports it again.

## Requirements

- JDK 17 or later;
- Apache Maven 3.6.3 or later;
- a GEXF, GML, GraphML, CSV, or another [supported graph file](../User_Manual/Import/index.md).

Check the tools used by your terminal:

```bash
java -version
mvn -version
```

Both commands should report Java 17 or later.

## Create the Maven project

Use this minimal directory structure:

```text
toolkit-example/
|-- .mvn/
|   `-- jvm.config
|-- input.gexf
|-- pom.xml
`-- src/
    `-- main/
        `-- java/
            `-- example/
                `-- Main.java
```

The Toolkit requires access to `java.net` through Java's module system. Create
`.mvn/jvm.config` with this JVM option:

```text
--add-opens=java.base/java.net=ALL-UNNAMED
```

Maven reads this file automatically, so the option applies whenever the example
is run from the project directory.

Add the Toolkit and a convenient execution plugin to `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>example</groupId>
  <artifactId>toolkit-example</artifactId>
  <version>1.0-SNAPSHOT</version>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.release>17</maven.compiler.release>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.gephi</groupId>
      <artifactId>gephi-toolkit</artifactId>
      <version>0.11.2</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>exec-maven-plugin</artifactId>
        <version>3.5.0</version>
        <configuration>
          <mainClass>example.Main</mainClass>
          <cleanupDaemonThreads>false</cleanupDaemonThreads>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

The `cleanupDaemonThreads` setting lets Maven terminate harmless background threads started by Gephi and NetBeans services when the program finishes.

Download the supplied [Les Misérables `input.gexf`](./input.gexf) and save it as
`input.gexf` at the root of the Maven project, next to `pom.xml`.

## Write the first pipeline

Create `src/main/java/example/Main.java`:

```java
package example;

import java.io.File;
import org.gephi.graph.api.Graph;
import org.gephi.graph.api.GraphController;
import org.gephi.graph.api.GraphModel;
import org.gephi.io.exporter.api.ExportController;
import org.gephi.io.importer.api.Container;
import org.gephi.io.importer.api.ImportController;
import org.gephi.project.api.Workspace;
import org.openide.util.Lookup;

public class Main {

    public static void main(String[] args) {
        int exitCode = run(args);
        if (exitCode != 0) {
            System.exit(exitCode);
        }
    }

    private static int run(String[] args) {
        if (args.length != 2) {
            System.err.println("Usage: Main <input.gexf> <output.graphml>");
            return 1;
        }

        File input = new File(args[0]);
        File output = new File(args[1]);

        if (!input.isFile() || !input.canRead()) {
            System.err.printf("Cannot read input file: %s%n", input);
            return 1;
        }

        try {
            ImportController importController = Lookup.getDefault()
                    .lookup(ImportController.class);

            Container container = importController.importFile(input);
            if (container == null) {
                System.err.printf(
                        "Could not import %s: unsupported or invalid file%n",
                        input);
                return 1;
            }
            Workspace workspace = importController.process(container);

            GraphModel graphModel = Lookup.getDefault()
                    .lookup(GraphController.class)
                    .getGraphModel(workspace);
            Graph graph = graphModel.getGraph();

            System.out.printf("Imported %d nodes and %d edges%n",
                    graph.getNodeCount(), graph.getEdgeCount());

            ExportController exportController = Lookup.getDefault()
                    .lookup(ExportController.class);
            exportController.exportFile(output);
            return 0;
        } catch (Exception exception) {
            String detail = exception.getMessage();
            if (detail == null || detail.isBlank()) {
                detail = exception.getClass().getSimpleName();
            }
            System.err.printf("Could not process %s: %s%n", input, detail);
            return 1;
        }
    }
}
```

Run it from the project directory:

```bash
mvn compile exec:java -Dexec.args="input.gexf output.graphml"
```

The output format is selected from the file extension. Replace the paths with files on your machine.

## Understand the five steps

1. `Lookup` supplies Gephi services called **controllers**.
2. `importFile` parses the input into an intermediate `Container`.
3. `process(container)` creates a correctly configured `Workspace`, then copies the imported data into it. It uses the current project or creates one if necessary.
4. `GraphController` supplies the `GraphModel` owned by that workspace.
5. `ExportController` selects an exporter from the output extension.

The distinction between a controller, a workspace, and a model matters as soon as an application processes more than one graph. [Core concepts](./core-concepts.md) explains it in detail.

:::tip Use paths during development

The official demos load sample files with `getResource(...)` because those files are bundled in their JAR. For user-selected or server-side files, passing a `File` or stream directly is usually simpler.

:::

## Explore the demos

Clone the [Toolkit demos](https://github.com/gephi/gephi-toolkit-demos) and run:

```bash
git clone https://github.com/gephi/gephi-toolkit-demos.git
cd gephi-toolkit-demos
mvn compile exec:java
```

`Main.java` runs the command-line demos in sequence. `PreviewJFrame.java` is a separate graphical Swing example and is not part of that sequence.
