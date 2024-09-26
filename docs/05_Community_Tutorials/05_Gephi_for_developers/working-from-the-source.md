---
id: working-from-the-source
title: Working from the source
last_update:
  author: Clément Levallois
sidebar_position: 1
description: Working from the source
tags:
  - Plugin
  - Development
---
This tutorial explains how to get and modify Gephi's source code, and
build Gephi from it.

![The obligatory meme](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/use-the-source.jpg)

We will:

-   download the source code

-   run Gephi from the source

-   modify Gephi's openGL visualization engine

-   run Gephi in this modified version

The modified version of Gephi that we will implement will have for
effect to add circles around nodes communities.

This project originates from [Susie Lu's creation](https://twitter.com/DataToViz/status/828840269072080896).

We should get something like:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y3jk-_QaFx4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

For this tutorial you will need:

-   some knowledge of Java.

-   NetBeans installed ([up to date instructions here](https://dl.dropboxusercontent.com/u/28091845/coursera/codapps/session%201/module%201%20-%20installing%20NetBeans%20ans%20Codename%20One%20on%20a%20PC.pdf)).
    Eclipse, IntelliJ or any other code editor won't do.

-   a good internet connection since we will download a lot of small
    dependencies.

-   no Github account is necessary (if you have one, fork Gephi before
    doing all the steps below).

Downloading the source code {#_downloading_the_source_code}
===========================

1.  Open NetBeans.

2.  In NetBeans, go to `Team -> Git -> Clone`

(can't find this menu in NetBeans? read an alternative just below)

![Cloning the gephi source](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/git-clone-gephi-0-en.png)

NOTE

:   if you already have projects opened in NetBeans, the menu Team → Git
    → Clone is replaced by:

        Team -> Remote -> Clone

![Cloning the gephi source](https://docs.google.com/drawings/d/1sdB37hWIug2nzacQxsxqVOmzK_bVF7zpn_2rkgmEWSU/pub?w=1262&h=999)

-   For `Repository URL`, put the address of the Gephi repository on
    Github, which is:

<https://github.com/gephi/gephi.git>

-   for `Clone into`, select a folder on your disk. No need to create a
    new folder inside, the cloning process will do it.

-   Github User and password can be left empty

-   Then click on `Next`

![Select Master and click next](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/git-clone-gephi-2-en.png)

![Leave as it is and click on Finish](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/git-clone-gephi-3-en.png)

At this step, NetBeans starts downloading the source code of Gephi - not
all of it. Should take a couple of minutes, then:

![Click on Open Project](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/git-clone-gephi-4-en.png)

Select (highlight in blue) the line mentioning Gephi, and click on
\"Open\"

![Click on Open Project](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/git-clone-gephi-5-en.png)

You should now see Gephi as a project on the left in NetBeans:

![Gephi project](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/netbeans-gephi-source-1-en.png)

Right click on the project and select \"Build with dependencies\". This
will download all the rest of the source, which can take roughly 5 to 20
minutes.

![Building the project](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/netbeans-gephi-source-2-en.png)

Running Gephi from source {#_running_gephi_from_source}
=========================

When the build is complete, expand the folder \"Modules\" of the Gephi
project, and double click on \"gephi-app\":

![Opening the gephi-app submodule](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/netbeans-gephi-source-3-en.png)

This opens a new project on the left of NetBeans, called \"gephi-app\".
This is a submodule of Gephi, dedicated to managing its launch.

![Launching Gephi](https://docs.google.com/drawings/d/1VS_oa0Fp9d-hygBJESrshVGfd5H9eSx1C50eZNSIUu0/pub?w=986&h=840)

And Gephi launches!

Now that we know how to run Gephi from source, we can modify the source
and see how it goes.

Modifying Gephi's openGL visualization engine {#_modifying_gephi_8217_s_opengl_visualization_engine}
=============================================

We are going to add circles which will enclose groups of nodes (aka
communities). In three steps:

1.  Open the `VisualizationImpl` module

2.  Create simple classes for the circles

3.  Add some code in the class which manages the display in OpenGL, so
    that circles get created

1. Open the `VisualizationImpl` module {#_1_open_the_literal_visualizationimpl_literal_module}
--------------------------------------

In the gephi project, in the folder Modules, double click on the
`VisualizationImpl` module:

![Opening VisualizationImpl](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/enclosing-circles-1-en.png)

2. Create simple classes for the circles {#_2_create_simple_classes_for_the_circles}
----------------------------------------

Create a new package and add 3 classes in it: `Circle.java`,
`Point.java`, `SmallestEnclosingCircle.java`.

(I merely adapted these classes from [this
website](https://www.nayuki.io/page/smallest-enclosing-circle))

![Three classes](/docs/05_Community_Tutorials/05_Gephi_for_developers/working-from-the-source/enclosing-circles-2-en.png)

The code of these classes [can be found here](https://github.com/seinecle/gephi/tree/enclosing-circles-opengl/modules/VisualizationImpl/src/main/java/net/clementlevallois/enclosingcircles).

3. Add the circle creation logic to the class managing the OpenGL display {#_3_add_the_circle_creation_logic_to_the_class_managing_the_opengl_display}
-------------------------------------------------------------------------

Open the package `org.gephi.visualization.opengl`, and inside open
`CompatibilityEngine.java`:

![opening CompatibilityEngine.java](https://docs.google.com/drawings/d/1XYIZ2iQPOPjhshbh2CGjMv03teW0QCVfdoqy0urn1wI/pub?w=976&h=652)

No need to understand most of the code in this class.

But we see that starting at [line 194](https://github.com/seinecle/gephi/blob/enclosing-circles-opengl/modules/VisualizationImpl/src/main/java/org/gephi/visualization/opengl/CompatibilityEngine.java#L194),
a loop on nodes starts:

We will put nodes in a map (declared above, at [line 155](https://github.com/seinecle/gephi/blob/enclosing-circles-opengl/modules/VisualizationImpl/src/main/java/org/gephi/visualization/opengl/CompatibilityEngine.java#L155))
where:

-   keys are the name of the cluster nodes belong too,

-   values are the Set of Nodes corresponding to the cluster.

(yes, this implies the nodes must have an attribute called \"Modularity
Class\" showing the cluster they belong to)

The code you should add to assign nodes to clusters in the map is in
[lines 197-203](https://github.com/seinecle/gephi/blob/enclosing-circles-opengl/modules/VisualizationImpl/src/main/java/org/gephi/visualization/opengl/CompatibilityEngine.java#L197)

Then, [lines 210-245](https://github.com/seinecle/gephi/blob/enclosing-circles-opengl/modules/VisualizationImpl/src/main/java/org/gephi/visualization/opengl/CompatibilityEngine.java#L210)
iterate on the map, and create the circles around clusters.

The logic of the circle creation in OpenGL can be understood rather
easily, by copying and modyfying the code used just above for the
creation of nodes, and by looking at the online documentation on [how to create shapes in OpenGL](http://www.openglprojects.in/2014/03/draw-circle-opengl.html#gsc.tab=0).

That's it. Now just run Gephi from source as we did before. From Gephi,
open a network where nodes have a \"Modularity Class\" attribute, and
Gephi will draw circles around nodes from the same clusters:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y3jk-_QaFx4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>