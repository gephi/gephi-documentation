---
id: add-a-module-panel
title: Add a module panel
---

How to create a panel for plugin features, similar to Ranking, Graph or Layout? It is easy and fully integrated in Netbeans. Create your panel class and use Netbeans IDE to design the user interface. This page also explains how to work with the **Perspective** system.

![800px-add-module-panel](https://cloud.githubusercontent.com/assets/197285/5654096/550bf4b8-96c0-11e4-8d36-ad29c6502ce2.png)


- **Step 1**: Right click on your module and select **New > Other...** and find **Window** like showed in the step 1 below. The window wizard asks where to put your panel. You can use already defined modes (i.e. positions):
  * graphmode: Centered, full-size
  * rankingmode: Top Left position
  * layoutmode: Bottom Left position
  * timelinemode: Below others, at the bottom
  * filtersmode: Bottom Right
  * contextmode: Top Right

![add-module-panel1](https://cloud.githubusercontent.com/assets/197285/5654098/5513e1fa-96c0-11e4-9a39-7184440b235d.png)

- **Step 2**: Then check options about the panel policy showed in step2 and click on **Next**.

![add-module-panel2](https://cloud.githubusercontent.com/assets/197285/5654094/55098340-96c0-11e4-9b1c-0847e2c2e1c0.png)

- **Step 3**: Fill the **Class Name**, the system shows which files are created. Your panel is a **TopComponent** subclass.

![add-module-panel3](https://cloud.githubusercontent.com/assets/197285/5654095/550bbc96-96c0-11e4-8ec7-8bff84992453.png)

- **Step 4**: Click on **Finish**, files are created and you're invited to design your panel with Netbeans editor.

![add-module-panel-design](https://cloud.githubusercontent.com/assets/197285/5654097/55119652-96c0-11e4-96b1-fbdedf704298.png)

Your panel is now created and automatically registered. Start Gephi with your plugin and your panel is visible. 

## Register in a Perspective

**Overview, Data Laboratory** and **Preview** are perspectives in Gephi. A perspective is simply a set of panels that works together. When users change the perspective, some panels are hidden and others are showed. When you define a new panel above, it is not part of a perspective and therefore is always visible, regardless which perspective you are. Follow the steps to associate your panel with a perspective.

1. Add **Desktop Perspective** as a new module dependency. Right-click on your module and Properties.
2. Go to your `TopComponent` sources and add `PerspectiveMember` as interface.
3. Add the `@ServiceProvider` annotation to be registered by the system and implement methods (note: you will need to add the 'Desktop Perspective' to the Module Dependencies [screenshots](http://activeintelligence.org/blog/archive/gephi-howto-add-a-module-panel-dependency/)).

```java
@ServiceProvider(service=PerspectiveMember.class)
public final class MyTopComponent extends TopComponent implements PerspectiveMember {
...
```java

Implement `open()` and `close()` methods like below to attach the component to the `LaboratoryPerspective`, works also for `OverviewPerspective` and `PreviewPerspective`:

```java
public boolean open(Perspective perspective) {
   return perspective instanceof LaboratoryPerspective;
}
public boolean close(Perspective perspective) {
   return true;
}
```

Specifically use `close()` method if you want your panel to be visible on several perspectives.

## Branding

### Change panel title

Open the **Bundle.properties** file in your module and update **CTL_MyTopComponent** key.

### Set Icon

In the **TopComponent** sources, uncomment the following line and set the icon path.

```java
setIcon(ImageUtilities.loadImage(ICON_PATH, true));
```

## Links

- [TopComponent in Netbeans Wiki](http://wiki.netbeans.org/DevFaqWindowsTopComponent)

- [How to create a new mode](http://blogs.sun.com/geertjan/entry/creating_a_new_mode_in)
