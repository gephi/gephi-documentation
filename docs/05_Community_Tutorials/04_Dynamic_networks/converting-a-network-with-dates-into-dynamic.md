---
id: converting-a-network-with-dates-into-dynamic
title: Converting a network with dates into Dynamic
last_update:
  author: Clément Levallois
sidebar_position: 2
description: Converting a network with dates into Dynamic
tags:
  - Plugin
  - Dynamic
---

Goals of this tutorial {#_goals_of_this_tutorial}
======================

-   We take a normal network, where nodes have attributes which can
    serve as time indication (a date, a number...)

-   We convert this network into a dynamic network: nodes will appear
    and disappear according to their attributes.

download a network file for practice {#_download_a_network_file_for_practice}
====================================

[download this zip file](../../resources/miserables-with-dates.zip) and
unzip it on your computer.

or use this direct link: [](https://tinyurl.com/gephi-tuto-4)

You should find the file `miserables-with-dates.gexf` in the zip file.
Save it in a folder you will remember (or create a folder specially for
this small project).

This file contains a network representing \"who appears next to whom\"
in the 19th century novel *Les Misérables* by Victor Hugo[^1].

A link between characters A and B means they appeared on the same page
or paragraph in the novel.

The file name ends with \".gexf\", which just means this is a text file
where the network information is stored (name of the characters, their
relations, etc.), following some conventions.

This file has been modified to add some dates to each character in the
novel:

-   a \"start date\", which is a day (example: 22/09/1835). This is the
    date when the character **enters** the action in the novel

-   an \"end date\", also a day (example: 22/09/1840). This is the date
    when the character **leaves** the action in the novel

-   a \"peak moment\". This is a number (example: 14263). This is an
    instant when the character is at the center of the plot. This number
    has no historical meaning, this is just a chronological moment in
    time.

NOTE

:   Values for start date, end date and peak moment have no real
    significance in the novel. They are made up for this exercise.

open the network in Gephi {#_open_the_network_in_gephi}
=========================

-   open Gephi. On the Welcome screen that appears, click on
    `Open Graph File`

-   find `miserables-with-dates.gexf` on your computer and open it

![welcome screen](/docs/05_Community_Tutorials/04_Dynamic_networks/converting-a-network-with-dates-into-dynamic/gephi-welcome-screen-open-graph-en.png)

A report window will open, giving you basic info on the network you
opened:

![report window](/docs/05_Community_Tutorials/04_Dynamic_networks/converting-a-network-with-dates-into-dynamic/opening-file-report-en.png)

This tells you that the network comprises 74 characters, connected by
248 links.

Links are undirected, meaning that if A is connected to B, then it is
the same as B connected to A.

The report also tells us the graph is not dynamic: it means there is no
evolution or chronology, it won't \"move in time\".

Click on `OK` to see the graph in Gephi.

![The network we will use](/docs/05_Community_Tutorials/04_Dynamic_networks/converting-a-network-with-dates-into-dynamic/result_miserables.png)

getting a sense of the attributes in the data laboratory {#_getting_a_sense_of_the_attributes_in_the_data_laboratory}
========================================================

We can switch to the data laboratory to see the underlying data:

![Switching to the data laboratory](https://docs.google.com/drawings/d/15SISc0_m4w99GUxZcbrln1183dRqBYNK0EpG2OOBbVU/pub?w=954&h=524)

![Zoom on three attributes representing time](https://docs.google.com/drawings/d/1kDpiarI7R8Z8a7nEsVlD34lCOYPxLAUJqPmsm08IwR8/pub?w=1439&h=754)

The nodes (characters) of the network have attributes (start date, end
date, peak moment) which can make this graph dynamic - but it is not
yet.

A couple of steps are needed to enable the dynamic features, and here a
choice must be made:

Do we prefer to have...

1.  ... nodes appearing on screen at their start date, and staying on
    screen for ever after?

2.  ... nodes appearing on screen at their start date, and leaving the
    screen at their end date?

3.  ... nodes being representedsimply by their \"peak moment\" (a
    number), without reference to chronological dates?

We will present these 3 possibilities.

1. dynamic nodes with a start date {#_1_dynamic_nodes_with_a_start_date}
----------------------------------

![Merge columns](https://docs.google.com/drawings/d/1bCWm0LPCJ-DWF3oR7szSA_fsd_ExMjJBjqLUBIzsyUs/pub?w=1439&h=754)

![Set up the parameters - 1](https://docs.google.com/drawings/d/1O-C4kdb2gW8dABzUXxPDTzn0afr0YEqujGfRtVaSO80/pub?w=1438&h=657)

![Result](https://docs.google.com/drawings/d/1GsZ9WLLSCV7yddr9PEjGQhPLBb_nMC_g-4-zs-7jus4/pub?w=1431&h=847)

Let's switch back to the Overview to see the graph and how it evolves in
time.

IMPORTANT

:   We are going to use the timeline to play the animation. The timeline
    has many features which are explained in a specific tutorial.

![Animating the dynamic network](/docs/05_Community_Tutorials/04_Dynamic_networks/converting-a-network-with-dates-into-dynamic/moving-timeline-miserables-1-en.gif)

to be continued {#_to_be_continued}
===============

more tutorials on dynamic networks with Gephi {#_more_tutorials_on_dynamic_networks_with_gephi}
=============================================

-   [The wiki on gephi.org](https://github.com/gephi/gephi/wiki/Import-Dynamic-Data)


[^1]: D. E. Knuth, The Stanford GraphBase: A Platform for Combinatorial
    Computing, Addison-Wesley, Reading, MA (1993)
