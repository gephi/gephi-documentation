---
id: cooccurrences-computer-en
title: Co-occurrences Network
last_update:
  author: Clément Levallois
sidebar_position: 3
description: Co-occurrences Network
tags:
  - Plugin
---

#  Creating a network from a table of cooccurring items

## Upgrade: this plugin is now available as a web app!

I have transfered the plugin to a free web application, which makes it easier to access.
Visit the [Network builder page](https://nocodefunctions.com/gaze/network_builder_tool.html) on [Nocodefunctions](https://nocodefunctions.com).

You will be able to generate the file of a network (.gexf) and open it in Gephi.


## Presentation of the plugin

This plugin is created by [Clement Levallois](https://www.clementlevallois.net).

It converts a spreadsheet or a csv file into a network.

This plugin enables you to:


*   Start from a data table in Excel or csv format
*   In the data table, each row describes an "occurrence" (of an event, a purchase, a relation, etc.)

*   In columns A, B, C, D, we have the entities involved: column A for persons, column B for what they bought, etc.
*   Connections will be created between entities, when they appear in the same occurrence (so, when they are on thee same row)
*   Occurrences can have dates, multiple instances of an entity can be listed in a given column.

### 1. The input

![An Excel file](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/cooccurrences-computer-en/excel-1-en.png)

### 2. The output

![Resulting network](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/cooccurrences-computer-en/gephi-result-1-en.png)

## Installing the plugin
![Choose the menu Tools then Plugins](https://docs.google.com/drawings/d/1dgcXEC-nrQQtLvEtSLCrzKXfAdi2Hy1jCslyf2ky20A/pub?w=956&h=530)

![Click on the tab Available Plugins](https://docs.google.com/drawings/d/1u4LqlnQby5DQVmq4csZ6f7sq_Z33F33UqtBZ43eh4pc/pub?w=645&h=406)

![Install the plugin Convert Excel and Csv files and restart Gephi](https://docs.google.com/drawings/d/e/2PACX-1vTnoukHFo6s3wgxOrtmHz_hVPf4JXcyyKIIvuXvhClULnyOIYUQcEsC-FaZNyBZBaMGv0696wk7GBhQ/pub?w=833&h=543)

## Opening the plugin

![Open the plugin via the menu File - Import](https://docs.google.com/drawings/d/1fAwFegXKYpBjfcNYmlrTsoadheVfPEqAg8kEeoEl1Ag/pub?w=1423&h=851)

## Using the plugin

### 2nd panel

![Select a file](https://docs.google.com/drawings/d/1hO9PddUbSc_XUyZFmaX1Zs6-AoX-yE9npZZjWdEo8KU/pub?w=1321&h=907)

![A file without headers](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/cooccurrences-computer-en/excel-2-en.png)

![A file with headers](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/cooccurrences-computer-en/excel-1-en.png)

To describe the next screens of the plugin, we will take the example of *the Excel file just shown*, with headers.

### 3rd panel

![Which entities should be the nodes?](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/cooccurrences-computer-en/plugin-panels-1-en.png)

What does this panel mean?

If you look back at the Excel file, you see that we have "Clients" and their "Purchases".


-> This means we can build 2 different types of networks, depending on our needs:

1. A network showing clients and products, with relations representing purchases from a client to a product.



[graphviz, client-to-product, png]
```dot
graph g {
    rankdir="LR";
    client -- product [ label="purchased" ]
}
```


To create this kind of networks, choose "Client" in the upper window, and "Purchases" in the lower window of the plugin screen.


1. Or a network where 2 products are connected, if one client puchased them together.


[graphviz, product-to-product, png]
```
graph g {
    rankdir="LR";
    a -- b [label=" purchased together"]
     a [label="product 1"];
     b [label="product 2"];
}
```


To create this kind of networks, choose "Purchases" in the upper [underline] *and* lower windows of the plugin screen.

### 4th panel

![Choosing which delimiter is used](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/cooccurrences-computer-en/subfield-delimiter-en.png)

This 3rd panel asks: in our Excel file, how are different items separated in a given cell?
In our example, we have used commas: the lists of products purchased are comma-separated:

![Commas shown in red](https://docs.google.com/drawings/d/1tRw85HuODUSCD7e48UX_F7fUB5XWGJ7hVzNFnr6oWQI/pub?w=656&h=377)

### 5th panel

This panel allows you to specify whether the relations are dynamic in time, or not.

In this case, you need an extra column (column C), where a date is shown. We don't cover this case here.

(read the tutorials on dynamic networks for a starter)

### 6th panel

![Options panel](/docs/05_Community_Tutorials/03_Learn_how_to_use_plugins_for_Gephi/cooccurrences-computer-en/panel-6-1-en.png)

 "Create links between Purchases agents and links between Purchase agents"

-> If you chose a Product <--> Product kind of network in panel 3, then of course you are interested in links between products. *Check the box*.


-> But if you chose a Client <--> Product kind of network  in panel 3, what you need is less obvious.

Let's take the example of client I, who purchased a table and some chairs:

1. Checking the box will create a network where:


[graphviz, inner-links-included, png]
```
graph g {
    rankdir="LR";
    a -- b [label=" purchased"]
    a -- c [label=" purchased"]
    b -- c [label=" co-purchased"]

     a [label="client I"];
     b [label="table"];
     c [label="chairs"];

}
```


1. *Not* checking the box will create a network where:


[graphviz, inner-links-excluded, png]
```
graph g {
    rankdir="LR";
    a -- b [label=" purchased"]
    a -- c [label=" purchased"]

     a [label="client I"];
     b [label="table"];
     c [label="chairs"];

}
```


 "Remove duplicates"

-> Check this option if your Excel or csv file has duplicate rows that you'd like to be removed


 "Remove self-loops"

If a Client has purchased tables twice, so that we have "table, table" in a cell: this would create a link from table to table (a *self loop*).

-> Check this option if you'd like self loops to be removed.

### 7th panel

This panel recaps all the settings. Click on finish to create the network.
