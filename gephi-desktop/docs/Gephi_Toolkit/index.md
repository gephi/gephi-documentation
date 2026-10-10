---
id: index
title: Gephi Toolkit
sidebar_position: 1
slug: /Gephi_Toolkit
---

The Gephi Toolkit is a Java library for working with graphs without running the Gephi Desktop user interface. It uses the same core modules as Gephi Desktop, including import, graph manipulation, filters, statistics, layouts, appearance, preview, and export.

Use the Toolkit when you want to:

- automate a repeatable graph-processing workflow;
- add network analysis to a Java application;
- run layouts or statistics on a server;
- generate GEXF, GraphML, SVG, PDF, or other outputs programmatically.

This guide targets developers who know basic Java but are new to Gephi's architecture and the NetBeans Platform idioms used by its API. It documents **Gephi Toolkit 0.11.2**, which requires **Java 17 or later**.

:::info Toolkit and Desktop

The Toolkit is not a remote control for an open Gephi Desktop window. It runs Gephi's processing modules inside your own JVM. There is no Overview or Data Laboratory window, and no graphical interface to configure algorithms: your Java code supplies every input and option.

:::

## Start here

1. Follow [Getting started](./getting-started.md) to create and run a minimal Maven project.
2. Read [Core concepts](./core-concepts.md) before combining several Toolkit features.
3. Continue with the task-oriented pages in this section.

The [official Toolkit demos](https://github.com/gephi/gephi-toolkit-demos) contain complete programs for Gephi 0.11.2. This guide explains the architecture and the non-obvious API choices behind those programs.

## What is included

Most features that do not depend on the Desktop interface are available:

- graph creation and manipulation;
- file and database import;
- graph, data, and preview export;
- filters and graph views;
- statistics and metrics;
- layouts;
- appearance transformations;
- preview rendering;
- dynamic graphs and multiple workspaces;
- [concurrency and request isolation in server applications](./concurrency-and-server-applications.md).

Desktop **Tools** are not included because they are interactive mouse or interface actions. Some third-party plugins can be used if their core module does not depend on Desktop-only APIs.

## Reference material

- [Gephi Toolkit main page](https://gephi.org/toolkit/)
- [Gephi Toolkit Javadoc](https://javadoc.io/doc/org.gephi/gephi-toolkit/latest/index.html)
- [Gephi Toolkit releases](https://github.com/gephi/gephi-toolkit/releases)
- [Gephi Toolkit demos](https://github.com/gephi/gephi-toolkit-demos)
- [Gephi file formats](../User_Manual/Import/index.md)

If an example and the Javadoc appear to disagree, first verify that both target version 0.11.2. Older examples commonly create projects and workspaces in a way that is no longer appropriate for 0.11.2.
