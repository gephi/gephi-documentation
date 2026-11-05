---
id: Getting_Started
title: Getting started
sidebar_position: 2
---

This page takes you from an empty machine to a plugin running inside **Gephi 0.11.2**. The standard development environment is the [`gephi-plugins`](https://github.com/gephi/gephi-plugins/tree/master) repository: it provides the parent Maven configuration, downloads a matching Gephi distribution, builds NBM packages, and validates plugin metadata.

## Prerequisites

Install:

- JDK 17 or later; verify with `java -version` and `javac -version`.
- Maven; verify with `mvn -version`. Maven must report the JDK you intend to use.
- Git.
- NetBeans or IntelliJ IDEA if you want an IDE. The command-line workflow remains the reference.

Use a full JDK, not only a Java runtime. If several JDKs are installed, make sure Maven is not silently using an older one.

## Create the development workspace

Fork `gephi/gephi-plugins` on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR-NAME/gephi-plugins.git
cd gephi-plugins
```

The repository's `master` branch is the development template. Treat the version used to **compile** the module separately from the version of Gephi used to **run and test** it.

The root POM's `gephi.version` selects the Gephi distribution downloaded by the development build and launched by the `run` goal. It is also the distribution against which the repository's plugin tooling performs its compatibility work. To exercise the plugin in Gephi 0.11.2, use:

```xml
<properties>
    <gephi.version>0.11.2</gephi.version>
</properties>
```

Each generated module also has an explicit parent, for example:

```xml
<parent>
    <groupId>org.gephi</groupId>
    <artifactId>gephi-plugin-parent</artifactId>
    <version>0.11.1</version>
</parent>
```

That parent supplies the Gephi API dependency versions used at compilation. Changing only the root `gephi.version` does **not** change this module parent. Such a setup can deliberately compile against the 0.11.1 API baseline while launching and testing the result on Gephi 0.11.2. This demonstrates runtime compatibility with 0.11.2; it does not mean that the module was compiled against 0.11.2.

Update the module parent only when a matching parent is published and you intentionally want that newer compilation baseline. Keep every module on the same parent version. Do not add versions to individual Gephi dependencies: the module parent manages them as a coherent set.

Record these three facts independently in release notes and test records:

| Question | Controlled or established by |
| --- | --- |
| Which Gephi API baseline compiled the module? | The module's `gephi-plugin-parent` version |
| Which Gephi distribution does the development tooling validate and launch? | The root `gephi.version` property |
| Which Gephi releases are known to work? | Installation and functional tests on those releases |

Generate a module from the repository root:

```bash
mvn org.gephi:gephi-maven-plugin:generate
```

Use a Java-style organization identifier such as `org.example`, a lowercase artifact such as `sample-plugin`, and a readable branding name such as `Sample Plugin`. The generator adds the module to the reactor and creates its metadata.

## Understand the generated files

The useful module structure is:

```text
modules/SamplePlugin/
├── pom.xml
└── src/main/
    ├── java/                 Java sources
    ├── resources/            Bundle.properties, icons, other resources
    └── nbm/manifest.mf       NetBeans module metadata
```

The root `pom.xml` lists all modules. The module POM contains plugin identity, license, author information, public packages, and dependencies. `manifest.mf` contains the display category and descriptions, or points to a localizing bundle.

Use `Bundle.properties` for user-facing strings when practical. It avoids manifest line-length restrictions and makes later translation possible. Keep source code, identifiers, comments, metadata, and the default bundle in English.

## Add dependencies deliberately

Declare only the APIs your code imports. A module that reads the graph and registers a service might need:

```xml
<dependencies>
    <dependency>
        <groupId>org.gephi</groupId>
        <artifactId>graph-api</artifactId>
    </dependency>
    <dependency>
        <groupId>org.gephi</groupId>
        <artifactId>project-api</artifactId>
    </dependency>
    <dependency>
        <groupId>org.netbeans.api</groupId>
        <artifactId>org-openide-util-lookup</artifactId>
    </dependency>
</dependencies>
```

The artifact names used by each tutorial are listed on that page. If Java reports that a package is not visible, add the module that owns that public package; do not solve it by copying Gephi JARs into the plugin.

## Register an extension

Gephi discovers implementations through Lookup. Most SPI implementations use `@ServiceProvider`:

```java
import org.openide.util.lookup.ServiceProvider;

@ServiceProvider(service = SomeGephiSPI.class)
public final class MyExtension implements SomeGephiSPI {
    // Implement every method required by Gephi 0.11.2.
}
```

The value of `service` must be the exact SPI Gephi looks up, not merely an interface your class happens to implement. Builders should return a fresh stateful implementation when the SPI uses the builder pattern.

## Build and run

From the repository root:

```bash
mvn clean package
mvn org.gephi:gephi-maven-plugin:run
```

`package` compiles tests, produces JAR and NBM artifacts, and runs plugin metadata checks. Run the Maven goal from the **root project**, not only from the module, so the temporary Gephi installation receives the rebuilt plugin.

In the launched application, open **Tools > Plugins > Installed** and confirm that the module appears. Then exercise its actual entry point—Layout, Statistics, File, Data Laboratory, Preview, toolbar, or Window.

### IDE workflow

NetBeans recognizes the root as a Maven project and can run or debug it. In IntelliJ IDEA, import the root POM and create a Maven run configuration for `org.gephi:gephi-maven-plugin:run`.

For remote debugging, use the run parameters documented in the development repository. Always rebuild the root reactor after a code change if the launched Gephi still seems to contain old classes.

## A disciplined development loop

1. Put calculations and parsing in plain Java classes with no Swing dependencies.
2. Unit-test those classes with small, deterministic fixtures.
3. Add the Gephi SPI adapter and test registration by launching Gephi.
4. Test with an empty project, a project with multiple workspaces, a filtered graph, and a graph large enough to expose UI freezes.
5. Test cancellation and error reporting, not only the successful path.
6. Run `mvn clean package` before every release.

## Common first-run problems

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| The extension does not appear | Missing/wrong `@ServiceProvider`, wrong SPI, or stale build | Check the annotation and run the root `package` goal again |
| `UnsupportedClassVersionError` | Maven and Gephi use incompatible JDKs | Compare `mvn -version` with `java -version` |
| Package is not visible | Missing module dependency | Add the API module owning that package to the module POM |
| Changes are ignored | Only the child module was run | Rebuild and run from the repository root |
| The UI freezes | Work is executing on Swing's event dispatch thread | Follow [Graph access and long tasks](./Graph_API_and_Threads.md) |
| A plugin works in one workspace only | A cached `GraphModel` survived a workspace switch | Resolve context per operation or listen for workspace changes |

## Prepare a release

Before submitting or publishing:

- Increment the module version.
- Record the compilation baseline, set the development distribution to Gephi 0.11.2, and test the NBM against a clean 0.11.2 installation.
- Complete the English display name, short and long descriptions, category, author, license, and homepage.
- Include license notices for bundled third-party libraries and check that their licenses permit redistribution.
- Avoid implementation-module dependencies unless unavoidable.
- Run all tests and `mvn clean package`.
- Install the generated NBM manually once and verify enable, disable, uninstall, and restart behavior.

For the official marketplace workflow, push the plugin to your fork and open a pull request against the `master-forge` branch of [`gephi/gephi-plugins`](https://github.com/gephi/gephi-plugins). Enable maintainer edits when possible. Updates use the same process and must carry a higher module version.
