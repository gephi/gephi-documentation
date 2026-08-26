---
id: index
title: Plugin development
sidebar_position: 1
---

Gephi plugins are Java modules loaded by the Gephi Platform. A plugin can add an algorithm, a data source, a renderer, a desktop panel, a graph interaction tool, or a small command. This guide targets **Gephi 0.11.2** and **JDK 17 or later**.

:::info Version scope

The examples and API signatures on these pages were checked against the Gephi `v0.11.2` source tag. Older examples remain useful for ideas, but code written for Gephi 0.9.x or 0.10.x must not be copied without checking its imports, method signatures, dependencies, and threading assumptions.

:::

## Use an API or add an extension?

A plugin does not always need to contribute a new algorithm. Gephi exposes two complementary integration directions:

- **Consume an API** when the plugin needs to run an installed layout, statistic, filter, importer, exporter, or Data Laboratory operation. Obtain the public controller or installed builders from `Lookup` and operate on the current workspace.
- **Implement an SPI** when the plugin introduces a new layout, statistic, file format, filter, transformer, renderer, or user-visible command that Gephi and other plugins should discover.

Prefer consuming an existing public service when it already expresses the operation. Implementing a parallel extension duplicates behavior and may bypass capability checks, progress handling, import processing, or other semantics owned by Gephi. The specialized pages show both paths where both are useful.

## Choose the smallest extension point

Start from the user experience you want to add, then choose the corresponding service provider interface (SPI).

| Goal | Extension point | Start here |
| --- | --- | --- |
| Arrange nodes | `Layout` and `LayoutBuilder` | [Layout](./Layout.md) |
| Calculate a graph measure | `Statistics`, `StatisticsBuilder`, and optionally `StatisticsUI` | [Statistics](./Statistics.md) |
| Read a file format | `FileImporter` and `FileImporterBuilder` | [Import](./Import.md) |
| Write a file format | `GraphExporter` and `GraphFileExporterBuilder` | [Export](./Export.md) |
| Create a synthetic network | `Generator` | [Generator](./Generator.md) |
| Build a reusable graph predicate | `NodeFilter`, `EdgeFilter`, or `ComplexFilter` | [Filter](./Filter.md) |
| Add table actions and transformations | Data Laboratory manipulators | [Extend Data Laboratory](./Extend_Data_Laboratory.md) |
| Add a new way to map values to color, size, or labels | Appearance `Transformer` | [Appearance](./Appearance.md) |
| Change Preview or exported graphics | `Renderer` and, when needed, `ItemBuilder` | [Preview renderer](./Preview_renderer.md) |
| Add a toolbar interaction, menu action, or window | NetBeans Platform actions, `Tool`, or `TopComponent` | [Desktop UI and events](./Desktop_UI_and_Events.md) |
| Read or modify the current network | Graph and Project APIs | [Graph access and long tasks](./Graph_API_and_Threads.md) |

If one module needs several extension points, keep the data-processing code independent from Swing and put each registration in a small adapter class. This makes the core logic easier to test.

## How a plugin fits into Gephi

A typical interaction has four parts:

1. **Registration:** a class annotated with `@ServiceProvider` advertises an implementation of a Gephi SPI.
2. **Discovery:** Gephi finds that service through NetBeans Lookup; you do not create a global registry yourself.
3. **Context:** Gephi supplies a `Workspace`, `GraphModel`, import container, preview model, or another object appropriate to the extension point.
4. **Execution:** your implementation does bounded work, reports progress when appropriate, and leaves the UI responsive.

Most plugins therefore contain a small builder or UI adapter and a separate implementation class. Builders are usually singleton services; the objects they create are not. Never keep workspace-specific mutable state in a registered singleton unless it is deliberately keyed by workspace and cleaned up.

Two less common hooks complete the panorama. An import `Processor` controls how validated containers are merged into one or more workspaces; most format plugins should use Gephi's standard processor. Project persistence providers serialize custom workspace state into `.gephi` files and require a stable, versioned schema. Use either only when the plugin truly owns those lifecycle semantics.

## Recommended learning path

1. Follow [Getting started](./Getting_Started.md) and run an empty generated plugin in Gephi.
2. Read [Graph access and long tasks](./Graph_API_and_Threads.md) before writing code that touches a graph or Swing component.
3. Follow the page for your chosen extension point.
4. Add tests for the non-UI logic, then exercise the plugin in a clean Gephi user directory.
5. Build the NBM and follow the submission checklist in [Getting started](./Getting_Started.md#prepare-a-release).

## Authoritative references

- [Gephi plugins development repository](https://github.com/gephi/gephi-plugins/tree/master) — project generator, build, run, packaging, and submission workflow.
- [Gephi 0.11.2 source](https://github.com/gephi/gephi/tree/v0.11.2/modules) — authoritative API interfaces and built-in implementations.
- [Gephi Javadoc](https://javadoc.io/doc/org.gephi/gephi/0.11.2/index.html) — API reference pinned to the target version.
- [Gephi plugins bootcamp](https://github.com/gephi/gephi-plugins-bootcamp) — broad catalogue of extension ideas. It targets 0.9.3, so use it as a design gallery, not as copy-ready 0.11.2 code.

The public `org.gephi.*.api` and `org.gephi.*.spi` packages are the safest dependencies. Depending on implementation or UI classes from `*.impl` and `*.plugin` packages couples a plugin to internal details and should be exceptional and documented.
