---
id: spigot-importer-with-wizard
title: Spigot importer with Wizard
---

## Introduction

This HowTo shows in about 20 minutes how to create a new spigot in Gephi. Spigots are like file importers, but with a different datasource. Spigots are the best way to import data from various data sources like Web Services, APIs, custom Databases or anything Java can read from. Like Importers, spigots push data to a `Container`, which hosts all data collected (i.e. nodes, edges and attributes). Moreover, spigots user interface supports **Wizards**, which makes it easy to have rich settings and a consistent flow.

![spigot_menu](https://cloud.githubusercontent.com/assets/197285/5655355/6619c07a-96cd-11e4-9a36-f12aa7737433.png)

*Import Spigot Menu*

Please look at [[Plugin Quick Start]] to know how to create a new Netbeans Module. When you have your plugin module, that we will call `MySpigot`, you can start this tutorial.

One can find spigot importer examples in the [Gephi source code](https://github.com/gephi/gephi/tree/master/modules/SpigotPlugin/).

## Create a new Importer

### Set Dependencies

Add [[Import API]], [[LongTask API]], [[Utilities API]], [[Dialogs API]] and [[Lookup]] modules as dependencies for your plugin module MySpigot. See [[How To Set Module Dependencies]].

### Create SpigotImporterBuilder

Importer Builder is a factory class for building the important instance, all Importers should have their own builder.

Create a new builder class, for instance `MySpigotBuilder` that implements [SpigotImporterBuilder](https://gephi.org/docs/api/org/gephi/io/importer/spi/SpigotImporterBuilder.html).

Leave the `buildImporter()` method empty for the moment and fill the `getName()` methods like below.

```java
public String getName() {
   return "My Spigot";
}
 
public SpigotImporter buildImporter() {
   return null;
}
```

Add `@ServiceProvider` annotation to your builder class. Add the following line before `MySpigotBuilder` class definition, as shown below:

```java
@ServiceProvider(service = SpigotImporterBuilder.class)
public class MySpigotBuilder implements SpigotImporterBuilder {
...
```
### Create SpigotImporter

The importer is where the job will be done. Create a new spigot importer class, for instance `MySpigot` that implements [SpigotImporter](http://gephi.org/docs/api/org/gephi/io/importer/spi/SpigotImporter.html).

For more details, have a look at [ContainerLoader](http://gephi.org/docs/api/org/gephi/io/importer/api/ContainerLoader.html) and [Report](http://gephi.org/docs/api/org/gephi/io/importer/api/Report.html) documentation.

Add also `LongTask` interface to your class, in order you will be able to use progress and cancel management.

Your `MyImporter` would look like this:

```java
public class MySpigot implements SpigotImporter, LongTask {
 
    private ContainerLoader container;
    private Report report;
    private ProgressTicket progressTicket;
    private boolean cancel = false;
 
    public boolean execute(ContainerLoader loader) {
        this.container = loader;
        this.report = new Report();
        //Import done here
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

Look at [File Importers examples](https://github.com/gephi/gephi/tree/master/modules/ImportPlugin) or [Spigots examples](https://github.com/gephi/gephi/tree/master/modules/SpigotPlugin/) code to learn how to push data to the container.

### Finish the builder

Go back to the `MySpigotBuilder` and complete `buildImporter()` method:

```java
public SpigotImporter buildImporter() {
   return new MySpigot();
}
```

## Wizard UI

You will create a `ImporterWizardUI` class for your importer and learn how to create a wizard to configure your MySpigot.

A wizard is a set of panels, which follow each other with conditions. Consult the [Wizard API Javadoc](http://bits.netbeans.org/dev/javadoc/org-openide-dialogs/index.html?org/openide/WizardDescriptor.html). One can also find a more general tutorial on Netbeans Wizards [here](http://platform.netbeans.org/tutorials/nbm-wizard.html). The ImporterWizardUI class will provide the panels and the title of the spigot importer, as well as its description. But first, create a wizard panel.

![spigot_howto1](https://cloud.githubusercontent.com/assets/197285/5655356/661d7828-96cd-11e4-9aba-f154068bf36c.png)

*My Spigot*

### Create Wizard Panel

Create a new Java Panel class named `MySpigotWizardPanel1`. Go to File > New File > Swing GUI Forms > JPanel Form.

Design your interface, by adding check boxes, text field etc. and go to the Source view.

![spigot_howto_design](https://cloud.githubusercontent.com/assets/197285/5655357/661ea37e-96cd-11e4-8c48-0ed3f7ec9490.png)

Create an `unsetup()` method like below. This method will be called when the user leaves the wizard to actually configure your Spigot with the settings made in the UI.

```java
public void unsetup(MySpigot importer) {
   //Configure the importer
 
   //Example
   //importer.setOption(optionCheckbox.isSelected());
}
```

We will now edit this panel to implement the [WizardDescriptor.Panel](http://bits.netbeans.org/dev/javadoc/org-openide-dialogs/index.html?org/openide/WizardDescriptor.Panel.html) interface.

See below how to implement this class

```java
public class MySpigotWizardPanel1 extends javax.swing.JPanel implements WizardDescriptor.Panel {
 
    private List<ChangeListener> listeners; //these allow you to tell Gephi when UI changes are made
 
 
    //Generated JPanel code goes here....
 
 
    public Component getComponent() {
        return this;
    }
 
    @Override
    public String getName() {
        return "Select Datasource";   //this will be the title of the panel in the wizard
    }
 
    @Override
    public HelpCtx getHelp() {
        return HelpCtx.DEFAULT_HELP;
    }
 
    /*
     * You can use a settings object to keep track of state. Normally the
     * settings object will be the WizardDescriptor, so you can use
     * WizardDescriptor.getProperty & putProperty to store information entered
     * by the user.
     */
    public void readSettings(Object settings) {
    }
 
    public void storeSettings(Object settings) {
    }
 
    public boolean isValid() {
        return true;             //if you implement the change listeners properly, this should contain actual logic
    }
 
    @Override
    public void addChangeListener(ChangeListener cl) {
        if (listeners == null) {
            listeners = new ArrayList();
        }
 
        listeners.add(cl);
    }
 
    @Override
    public void removeChangeListener(ChangeListener cl) {
        listeners.remove(cl);
    }
}
```

### Create ImporterWizardUI

Create a new spigot wizard UI class, for instance `MyImporterWizardUI` that implements [ImporterWizardUI](http://gephi.org/docs/api/org/gephi/io/importer/spi/ImporterWizardUI.html).

This class is a singleton service, and registers your wizard in the system. It has two important methods: `setup()` and `unsetup`. The `unsetup()` method is called when the wizard is closed and is responsible for configuring the actual Spigot importer. In other words, the UI push settings values to the importer not the contrary.

The sample below will help you:

```java
public class MySpigotWizardUI implements ImporterWizardUI {
 
    private Panel[] panels = null;
 
    @Override
    public String getDisplayName() {
        return "My Spigot Importer";
    }
 
    @Override
    public String getCategory() {
        return "My Spigot";
    }
 
    @Override
    public String getDescription() {
        return "My Spigot imports very cool data";
    }
 
    @Override
    public Panel[] getPanels() {
        if (panels == null) {
            panels = new Panel[1];
            panels[0] = new MySpigotWizardPanel1();
        }
        return panels;
    }
 
    @Override
    public void setup(Panel panel) {
        //Before opening the wizard
    }
 
    @Override
    public void unsetup(SpigotImporter importer, Panel panel) {
        //When the wizard has been closed
        ((MySpigotWizardPanel1) ((Panel) panels[0]).getComponent()).unsetup((MySpigot)importer);
 
        panels = null;
    }
 
    @Override
    public boolean isUIForImporter(Importer importer) {
        return importer instanceof MySpigot;
    }
}
```

Notice how the `unsetup()` method of `MySpigotWizardPanel1` is called.

Ideally, this UI class is also responsible for saving the settings, in order to have the same settings the second time the spigot is used. For doing that, use the `setup()` method to load parameters in the panels. 

## Register the UI

Add [[@ServiceProvider]] annotation to your UI class. Add the following line before `MySpigotWizardUI` class definition, as shown below:

```java
@ServiceProvider(service = ImporterWizardUI.class)
public class MySpigotWizardUI implements ImporterWizardUI{
...
```