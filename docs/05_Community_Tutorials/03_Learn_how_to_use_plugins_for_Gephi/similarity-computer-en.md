---
id: similarity-computer-en
title: Similarity
last_update:
  author: Clément Levallois
sidebar_position: 3
description: Similarity
tags:
  - Plugin
---
I have transfered the plugin to a free web application, which makes it
easier to access. Visit the [\"network builderpage\"](https://nocodefunctions.com/gaze/network_builder_tool.html) on
[Nocodefunctions](https://nocodefunctions.com).

You will be able to generate the file of a network (.gexf) and open it
in Gephi.

Presentation of the plugin {#_presentation_of_the_plugin}
==========================

This plugin is created by [Clement
Levallois](https://www.clementlevallois.net).

It converts a spreadsheet or a csv file into a network.

This plugin enables you to:

-   Start from a data table in Excel or csv format

-   In the data table, nodes are the entities listed in column A

-   Nodes\' attributes must be listed in columns B, C, D, etc.

-   Connections will be created between nodes, when they have identical
    attributes.

-   Attributes can have values, stored in columns right next to the
    attribute.

1. The input {#_1_the_input}
------------

![An Excel file](https://docs.google.com/drawings/d/1TkShesrj6PsObLdj3fCMLScxTXJgopxTEICPv8CPd4Y/pub?w=840&h=887)

1. The output {#_2_the_output}
-------------

![Resulting network](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/result.png)

Installing the plugin {#_installing_the_plugin}
=====================

![Choose the menu Tools then Plugins](https://docs.google.com/drawings/d/1dgcXEC-nrQQtLvEtSLCrzKXfAdi2Hy1jCslyf2ky20A/pub?w=956&h=530)

![Click on the tab Available Plugins](https://docs.google.com/drawings/d/1u4LqlnQby5DQVmq4csZ6f7sq_Z33F33UqtBZ43eh4pc/pub?w=645&h=406)

![Install the plugin Similarity Computer then restart Gephi](https://docs.google.com/drawings/d/18hovYg9G5ek39rILj-aRlEpaWnN6doQeg15iX6lU0aY/pub?w=833&h=543)

Opening the plugin {#_opening_the_plugin}
==================

![Open the plugin via the menu File - Import](https://docs.google.com/drawings/d/1eu5O9KiGDAXJSkQuXHYq37T8vSvlZCPMgjwpa4C4Bh4/pub?w=1423&h=851)

Using the plugin {#_using_the_plugin}
================

First panel {#_first_panel}
-----------

![Select a file](https://docs.google.com/drawings/d/1T1MfrbkD-0JXU0gJittis1SzC6oTS3TzN2NqwkKtRVE/pub?w=1412&h=920)

![A file without headers](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/file-without-header-en.png)

![A file with headers](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/file-with-header-en.png)

Second panel {#_second_panel}
------------

![Parameter for weight](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/plugin-4-en.png)

Third panel {#_third_panel}
-----------

![Confirmation panel](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/plugin-5-en.png)

How is the similarity computed, exactly? {#_how_is_the_similarity_computed_exactly}
========================================

We use the cosine similarity. Sounds complicated, but it is not. [Check here](http://stackoverflow.com/questions/1746501/can-someone-give-an-example-of-cosine-similarity-in-a-very-simple-graphical-wa).

The source code for the cosine calculation is in this
[file](https://github.com/gephi/gephi-plugins/blob/master-forge/modules/SimilarityComputer/src/main/java/net/clementlevallois/computer/CosineCalculation.java),
at [this place](https://github.com/gephi/gephi-plugins/blob/master-forge/modules/SimilarityComputer/src/main/java/net/clementlevallois/computer/CosineCalculation.java#L110).

FAQ / special notes on the plugin {#_faq_special_notes_on_the_plugin}
=================================

1. Excel files should be .xlsx, not .xls {#_1_excel_files_should_be_xlsx_not_xls}
----------------------------------------

Because they represent two slightly different files formats, and the
plugin supports only .xlsx

2. csv files are ok. {#_2_csv_files_are_ok}
--------------------

If you select a [csv file](http://www.computerhope.com/issues/ch001356.htm), you will be
asked to indicate the field delimiter and optionally the text delimiter.

![When a csv file is selected](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/plugin-6-en.png)

3. You can't use numerical values in the attributes {#_3_you_can_8217_t_use_numerical_values_in_the_attributes}
---------------------------------------------------

![Age is a numerical attribute](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/numerical-attributes-en.png)

This is too bad. If there is enough demand for it I'll add this feature,
which is not trivial.

4. Each entity should appear only on one line {#_4_each_entity_should_appear_only_on_one_line}
---------------------------------------------

![An entity appearing twice](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/similarity-computer-en/plugin-7-en.png)

David appears on lines 2 and 5 (because he made two purchases). Only the
latest line where David appears (line 5) will be taken into account.