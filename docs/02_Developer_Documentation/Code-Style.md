---
id: code-style
title: Code Style
tags:
  - Code Style
  - Development
---
The source code uses the [CheckStyle](https://checkstyle.sourceforge.io/) tool to keep the code style consistent.

In addition, we check for code style when building the project using the [Maven CheckStyle Plugin](http://maven.apache.org/plugins/maven-checkstyle-plugin/). A pull request without proper code style would fail to build.

### IntelliJ Setup

On IntelliJ follow these steps to configure CheckStyle:

1. Install the [CheckStyle plugin](https://plugins.jetbrains.com/plugin/1065-checkstyle-idea)
2. Open `Preferences/Settings` and go to `Editor > Code Style`.
3. Select `Project` as `Scheme` and click the settings icon next to it.
4. Select `Import Scheme > CheckStyle Configuration` and locate the `checkstyle.xml` file at the root of Gephi's repository.

You're done. You can now use the built-in **Code > Reformat Code** tool. The resulting code style will match what is on the Gephi repository.