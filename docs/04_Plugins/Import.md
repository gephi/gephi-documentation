---
id: import
title: Import
---

This HowTo shows, in about 15 minutes how to create a new importer in Gephi. Importers push data from files, databases or external datasources to a `Container`. The role of the container is to host all data collected by importers (i.e. nodes, edges and attributes). This HowTo is focused on file importers, but the procedure is slightly similar for databases or spigots.

Please look at [[Plugin Quick Start]] to know how to create a new Netbeans Module. When you have your plugin module, that we will call *MyImporter*, you can start this tutorial.

One can find file importer examples in the Gephi [source code](https://github.com/gephi/gephi/tree/master/modules/ImportPlugin/src/main).

## Create a new Importer

### Set Dependencies

Add `ImportAPI`, `LongTaskAPI`, `FileSystemAPI`, `UtilitiesAPI` and Lookup modules as dependencies for your plugin module *MyImport*. See [[How To Set Module Dependencies]].

### Create FileImporterBuilder

* `ImporterBuilder` is a factory class for building the important instance, all Importers should have their own builder.
* Create a new builder class, for instance *MyImporterBuilder* that implements `FileImporterBuilder`.
* Fill the `getFileTypes()` and `getName()` methods like below, for a single file format supported named *foo*.

```java
public String getName() {
   return "foo";
}
 
public FileType[] getFileTypes() {
   return new FileType[]{new FileType(".foo", "Foo files")};
}
```

Add `@ServiceProvider` annotation to your builder class. Add the following line before *MyImporterBuilder* class definition, as shown below:

```java
@ServiceProvider(service = FileImporterBuilder.class)
public class MyImporterBuilder implements FileImporterBuilder {
...
```

### Create FileImporter

The importer is where the job will be done. Create a new importer class, for instance *MyImporter* that implements `FileImporter`.

Notice the `setReader()` method. That means you will work with a reader instead directly with files. The system is responsible of setting the reader before the importer you're developing will be executed.

Add also `LongTask` interface to your class, in order you will be able to use progress and cancel management.
Your *MyImporter* would look like this:

```java
public class MyImporter implements FileImporter, LongTask {
 
   private Reader reader;
   private ContainerLoader container;
   private Report report;
   private ProgressTicket progressTicket;
   private boolean cancel = false;
 
   public void setReader(Reader reader) {
      this.reader = reader;
   }
 
   public boolean execute(ContainerLoader loader) {
      this.container = loader;
      this.report = new Report();
      //Import
      return !cancel;
   }
 
   public ContainerLoader getContainer() {
      return container;
   }
 
   public Report getReport() {
      return report;
   }
 
   public boolean cancel() {
      cancel = true;
      return true;
   }
 
   public void setProgressTicket(ProgressTicket progressTicket) {
      this.progressTicket = progressTicket;
   }
}
```

The infrastructure is set, the container for pushing data, the report for pushing logs and errors, and the progress management.

### Finish the builder

Go back to the *MyImporterBuilder* and complete `buildImporter()` and `isMatchingImporter()` methods:

```java
public FileImporter buildImporter() {
   return new MyImporter();
}
 
public boolean isMatchingImporter(FileObject fileObject) {
   return fileObject.getExt().equalsIgnoreCase("foo");
}
```

## With settings UI

You can create an `ImporterUI` class for your importer. It is not mandatory and the importer will work normally with default settings.

### Create MyImporterUI

Create a new `ImporterUI` class, for instance *MyImporterUI* that implements [`ImporterUI`](http://gephi.org/docs/api/org/gephi/io/importer/spi/ImporterUI.html).

Your UI class is responsible of providing the JPanel associated to your importer and set settings value to your *MyImporter* instance. The system will ask for a JPanel, show a setting dialog and then call `unsetup()`. If users validate the settings panel by hitting OK, the `unsetup()` method is called with update set as true and ask the UI to write the setting values.
The sample below will help you:

```java
public class MyImporterUI implements ImporterUI {
 
   private JPanel panel;
   private JCheckBox option;
   private MyImporter importer;
 
   public void setup(Importer importer) {
     this.importer = (MyImporter)importer;
   }
 
   public JPanel getPanel() {
     panel = new JPanel();
     option = new JCheckBox("Option");
     panel.add(option);
     return panel;
   }
 
   public void unsetup(boolean update) {
     if(update) {
        importer.setOption(option.isSelected());
     }
     panel = null;
     importer = null;
     option = null;
   }
 
   public String getDisplayName() {
     return "Importer Foo";
   }
 
   public boolean isUIForImporter(Importer importer) {
     return importer instanceof MyImporter;
   }
}
```

In the example below, notice the `importer.setOption(option.isSelected())` line. The `setOption()` method doesn't exist in *MyImporter* but it shows how to configure it easily.

### Register the UI

Add `@ServiceProvider` annotation to your UI class. Add the following line before *MyImporterUI* class definition, as shown below:

```java
@ServiceProvider(service = ImporterUI.class)
public class MyImporterUIimplements ImporterUI{
...
```

## Advices

### How to write a text file importer

The best way for text files is to use a `LineNumberReader`.
One can get it from the `ImportUtils` class:

``LineNumberReader lineReader = ImportUtils.getTextReader(reader);``

### How to write an XML file importer

XML files can be read with different methods (DOM, SAX, StAX) in Java.
[StAX](http://www.wikiwand.com/en/StAX) is combining simplicity and efficiency and should be favored to read XML files:

``XMLStreamReader xmLReader = ImportUtils.getXMLReader(reader);``

Thought it is not recommended to use DOM as it's too much memory consuming, here is how to get a Document from the reader:

``Document document = ImportUtils.getXMLDocument(reader);``

### How to handle errors and exceptions

Warnings and errors are generated by importers to let users get feedback about the import process. Data is rarely clean and perfectly formated, thus it's necessary to give a specific error message for each problem. The report present in your importer class is here for that.

Similar as classical logging framework, that is how to log a information message:

``report.logIssue(new Issue("The attribute label has been found", Issue.Level.INFO));``

There are four levels: **INFO**, **WARNING**, **SEVERE**, **CRITICAL**. Note that the critical level will stop the import process and throw an exception, so it is reserved if the file cannot be read or the XML is not valid for instance.
About exceptions, it is recommended that you throw `RuntimeException` from your execute method. They will be properly catched and displayed to users in a message box.

![image](https://cloud.githubusercontent.com/assets/177962/5606728/a8cd1f40-943c-11e4-87cf-9dc27f21bce2.png)
