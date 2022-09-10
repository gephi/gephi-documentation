---
id: creating-a-simple-dynamic-network
title: Creating a simple dynamic network
last_update:
  author: Clément Levallois
sidebar_position: 1
description: Creating a simple dynamic network
tags:
  - Plugin
  - Dynamic
---
1. Goals of this tutorial {#_1_goals_of_this_tutorial}
=========================

-   We are going to create one very simple **non dynamic** network
    (network \"A\").

-   then we will create a modified version of it (network \"B\").

-   in both files, we need to modify a single line.

-   finally, we will merge networks A and B, forming a new **dynamic**
    network evolving from version A to B.

> **Note**
>
> The creation of the 2 networks is not a mandatory step: you can use
> your own network files, as long as they are in gexf file format. In
> this case, [skip to here](#merging).
>
> We create the networks in this tutorial to provide the most simple and
> clear case.

2. Open a new project in Gephi {#_2_open_a_new_project_in_gephi}
==============================

-   open Gephi. On the Welcome screen that appears, click on
    `New Project`

![Open a new project](https://docs.google.com/drawings/d/1rmxB95Ew8TxaoMRERnhhaSJTT3yuhLc6VEdBRLduAag/pub?w=926&h=534)

3. creating network \"A\" {#_3_creating_network_a}
=========================

Our project is empty. We can use a simple click-and-point tool to create
a network:

![Icon for node creation](https://docs.google.com/drawings/d/1qg4oSWoP9kfH75ucPquEz5oADG50729keLngKZxs0-o/pub?w=926&h=534)

![A few nodes have been created](https://docs.google.com/drawings/d/14Lyj2kYXbnCqQpAJW2OWtJnf88KVKyJtzmxaPNTWTDc/pub?w=639&h=533)

When you have created a couple of nodes, click again on the pencil icon
to stop the node creation.

Export the network as a file and call it \"network A\":

![Exporting the network](https://docs.google.com/drawings/d/1683F5TX0MYbrNofycNIDq3TM6tcdeqQhMydnb-nrnoQ/pub?w=654&h=296)

![Choosing the gexf file format](https://docs.google.com/drawings/d/1WiD3tIgNY13pJMnqkeyc9wECX-eSlwlwJ4fZy7fX0pM/pub?w=682&h=314)

Clicking on \"Save\" saves the file in the folder you chose. You are
back to the view on your graph.

4. Creating network \"B\" {#_4_creating_network_b}
=========================

Now, click on the \"Edge pencil\", just below the \"Node pencil we have
used (careful, the icons are identical!)

![Choosing the gexf file format](https://docs.google.com/drawings/d/1N5ouRs4GXZcUG9NKPrfc9XP-BsT6uPWYYgp__RCHO14/pub?w=926&h=534)

Create one edge, or a couple of edges, in this way.

Clicking again on the pencil stops the edge creation by mouse clicks.

Then export the network **in the same folder** where we put the previous
file (`File -> Export -> Graph File ...`)

**This time, name the file *network B.gexf* and remember to choose the
`gexf` file format just like we did before.**

5. Modifying just one line in the files network A.gexf and network B.gexf {#_5_modifying_just_one_line_in_the_files_network_a_gexf_and_network_b_gexf}
=========================================================================

From your computer, open network A.gexf with a text editor (don't use
Microsoft Word!):

(here is how to do it on a
[Mac](http://www.dummies.com/computers/macs/how-to-open-and-edit-a-text-file-on-a-mac/),
and on [Windows](https://www.lifewire.com/txt-text-file-4150707)).

![The network file opened](https://docs.google.com/drawings/d/1UFJT918n8SUgWUD2KoEVCc6k2-G75QqoetWGirzhcIg/pub?w=1440&h=1080)

Delete and replace this line by this one:

``` {.xml}
<graph mode="slice" defaultedgetype="directed" timerepresentation="timestamp" timestamp="1">
```

See `timestamp="1"` ? It means this will be the first \"time slice\" of
your dynamic network.

Save the file.

Repeat the steps for network B.gexf:

-   open the file in a text editor,

-   find the line `<graph defaultedgetype="directed" mode="static">`

-   replace it by:

``` {.xml}
<graph mode="slice" defaultedgetype="directed" timerepresentation="timestamp" timestamp="2">
```

(see that we have **`timestamp="2"`** here: this is going to be the
second time slice!)

-   save the file.

6. Merging network \"A\" and \"B\" into a dynamic network {#_6_merging_network_a_and_b_into_a_dynamic_network}
=========================================================

We will use the 2 files network A.gexf and network B.gexf that we have
created.

First, let's close the project we have in Gephi, without saving:

![Closing the current project](https://docs.google.com/drawings/d/1urvovovyXAsGIb-yycOHKl3qRtsL8klaVbnzpjThQ60/pub?w=1440&h=1080)

Then click on `File -> Open` and navigate to the folder where network
A.gexf and network B.gexf are located:

![Opening files](https://docs.google.com/drawings/d/1Qah_hVAi7LXwnwuhCjLgHUlAqL4qHxUQ38PRKrPbJ_A/pub?w=1417&h=938)

![Opening 2 files at once](https://docs.google.com/drawings/d/1ZU4uqyz7C9bXMNFd46XF5H_F8W2n0wdvcyrg5QyhQkI/pub?w=1372&h=857)

Opening the files display a report window:

![Import report window](https://docs.google.com/drawings/d/1QAxYTCY38JJa8RyeMEu22u3-L65L3K-Y2Kd1FDslwB8/pub?w=1443&h=1014)

7. Enabling the timeline {#_7_enabling_the_timeline}
========================

You should see this button, click on it (if not: something went wrong.
Retrace your steps)

![Enable the timeline](https://docs.google.com/drawings/d/134kQ8NnjB5W-tqv_xsK8EvEUDezkAxAeLFoxogSh64s/pub?w=1433&h=815)

Click and slide the right side border of the timeline **to the left**.
You should see the edge disappear:

![Sliding the timeline](https://docs.google.com/drawings/d/1dGRD8i7Nsjujdsiearl1ls6v31KXwAA3x28cs4WQhhQ/pub?w=1316&h=748)

We created a dynamic network. It needs to be animated precisely with the
timeline, dynamic attributes should be explored, as well as dynamic
layouts.

These features will be explained in the coming tutorials on dynamic
networks with Gephi.

8. More tutorials on dynamic networks with Gephi {#_8_more_tutorials_on_dynamic_networks_with_gephi}
================================================

-   [The wiki on gephi.org](https://github.com/gephi/gephi/wiki/Import-Dynamic-Data)
