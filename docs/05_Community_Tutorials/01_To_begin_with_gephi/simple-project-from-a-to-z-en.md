---
id: simple-project-form-a-to-z
title: Simple Project from A to Z
sidebar_position: 3
last_update:
  author: Clément Levallois
tags:
  - Tutorial
  - Quick Start
keywords:
  - simple
  - quick start
  - tutorial
  - graph
description: Simple Project with gephi form A to Z
---

Description of the project {#_description_of_the_project}
==========================

This project is for complete beginners to Gephi. It supposes you have
Gephi installed and running on your computer. That is all.

When finishing this tutorial, you should be able to:

-   be familiar with the vocabulary to discuss networks

-   download a network file for this exercise

-   description of the file / the network

<!-- -->

-   open a network file

-   read the report after opening a file

-   show the labels of the nodes

-   layout the network

<!-- -->

-   visualize attributes of the network

-   prettify the network for enhanced readability

-   compute the centrality of the nodes in the network

-   visualize attributes created by Gephi

-   export a visualization as a picture or pdf

-   export a web visualization of the network

be familiar with the terminology to discuss networks {#_be_familiar_with_the_terminology_to_discuss_networks}
====================================================

![terminology for
networks](https://docs.google.com/drawings/d/1h8N-UBY7dO6Q7mXCbPY78ITfJx1Mti9YD2ScnVu4oHA/pub?w=960&h=720)

download a network file {#_download_a_network_file}
=======================

[download this zip file](https://seinecle.github.io/gephi-tutorials/resources/miserables_result.zip) and unzip it on
your computer.

You should find the file `miserables.gexf` in it.

Save it in a folder you will remember (or create a folder specially for
this small project).

description of the file / the network {#_description_of_the_file_the_network}
=====================================

This file contains a network representing \"who appears next to whom\"
in the 19th century novel *Les Misérables* by Victor Hugo[^1].

A link between characters A and B means they appeared on the same page
or paragraph in the novel.

The file name ends with \".gexf\", which just means this is a text file
where the network information is stored (name of the characters, their
relations, etc.), following some conventions.

open the network in Gephi {#_open_the_network_in_gephi}
=========================

-   open Gephi. On the Welcome screen that appears, click on
    `Open Graph File`

-   find `miserables.gexf` on your computer and open it

![welcome screen](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/gephi-welcome-screen-open-graph-en.png)

read the report after opening a file {#_read_the_report_after_opening_a_file}
====================================

A report window will open, giving you basic info on the network you
opened:

![report window](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/opening-file-report-en.png)

This tells you that the network comprises 74 characters, connected by
248 links.

Links are undirected, meaning that if A is connected to B, then it is
the same as B connected to A.

The report also tells us the graph is not dynamic: it means there is no
evolution or chronology, it won't \"move in time\".

Click on `OK` to see the graph in Gephi.

initial view {#_initial_view}
============

![initial view when opening a graph](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/project-initial-view.png)

This is how the network appears in Gephi. Not very useful! Let's examine
what we have here.

basic view of Gephi's interface {#_basic_view_of_gephi_8217_s_interface}
===============================

![the 3 main screens in
Gephi](https://docs.google.com/drawings/d/1MVPuD8fYe8bEJJJ67heQjrMidA7vyizGc37p4y5LRH8/pub?w=960)

Gephi has 3 main screens:

1.  Overview: where we can explore the graph visually

2.  Data Laboratory: provides an \"Excel\" table view of the data in
    network

3.  Preview: where we polish the visualization before exporting it as a
    pictue or pdf

What we see here is the Overview.

![Filters and statistics panels in
Gephi](https://docs.google.com/drawings/d/1XwpvulXoyiK3nBbxFiCFisH6_pg9P9us9LnZJvzlDz4/pub?w=960)

In the Overview, the graph is shown at the center. Around it, several
panels help us fine tune the visualization.

1.  \"Filters\", where we can hide different parts of the network under
    a variety of conditions

2.  \"Statistics\", where we can compute metrics on the network

![Appearance and layout panels in
Gephi](https://docs.google.com/drawings/d/1J4wCFaXwIaRmiiG7t69s8HmhA0hnR0Sp0hwgOFquFdw/pub?w=1439&h=787)

1.  \"Appearance\", where we can change colors and sizes in interesting
    ways

2.  \"Layouts\", where we can apply automated procedures to change the
    position of the network

![3 groups of
icons](https://docs.google.com/drawings/d/1IkRBs4doz5fZWovao-yJFBR9hg7RO_BtGJwhUF9yoJk/pub?w=1435&h=774)

1.  A series of icons to add / colorize nodes and links manually, by
    clicking on them

2.  Options and sliders to change the size of all nodes, links, or
    labels

3.  More options become visible if we click on this **little arrow head
    pointing up**

showing labels of the nodes {#_showing_labels_of_the_nodes}
===========================

![showing node
labels](https://docs.google.com/drawings/d/1o-J7Uce1okDdIN_IgvZaH4MdGjn74_ChTlXo-nxS-w4/pub?w=960&h=720)

layout (\"spatialize\") the network {#_layout_spatialize_the_network}
===================================

![selecting the force atlas 2
layout](https://docs.google.com/drawings/d/1fD_AdsP3SqV5CENMDmMpt6ZLYOAgLsDDYxv2fJr7R6E/pub?w=960&h=720)

![changing a few parameters and launching the
layout](https://docs.google.com/drawings/d/1TnbclWXKFJiYUOJTHAl2Fyh5j3KgxV5TyLGyN1Gnn7k/pub?w=960&h=720)

![result of Force Atlas 2
layout](https://docs.google.com/drawings/d/1RkRn4Q8Ln-C1qJCiuBp2FN51GavaaLlm17QnVOO_av4/pub?w=960&h=720)

visualize the properties of the nodes {#_visualize_the_properties_of_the_nodes}
=====================================

A network consists in entities and their relations. This is what we just
visualized. Yet, the properties of these entities remain invisible.

For instance: the characters in the novel \"Les Misérables\" are male or
female. Are males more likely to be connected to males, or females? Just
looking at the network in Gephi, we can't tell.

Now, we will see how to make this property (\"Gender\") visible.

![Switching the view to the data
laboratory](https://docs.google.com/drawings/d/1mDTOUanUkOa0ND8wn3tuwM54pqYXN6RApWkZTxSpEiI/pub?w=954&h=524)

![We see there is a Gender attribute for each
character.](https://docs.google.com/drawings/d/1wIubWP6KX6oaz3pd7SQYziWR_2hK2KIhH0gAFwn3rEk/pub?w=758&h=431)

We will color the nodes based on their gender. To do that, we select
`Gender` in the `Appearance` panel:

![Coloring nodes according to their gender](https://docs.google.com/drawings/d/1VdIaYCfuMAF5Tk3EaCak-Z0M9GsIuPpjxc6RWi0FELs/pub?w=758&h=431)

The result:

![After coloring characters according to their gender](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/appearance-miserables-result.png)

prettify the network for enhanced readability {#_prettify_the_network_for_enhanced_readability}
=============================================

There are a number of issues with the result we get:

1.  the network is too big or too small, it is hard to read

2.  the labels of the characters overlap

3.  the size of the labels might be too big / small

4.  the links are sometimes too large

Let's fix these issues.

1. Enlarge or shrink the network {#_1_enlarge_or_shrink_the_network}
--------------------------------

-   either we use the \"scaling\" parameter of the layout, as we have
    seen [here](#force-atlas-2-parameters).

-   or the scale is fine, it is just that we need to zoom it or out. Use
    the scrolling wheel of your mouse, and right click to move the
    network.

2. Prevent the Labels from overlapping {#_2_prevent_the_labels_from_overlapping}
--------------------------------------

In the layout panel, choose \"Label Adjust\" or \"Noverlap\": these
layouts will move the nodes just so that the Labels stop overlapping:

![Noverlap or Label Adjust will help you](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/choosing-a-label-adjust-algo-en.png)

Don't forget to click on \"Run\" to apply these layouts.

3. Changing the size of the labels {#_3_changing_the_size_of_the_labels}
----------------------------------

Open the bottom panel of Gephi by clicking on tiny arrow head (1). Then
select \"nodes\" (2), then move the slider (3).

![Adjusting label size](https://docs.google.com/drawings/d/13dOYkyzY4dKMIDrSj59NFF5GftZD55eRC26HZ8jn2RM/pub?w=758&h=431)

1. Adjusting the thickness of the links {#_4_adjusting_the_thickness_of_the_links}
---------------------------------------

![Adjusting edge thickness](https://docs.google.com/drawings/d/13Sdd6ss52TgXoG1i4CkaGw3aHap-WWDvpJjosQJSyls/pub?w=758&h=431)

computing the centrality of the nodes {#_computing_the_centrality_of_the_nodes}
=====================================

1. Definitions of centrality {#_1_definitions_of_centrality}
----------------------------

\"Centrality\" is a very good metrics to first get an idea of a network.
What does centrality mean? Intuitively, we understand that a \"central\"
node will probably sit in the middle of the network. But how to measure
that \"scientifically\", so that we have an objective confirmation of
our visual impression?

There are several ways, all equally interesting.

We can measure `degree centrality`. \"Degree\" is the technical term for
\"number of connections that a node has\".

So, `degree centrality` just means that the most central node is the
node which has the most connections. Simple!

Another measure is `betweenness centrality`. This one is more tricky.

-   First, you have to imagine what is a `shortest path`.

-   A `path` from node A to node B is a chain of nodes, the road if you
    will, that you have to traverse to go from A to B.

-   The `shortest path` from A to B is the quickest road from A to B:
    the path that has the smallest number of nodes between A and B.

-   A node which is on many shortest paths is \"between\" many nodes.
    And when you realize it, it is a very intuitive sense of what it
    means to \"be central\". These nodes have a high
    `betweenness centrality`.

2. Computing betweenness centrality with Gephi {#_2_computing_betweenness_centrality_with_gephi}
----------------------------------------------

Gephi computes it for you. Find \"Network diameter\" in the statistics
panel and click \"run\":

![Computing betweenness centrality](https://docs.google.com/drawings/d/1T66-VP25_nvxCvmnpQWUraCYT3Vxi0oW3f-TBZDtYPM/pub?w=758&h=415)

This will open a window with parameters (explained in a more advanced
tutorials). Click \"OK\":

![Parameters for the computation of betweenness centrality](https://docs.google.com/drawings/d/1OmI-MugkNhDR67BR0ns5injN1FoVhm1IjXXzI5Qv4NQ/pub?w=411&h=232)

A report window opens (also explained in a other tutorials). Close it.

![Report after the computation of betweenness centrality](https://docs.google.com/drawings/d/1_eS17piFaVKG4cXL1TAxIh4sSL5ubg7_-6AziUrjJl8/pub?w=300)

Now we can visualize this information.

visualize attributes created by Gephi {#_visualize_attributes_created_by_gephi}
=====================================

Gephi has computed for us the betweenness centrality of all nodes. This
remains invisible on the network, however.

It would be interesting to, say, resize the nodes according to their
centrality: the more central a node, the bigger. This would allow for a
very quick visual appreciation of which nodes are the most central.

First, let's switch to the data laboratory to see how Gephi stored the
\"betweenness centrality\" of each node:

![Switching the view to the data laboratory](https://docs.google.com/drawings/d/1mDTOUanUkOa0ND8wn3tuwM54pqYXN6RApWkZTxSpEiI/pub?w=954&h=524)

When we ran \"Network Diameter\" in the statistics panel, Gephi has
actually computed many kinds of centralities (not just \"betweenness
centrality\"):

![Different centrality measures visible in the data laboratory](https://docs.google.com/drawings/d/1anoYqTntqA4ZYuS035GQQEDwPwbIr_kk1oQ6wRVfkPM/pub?w=954&h=525)

To resize the nodes according to the value of their betweenness
centrality, we use the `Appearance` panel:

> **Caution**
>
> make sure you select the correct options

![Ranking node sizes by centrality](https://docs.google.com/drawings/d/13XItrvTkrJSQ6MzQTLe7ZugrpxfBJMBi0qzsVbH_JeQ/pub?w=954&h=525)

![Selecting the minimum and maximum sizes of nodes](https://docs.google.com/drawings/d/1EeA-5wfTuHKc8jQL49afXZb-LQl1Rtss49mE11U8Ako/pub?w=954&h=525)

![Result of the ranking](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/ranking-centrality-miserables-3--en.png)

![Resizing labels to reflect their node\'s size](https://docs.google.com/drawings/d/1G9s36WY2PDpYpUxl0qYgA_ccqLpAoOd6kap8X8QSKog/pub?w=954&h=525)

![Result of the label resizing](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/result-label-resizing-en.png)

exporting a network as a picture {#_exporting_a_network_as_a_picture}
================================

1. exporting a screenshot from the Overview (a png image) {#_1_exporting_a_screenshot_from_the_overview_a_png_image}
---------------------------------------------------------

![Open the configuration panel for screenshots](https://docs.google.com/drawings/d/13nw3KJL1vHc2zhFr3A5WB3za6GFrzpxQ8kZjujNLIqM/pub?w=954&h=525)

Select the maximum value for anti-aliasing, and multiply values for
width and height for higher resolution. For example, resolution x 3 is
width = 3072 and height = 2304

![The configuration panel for screenshots](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/configuration-screenshot-en.png)

2. exporting a pdf or svg picture {#_2_exporting_a_pdf_or_svg_picture}
---------------------------------

Let's switch to the preview panel:

![Switching to the preview panel](https://docs.google.com/drawings/d/1j0dbw5wwOccDoUEFk8XBsCaKi6Ms9bZlqqOM1MgdDog/pub?w=954&h=525)

The preview panel is dedicated to the preparation of the picture to be
exported as a pdf or svg, which are \"scalable\": in pdf or sv, the
resolution of the graph will remain perfect, even with a strong zoom.
But as you see, it means the network is now looking different than in
the Overview.

> **Caution**
>
> contrary to the Overview panel, here you need to hit the \"refresh\"
> button after each parameter change.

![Updating the parameters](https://docs.google.com/drawings/d/1gfeX6T1YzVEPFKgrxRmcL47EbeFnnGTmiBRw35V6VCM/pub?w=954&h=525)

Here I change just 2 parameters: `Show Labels` and `Font` (which I
reduce to size \"5\"), to get:

![Result of preview](https://docs.google.com/drawings/d/1Kz34ITT6BecVkgy7S50JO2nX-hywCWnC_kMpJ21TkXo/pub?w=954&h=525)

Export: just click on the button and select the file format you prefer

![Export button](https://docs.google.com/drawings/d/1ATho4fb-YqCAPHw4sLa65le7C0kOtNWk7YOYdjd98RA/pub?w=954&h=525)

3. download the result file {#_3_download_the_result_file}
---------------------------

[download this zip file](../resources/miserables_result.zip) if you need
to see the network in its final form.

export a network as a web visualization {#_export_a_network_as_a_web_visualization}
=======================================

You can easily create a web-based version of your network. It can be
made public or private. If you choose to make it public, it will be easy
to share - simply send the url.

The web version makes use of [VOSviewer
online](https://github.com/neesjanvaneck/VOSviewer-Online), which works
best for networks up to \~ 500 nodes (if your networks has more nodes,
it can be hard to read on screen).

To proceed, simply:

1. export your graph from Gephi as a .gexf file {#_1_export_your_graph_from_gephi_as_a_gexf_file}
-----------------------------------------------

> **Warning**
>
> make sure you export a **gexf** file, not a **GEPHI** file!

In Gephi, do: **File → Export → Graph file...** See an illustration
below:

![Export gexf file 1](https://docs.google.com/drawings/d/e/2PACX-1vT1Ku1bUqL3EHEn1byCIU1OWGBlbR3ygIdVsJx6lfJ2kGjkuOtao78Wzg7z-NKqgCTVm02kQM0ep1kz/pub?w=617&h=356)

![Export gexf file 2](https://docs.google.com/drawings/d/e/2PACX-1vS_qt5cta9d7B84CBojpv_F8m-g-l5BMXTuCB5g4daQ6AV87prgSfGAhmPE7oPtkcn0GSSobIRD_GF1/pub?w=566&h=348)

2. visit nocodefunctions and convert the gexf file to a web visualization {#_2_visit_nocodefunctions_and_convert_the_gexf_file_to_a_web_visualization}
-------------------------------------------------------------------------

[Nocode functions](https://nocodefunctions.com/) is a web application
that I developed. It provides useful tools to work with networks and
text. It is free, does not need a registration, and is respectful of
your data.

-   Go to [this page on
    nocodefunction](https://nocodefunctions.com/networkconverter/network_format_converter.html).

-   Choose option 1 (\"convert a Gephi gexf file to VOSviewer json
    format\")

-   If you want to share your visualization, check the box to make it
    public

-   Click on \"Convert to VOSviewer json file\"

You will be directed to a new webpage like the one below:

![An illustration of the web view of a gexf file](/docs/05_Community_Tutorials/01_To_begin_with_gephi/simple-project-from-a-to-z-en/vosviewer_result.png)

3. public or private web visualization? How to manage {#_3_public_or_private_web_visualization_how_to_manage}
-----------------------------------------------------

If you have chosen \"public\" at the previous step you can now bookmark
the web page of your network, share it, etc. Otherwise, **the
visualization will be deleted after an hour**. This is to keep the
promise that your data is secure: if you want it private, we simply
don't keep it on the servers.

What if you want to keep your visualization private, but don't want to
redo all the steps after each hour?

-   in the VOSviewer visualization, save your network as a json file by
    clicking on the \"save\" icon:

![Saving the network to a json file from the VOSviewer online interface](https://docs.google.com/drawings/d/e/2PACX-1vTLGLExFtxC4dVKqPopQZnKJ5UkyZ90LSaVMjoIrOtd-THcxqePRG5vcG_FKxfBrVAnh1GsnoT7nS3F/pub?w=566&h=348)

Then, you can re-open this file in the web interface whenever you want:

-   Visit [this page by nocode
    functions](https://nocodefunctions.com/html/vosviewer/index.html) or
    [the official page by VOSviewer online](https://app.vosviewer.com),
    and open your network in it:

![Opening a network in the VOSviewer online interface](https://docs.google.com/drawings/d/e/2PACX-1vT52zSJRDW4hWN150kcMbMJ0HFiXE-tPHvZ0wQ__0bItpYyQUINTLujxXpctv1jpCHMt_stimVB7kHq/pub?w=566&h=348)

4. More options to share your visualization with VOSviewer online {#_4_more_options_to_share_your_visualization_with_vosviewer_online}
-----------------------------------------------------------------

[This web page](https://app.vosviewer.com/docs/sharing/linking/) offers
a full view on the other ways you can share a network visualization with
VOSviewer online.

the end {#_the_end}
=======

Visit [the Gephi group on
Facebook](https://www.facebook.com/groups/gephi) to get help,

or visit [the website for more
tutorials](https://seinecle.github.io/gephi-tutorials)

questions and exercises {#_questions_and_exercises}
=======================

1.  Open the file `miserables.gexf` with a text editor (here is how to
    do it on a
    [Mac](http://www.dummies.com/computers/macs/how-to-open-and-edit-a-text-file-on-a-mac/),
    and on
    [Windows](https://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/app_notepad.mspx?mfr=true)).
    See how the nodes and the links are written in the file. Can you
    find the character Javert?

<!-- -->

1.  Our network of Les Miserables characters was undirected. Can you
    think of networks which are directed?

Imagine how undirected and directed networks differ when computing
centrality, for example.

1.  Force Atlas 2 is a layout which brings together connected nodes, and
    spreads out unconnected nodes. We might have nodes with no relation
    at all with other nodes (called \"isolated nodes\").

How will these isolated nodes move on screen?

1.  When applying the Force Atlas 2 layout, the network moves quickly,
    then stabilizes, and then keeps moving a bit.

Can you guess why this is happening?

1.  In the list of layouts, Force Atlas 2 is just one of many options
    you can choose. Try \"Fruchterman Reingold\" and \"Yfan Hu\".

These are layouts which follow the same logic as Force Atlas 2, but with
slight variations. Explore how these algorithms result in similar, yet
specific layouts.

1.  In this tutorial, we defined degree centrality. Can you imagine a
    situation when a node with the largest degree centrality will
    actually be in the periphery of the network? You can draw a toy
    network to help you figure.

[^1]: D. E. Knuth, The Stanford GraphBase: A Platform for Combinatorial
    Computing, Addison-Wesley, Reading, MA (1993)
