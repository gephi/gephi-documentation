---
id: extend-data-laboratory
title: Extend Data Laboratory
---

## Introduction

Data Laboratory section of Gephi provides a good amount of basic and common features to manipulate the graph. But data laboratory can be extended with new features as plugins easily through Data Laboratory API/SPI. All Gephi's default data laboratory features are in **Data Laboratory Plugin**. **Simple and complex examples can be found in this module**.

For this tutorial, the **SPI** packages (`org.gephi.datalab.spi`) are the most interesting, while `org.gephi.datalab.api` only contains several controllers that expose general features to be used by plugins or other parts of gephi.

Data Laboratory SPI may seem big, but all interfaces to implement are mostly the same with small changes necessary to define different types of features. **Once you know how to create some kind of feature, it is simple to create others**.

**From now on, we will call data laboratory features 'manipulators' since they manipulate graph data/elements.**

### Where each type of manipulator appears in Gephi desktop application

![800px-data-lab-overview](https://cloud.githubusercontent.com/assets/197285/5622447/0cc75486-9544-11e4-83c9-f2c25c9eaec3.png)

![merge-strategies](https://cloud.githubusercontent.com/assets/197285/5622445/0cc19c30-9544-11e4-95a1-6041c38c0878.png)

### The Manipulator interface

The [Manipulator](http://gephi.org/docs/api/org/gephi/datalab/spi/Manipulator.html) interface is the part that most of the interfaces that you will implement share in common. Also, all kinds of manipulators can provide an optional GUI just by returning an implementation of the [ManipulatorUI](https://gephi.org/docs/api/org/gephi/datalab/spi/ManipulatorUI.html) interface.

The interfaces that extend Manipulator to provide specific types of manipulators are:

- [NodesManipulator](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/nodes/NodesManipulator.html) - Defines a context menu action to manipulate one or more selected nodes.
- [EdgesManipulator](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/edges/EdgesManipulator.html) - Defines a context menu action to manipulate one or more selected edges.
- [GeneralActionsManipulator](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/general/GeneralActionsManipulator.html) - Defines a general action not related to any specific graph element. [PluginGeneralActionsManipulator](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/general/PluginGeneralActionsManipulator.html) is the same but appears in a plugin button that displays a list of general actions (use this when the tool bar does not have enough space for more general actions).
- [AttributeValueManipulator](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/values/AttributeValueManipulator.html) - Defines a context menu action that manipulates a single cell data (pair of AttributeRow and AttributeColumn).
- [AttributeColumnsMergeStrategy](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/columns/merge/AttributeColumnsMergeStrategy.html) - Defines an strategy
- [AttributeRowsMergeStrategy](https://gephi.org/docs/api/org/gephi/datalab/spi/rows/merge/AttributeRowsMergeStrategy.html) - A very special type of manipulator that defines strategies for merging rows to be used by a nodes/edges manipulator or other parts (does not have a place in Data Laboratory GUI by itself but it is currently used by MergeNodes manipulator).

Only [AttributeColumnsManipulator](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/columns/AttributeColumnsManipulator.html) is a bit different from `Manipulator` because its workflow is not the same as all the previous manipulators, and therefore provides its unique interface plus a [AttributeColumnsManipulatorUI](http://gephi.org/docs/toolkit/org/gephi/datalab/spi/columns/AttributeColumnsManipulatorUI.html).

## Create a new Manipulator

Once we understand the interfaces that define our manipulators, we can create some sample features.

### Setting up our data

Here is where manipulators that need some **initial data** (like nodes, edges or columns) get it. This method **varies for each type of manipulator** but is always called before any other method.

Code example for a nodes manipulator:

```java
public void setup(Node[] nodes, Node clickedNode) {
    this.nodes=nodes;//Keep the needed data for future operations.
}
```

In this case, setup receives an array of nodes (selected nodes at right click) and the specific clicked node.

### Name and description

Simply define a name an a description (optional) of what our manipulator does.

```java
public String getName() {
    return NbBundle.getMessage(Group.class, "Group.name");//Localized name for nodes grouping action
}
 
public String getDescription() {
    return null;//No description
}
```

### Determining if our manipulator should be eligible to execute

In determinate conditions we would not like our manipulator to be executed, so we declare it with a boolean. **The moment this is called, setup has already been called**.

```java
public boolean canExecute() {
    return nodes.length == 1;//This manipulator will only be executed with a single node selection
}
```

### Provide an UI

Here we can return our GUI if desired. We will talk about ManipulatorUIs later.

```java
public ManipulatorUI getUI(){
    return new MyUI();//It is not necessary to pass this class to the UI now because ManipulatorUI will be set up later.
    //return null if no GUI
}
```

### Ordering and classifying manipulators

In order to declare the position in a group of manipulators that our manipulator has to appear, we have to provide a number identifying the category(type) and position.

Order of appearance is determined first by the type number and then by position number. Often consecutive elements are given numbers with considerable separation to be able to insert new categories between them.

```java
public int getType() {
    return 300;//Will appear in the same category as other manipulators that also return 300
}
 
public int getPosition() {
    return 0;//Will appear in its category before manipulators with a position of 1 or more
}
```

**These are the only methods that could be called before setup and therefore should not depend on context data**.

### Optional icon

Just return an icon for the feature or null.

```java
public Icon getIcon() {
    return ImageUtilities.loadImageIcon("org/gephi/datalab/plugin/manipulators/resources/group.png", true);
}
```

### Executing the final action

**This is where our feature does the work** once it has been chosen and preferences (if any) have been chosen with or without a GUI.

```
public void execute() {
    for(Node node:nodes){
        //Do something with the nodes
    }
}
```

### Complete code for Group nodes manipulator

```java
public class Group extends BasicNodesManipulator {
    private Node[] nodes;
 
    public void setup(Node[] nodes, Node clickedNode) {
        this.nodes=nodes;
    }
 
    public void execute() {
        GraphElementsController gec = Lookup.getDefault().lookup(GraphElementsController.class);
        gec.groupNodes(nodes);
    }
 
    public String getName() {
        return NbBundle.getMessage(Group.class, "Group.name");
    }
 
    public String getDescription() {
        return "";
    }
 
    public boolean canExecute() {
        GraphElementsController gec = Lookup.getDefault().lookup(GraphElementsController.class);
        return gec.canGroupNodes(nodes);
    }
 
    public ManipulatorUI getUI() {
        return null;
    }
 
    public int getType() {
        return 300;
    }
 
    public int getPosition() {
        return 0;
    }
 
    public Icon getIcon() {
        return ImageUtilities.loadImageIcon("org/gephi/datalab/plugin/manipulators/resources/group.png", true);
    }
}
```

## Nodes and edges manipulators

Both of these types of manipulators are shown as context menu actions in a popup menu, and benefit from some special settings defined in the `ContextMenuItemManipulator` interface. Their principal extra feature is the possibility to have subitems, as can be observed in the next image.

![sub-items](https://cloud.githubusercontent.com/assets/197285/5622444/0c847346-9544-11e4-8687-0b02a461bab2.png)

It defines 3 methods:

```java
public ContextMenuItemManipulator[] getSubItems() {
        return null;//Return subitems 
}
```

Note that:

- Most nodes/edges manipulators won't need to have subitems.
- Subitems can also return more subitems.
- Subitems will be set up with the proper data like their parents.
- If a item/subitem returns subitems, it will never be executed, their subitems will.
- `execute` method of the specific clicked subitem will be called.

```java
public boolean isAvailable() {
    return true;//Indicates if a subitem has to appear in the menu at all (enabled or not)
}    
 
public Integer getMnemonicKey() {
    return null;//Shorcut associated key for this item
}
```

Most manipulators won't need this, so a simple class like the following can be extended by all your manipulators to avoid repeating code:

```java
public abstract class BasicNodesManipulator implements NodesManipulator{
 
    public boolean isAvailable() {
        return true;
    }
 
    public ContextMenuItemManipulator[] getSubItems() {
        return null;
    }
 
    public Integer getMnemonicKey() {
        return null;
    }
}
```

*Visualization API has an SPI for adding context menu actions (GraphContextMenuItem) to nodes like DataLaboratory does with NodesManipulator. Note that they share the interface ContextMenuItemManipulator from Data Laboratory API, so they are compatible, being possible to reuse actions on nodes for Overview and Data Laboratory.*

## AttributeColumnsManipulators

What makes different these manipulators is that, instead oh having data set up and then `canExecute` being called, eligibility is tested for every column and is later executed for the selected column (showing first the UI if necessary).

Here is a complete example of a real feature (columns duplication):

```java
public class DuplicateColumn implements AttributeColumnsManipulator {
    private String title;
    private AttributeType columnType;
 
    public void execute(AttributeTable table, AttributeColumn column) {
        Lookup.getDefault().lookup(AttributeColumnsController.class).duplicateColumn(table, column, title, columnType);
    }
 
    public String getName() {
        return NbBundle.getMessage(DuplicateColumn.class, "DuplicateColumn.name");
    }
 
    public String getDescription() {
        return "";
    }
 
    public boolean canManipulateColumn(AttributeTable table, AttributeColumn column) {
        return true;
    }
 
    public AttributeColumnsManipulatorUI getUI(AttributeTable table,AttributeColumn column) {
        return new DuplicateColumnUI();
    }
 
    public int getType() {
        return 0;
    }
 
    public int getPosition() {
        return 400;
    }
 
    public Image getIcon() {
        return ImageUtilities.loadImage("org/gephi/datalab/plugin/manipulators/resources/table-duplicate-column.png");
    }
 
    public String getTitle() {
        return title;
    }
 
    public void setTitle(String title) {
        this.title = title;
    }
 
    public AttributeType getColumnType() {
        return columnType;
    }
 
    public void setColumnType(AttributeType columnType) {
        this.columnType = columnType;
    }
}
```

Column type and title are set through `DuplicateColumnUI`.

## Builders (how to get our plugins to appear in data laboratory perspective)

Like in other parts of Gephi, api/spi implementations are exposed with Netbeans Lookup API.

This is done with the [[@ServiceProvider]] annotation. Since this annotation returns a singleton of the service, in order to help the programmer avoid problems with previously set up data, some of the manipulators require a builder that returns instances of the manipulator as the service.

But other manipulators are directly exposed as the service with the annotation.

For example, to declare a `GeneralActionsManipulator`, it is sufficient with:

```java
@ServiceProvider(service = GeneralActionsManipulator.class)
public class AddEdgeToGraph implements GeneralActionsManipulator {
...
```

But for a `NodesManipulator` you need to create a builder and give it the annotation (not to the manipulator):

```java
@ServiceProvider(service=NodesManipulatorBuilder.class)
public class SetNodesSizeBuilder implements NodesManipulatorBuilder {
    public NodesManipulator getNodesManipulator() {
        return new SetNodesSize();
    }
}
```

Manipulator type | Needs a builder
-----------------| ----------------
AttributeColumnsManipulator | 
GeneralActionsManipulator | 	
AttributeColumnsMergeStrategy | ✓
EdgesManipulator | ✓
NodesManipulator | ✓
AttributeRowsMergeStrategy | ✓
AttributeValueManipulator | ✓

## Providing a GUI

When your feature needs a GUI you only need to return a [ManipulatorUI](http://gephi.org/docs/api/org/gephi/datalab/spi/ManipulatorUI.html) implementation capable of configuring your feature extra data. Let's see what each method should do with an example:

```java
public class MyManipulatorUI extends JPanel implements ManipulatorUI {
    private MyManipulator manipulator;
    private DialogControls dialogControls;
 
    void setup(Manipulator m, DialogControls dialogControls){
        //Receive our manipulator instance:
        manipulator = (MyManipulator) m; //We know the type of manipulator we are going to receive so cast is safe
        //And an object to control the dialog if necessary 
        //(for now it only is able to enable/disable the Ok button of the dialog for validation purposes)
        this.dialogControls = dialogControls;
    }
 
    void unSetup(){
        //Called when the dialog is closed, canceled or accepted. Pass necessary data to the manipulator:
        manipulator.setSomeOption(someValue);
        ...
    }
 
    String getDisplayName(){
        //Provide title for the dialog:
        return manipulator.getName();//For example, the manipulator name
    }
 
    public JPanel getSettingsPanel(){
        //Provide the JPanel to create the UI dialog
        //A good practice is to extend JPanel and just return this object
        return this;
    }
 
    /**
     * Indicates if the created dialog has to be modal
     */
    public boolean isModal(){
        return true;
    }
}
```

## Manipulators Summary

![manipulators](https://cloud.githubusercontent.com/assets/197285/5622446/0cc4e6a6-9544-11e4-8678-662dea3eaec7.png)