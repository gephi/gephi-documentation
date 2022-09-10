---
id: importing-csv-data-in-gephi-en
title: Importing csv data in Gephi
last_update:
  author: Clément Levallois
sidebar_position: 1
description: Importing csv data in Gephi
tags:
  - CSV
  - Import
---

Importing an existing network file {#_importing_an_existing_network_file}
==================================

Gephi handles the import of network files in a variety of formats:

![file formats supported by Gephi. Source: gephi.org](/docs/05_Community_Tutorials/02_Key_use_cases/importing-csv-data-in-gephi-en/network-formats-gephi-import-en.png)

To import any of these files, just choose the `File -> Open` menu

Importing nodes with labels and their relations: simplest version {#_importing_nodes_with_labels_and_their_relations_simplest_version}
=================================================================

(looking for the complete, full featured csv import version? [skip to here](#full-csv-version).)

The easiest is probably to just have a text file like this one:

    Source,Target 
    Jeremy,Jennifer
    Valerian,Jeremy

-   This line is mandatory. Don't put a space between the comma and
    \"Target\"

Just write this in a text editor and save it as a file `example.txt`

To import this file in Gephi, go to `File->Import Spreadsheet`. Then in
the window:

![Importing nodes with labels and their relations](https://docs.google.com/drawings/d/10G-ww5yaxlUme5h1wAcfK9AdqY8dNnurfFYZotljhPs/pub?w=644&h=520)

In this window, make sure the box \"Create missing nodes\" is checked:

![Second screen](https://docs.google.com/drawings/d/1CnsxD6sjfXokhHxaZR6P_jJ2mNEtKBiTh_iB4EA3sjE/pub?w=644&h=520)

Let's look again at the simple text file we used:

    Source,Target
    Jeremy,Jennifer
    Valerian,Jeremy

There are 2 issues and several missing features, listed below:

1. labels containing commas in them will not work. {#_1_labels_containing_commas_in_them_will_not_work}
--------------------------------------------------

Imagine our characters have first names and last names separated by a
comma:

Dubois, Jeremy

Rodriguez, Valerian

This will look like:

    Source,Target
    Dubois, Jeremy,Jeremy,Jennifer
    Rodriguez, Valerian,Dubois, Jeremy

Note that we have 3 commas per line, instead of one! In this mess, Gephi
will not detect where the node labels start and end. The import will
break.

The proper solution is to put node labels inside **double quotes**:

    Source,Target
    "Dubois, Jeremy","Jeremy,Jennifer"
    "Rodriguez, Valerian","Dubois, Jeremy"

Be careful to use these straight \" \" double quotes, not the curvy
ones: " " which French keyboards sometimes have.

2. labels containing double quotes \" \" in them will not work. {#_2_labels_containing_double_quotes_in_them_will_not_work}
---------------------------------------------------------------

Example: let's imagine that one of our characters has a middle name:
Jeremy \"Danger\" Dubois. Our text file will look like:

    Source,Target
    "Dubois, Jeremy "Danger"","Jeremy,Jennifer"
    "Rodriguez, Valerian","Dubois, Jeremy "Danger""

These extra \" \" will make the Gephi import break:

![The import bugs - the middle name has disappeared](/docs/05_Community_Tutorials/02_Key_use_cases/importing-csv-data-in-gephi-en/import-spreadsheet-4-en.png)

The solution consists in **adding an extra double quote in front of the
double quotes**. Our text file will look like:

    Source,Target
    "Dubois, Jeremy ""Danger""","Jeremy,Jennifer"
    "Rodriguez, Valerian","Dubois, Jeremy ""Danger"""

This time, Gephi imports the network correctly:

![Importing node labels containing double quotes](/docs/05_Community_Tutorials/02_Key_use_cases/importing-csv-data-in-gephi-en/import-spreadsheet-3-en.png)

Importing more than labels: nodes and edges attributes {#_importing_more_than_labels_nodes_and_edges_attributes}
======================================================

To import attributes we will need to proceed differently.

We need 2 text files: one for the list of nodes, one for the list of
relations (edges)

An example file with a list of nodes:

    Id,Label,Date of Birth,Place of Birth,Years of experience,Rating 
    3,"Dubois, Jeremy ""Danger""",17/09/1980,"Paris",8,9.27
    1,"Jeremy,Jennifer",25/03/1978,"Tampa",8,4.34
    45,"Rodriguez, Valerian",30/04/1985,"Berlin",5,6.66

-   Nodes **must** have at least an Id and a Label. Don't put spaces
    after the commas

An example file with a list of edges:

    Source,Target,Weight,Type,Where first met 
    1,45,3,"undirected",London 

-   Edges **must** have at least a Source and Target. Other fields are
    optional.

-   \"undirected\", the alternative is \"directed\". Directed edges have
    arrow heads.

Let's import the list of nodes first. `File -> Import Spreadsheet`

![Importing a list of nodes with attributes](https://docs.google.com/drawings/d/15GXuO-ucoucMw4OvyckAHrg5UDThMO0hkFB924yFtm0/pub?w=951&h=537)

in the next screen, we must be careful with a couple of things:

![The attributes of the nodes](https://docs.google.com/drawings/d/1K2WPeei2RYxIB8neTeXB9xWTqY8egvkVh80nj4FEIWg/pub?w=653&h=531)

Then we can import the file with the list of relations.
`File -> Import Spreadsheet`

![Importing a list of edges with attributes](https://docs.google.com/drawings/d/1KSE9pCnJ61Wvqf7moB_VLUMOTQVOTqRqwUjOHac7_SE/pub?w=595&h=375)

![The attributes of the
edges](https://docs.google.com/drawings/d/1PTWwhnWkb-blXN-Yx-wQuYoohqTZejNPnADNdfcG-_k/pub?w=506&h=356)

Memo card {#_memo_card}
=========

Nodes

-   header must be at least `Id,Label`

Edges

-   header must be at least `Source,Target`

-   To have an attribute for the \"thickness\" or \"strength\" of a
    relation, this attribute must be called \"Weight\".

-   Want arrows on your links? Add an attribute \"Type\", with value
    \"Directed\"

-   Don't wan't arrows? Add an attribute \"Type\", with value
    \"Undirected\"

Types of attributes: which to choose?

![Kinds of attributes](/docs/05_Community_Tutorials/02_Key_use_cases/importing-csv-data-in-gephi-en/import-spreadsheet-9-en.png)

-   Textual attribute: `String`. Nodes sharing the same textual value
    can be colored the same, or filtered together...

-   Numerical attribute: `Integer`, `Double` or `Float`. Nodes can be
    resized according to their value, or colorized in a gradient.
    Filters can be applied based on the range of values.

-   Boolean attribute: just a `true` or `false` value. Useful for
    filtering out some nodes which are true or false on some parameter.

-   Other types of attributes: not needed for the moment.

(to be continued) {#_to_be_continued}
=================

More tutorials on importing data to Gephi {#_more_tutorials_on_importing_data_to_gephi}
=========================================

-   [The Gephi wiki on importing csv](https://github.com/gephi/gephi/wiki/Import-CSV-Data)

-   [Video \"How to import a CSV into Gephi\" by Jen Golbeck](https://www.youtube.com/watch?v=3Im7vNRA2ns)

the end {#_the_end}
=======

Visit [the Gephi group on Facebook](https://www.facebook.com/groups/gephi) to get help,

or visit [the website for more tutorials](https://seinecle.github.io/gephi-tutorials)
