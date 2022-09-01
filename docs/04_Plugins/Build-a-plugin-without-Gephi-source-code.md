---
id: build-a-plugin-without-gephi-source-code
title: Build a plugin without Gephi source code
---

It is possible to build a plugin using only binary installation of Gephi. The principle is to compile the plugin using the Gephi binary installation as a NetBeans platform. 

## Prerequisites

First, you need a Gephi binary installation, such as the one that can be downloaded at https://gephi.org

## Registering Gephi as a NetBeans Platform

Open the "Tools|NetBeans Platforms" dialog, click on "Add Platform...", and choose the directory containing the Gephi binary installation. Note that when the NetBeans IDE detects a NetBeans Platform in a directory, the "Platform Name" label is filled with the identifier of this platform.

By example, in the next picture, a Gephi installation was found in the `/opt/gephi-0.8-beta` directory.

![addnetbeansplatform](https://cloud.githubusercontent.com/assets/197285/5655242/ff7f1a8c-96cb-11e4-9e83-6d2b110d31f9.png)

Click on the `Next` button, and change the platform name if required. In that example, it was required to change the platform name to "Gephi 0.8 beta", since the Gephi 0.8 alpha and beta have the same identifier, namely "Gephi 0.8 alpha".

As you can see, two Gephi platforms have been registered.

![addnetbeansplatformdone](https://cloud.githubusercontent.com/assets/197285/5655241/ff7ec96a-96cb-11e4-9b15-113c6e7148d0.png)

## Build a Plugin

To build a plugin, it requires to:

1. Create a module suite, event if your suite contains only one plugin, and make this suite use the Gephi platform;
2. Create a plugin in the module suite.
3. Add as dependencies of your modules the NetBeans and Gephi modules containing the functionalities required.

### Creation of a Module Suite

1. Click on "New|New Project";
    1. In Categories, choose "NetBeans Modules, and "Module Suite" in projects, then click on the `Next` button;
    2. Configure the name, locations at your will.
    3. Choose the NetBeans Plaform you want to use. Here, you have to choose one of the Gephi platforms you have previously registered.

### Creation of a Module

1. Click on "New|New Project";
    1. In Categories, choose "NetBeans Modules, and "Module" in projects, then click on the `Next` button;
    2. Configure the name, locations at your will. Add the new module to the module suite created in the previous step.

![gephimoduleend](https://cloud.githubusercontent.com/assets/197285/5655243/ff849110-96cb-11e4-9311-323c9d31adbd.png)

*Display after the creation of the module suite and the module*

### Add the Gephi Dependencies

When some Gephi SPI/API are required by your module:

1. In the Projects window, right-click on the "Libraries" item in the module tree.;
2. Select the "Add Module Dependency";
3. In the Filter textfield, enter a part or the totality of the interface/class required by your module.
4. Select in the Module pane the module containing the interface/class required.

## TroubleShootings

### The Gephi SPI/API is not seen when editing and compiling

If the interfaces and classes are not seen by the editor and the compiler, please process the following steps:

1. Check the suite is using Gephi as its NetBeans platform by :
    1. Right-click on the suite project, click on the "Properties" item;
    2. In Categories, choose "Libraries". In the right pane, check whether the NetBeans Platform is using a Gephi installation, and change the platform if Gephi is not selected.
    3. In the Platform Modules tree, check the box for the gephi suite of modules, so that all the modules composing Gephi are used when compiling your module.

### Module Version not compatible

If an error message similar to "Cannot compile against a module: org-gephi-data-attributes-api.jar because of dependency: org.gephi.data.attributes.api > 0.8", it means the configuration of your module is requiring a Gephi module more recent than those provided by the Gephi platform used. A solution is to open the "Module Dependencies" dialog by doing:

1. Right click on the module, choose the "Properties" item;
2. In Categories, click on "Libraries";
3. In the "Module Dependencies" tab, select the module causing problem, and edit the requirements on its version number.
