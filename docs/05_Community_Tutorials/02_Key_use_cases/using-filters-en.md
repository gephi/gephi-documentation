---
id: using-filters
title: Using Filter
last_update:
  author: Clément Levallois
sidebar_position: 2
description: Using Filter
tags:
  - Filter
---

download a network file for practice {#_download_a_network_file_for_practice}
====================================

[download this zip file](https://seinecle.github.io/gephi-tutorials/resources/miserables.zip) and unzip it on
your computer.

or use this direct link: [Here](https://tinyurl.com/gephi-tuto-3)

You should find the file `miserables.gexf` in it. Save it in a folder
you will remember (or create a folder specially for this small project).

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

![welcome screen](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/gephi-welcome-screen-open-graph-en.png)

A report window will open, giving you basic info on the network you
opened:

![report window](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/opening-file-report-en.png)

This tells you that the network comprises 74 characters, connected by
248 links.

Links are undirected, meaning that if A is connected to B, then it is
the same as B connected to A.

The report also tells us the graph is not dynamic: it means there is no
evolution or chronology, it won't \"move in time\".

Click on `OK` to see the graph in Gephi.

![The network we will use](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/result_miserables.png)

getting a sense of the attributes in the data laboratory {#_getting_a_sense_of_the_attributes_in_the_data_laboratory}
========================================================

We can switch to the data laboratory to see the underlying data:

![Switching to the data laboratory](https://docs.google.com/drawings/d/15SISc0_m4w99GUxZcbrln1183dRqBYNK0EpG2OOBbVU/pub?w=954&h=524)

We see that the nodes of the network have many attributes. In
particular, each have a Gender and a measure of how central they are:

![Nodes attributes.](https://docs.google.com/drawings/d/1O0NSM6ijhib5pKxCHKmSjffp3m7FuYaChLSCm35xChU/pub?w=954&h=525)

This is the list of edges (relations) in the network. Notice that they
have a \"weight\" (a \"strength\").

![align=\"center\"](https://docs.google.com/drawings/d/1y1SfMHZ3_4lOlI2t6WBC170T9HpVLXb_UYVLnVr_BWY/pub?w=954&h=524)

discovering the filter panel {#_discovering_the_filter_panel}
============================

In the overview, make sure the Filter panel is displayed:

![Making the Filter panel visible.](https://docs.google.com/drawings/d/1wyvNAmiHtyB1oegpKHAGvL8ZERChASzU-mWSQBWCeKE/pub?w=954&h=524)

How the Filter panel works:

![Workflow of filters](https://docs.google.com/drawings/d/1paf2P-xNCcTlW5CMN8FicrRcoF3sTKHCLrFbksVhCC4/pub?w=749&h=790)

An example: hiding edges with weight lower than 2

![How to use filters.](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-edge-weight-en.gif)

When you are finished using a filter in the zone, right click on it and
select \"remove\".

combining 2 filters {#_combining_2_filters}
===================

One filter is applied AFTER this other:

**The first filter to be applied is NESTED (placed inside) the second
one as a \"subfilter\"**

Which filter should be placed inside which? Let's look at different
examples:

1. Case when the placement of filters makes no difference {#_1_case_when_the_placement_of_filters_makes_no_difference}
---------------------------------------------------------

Goal: Keeping on screen only the female characters which have a tie (an
edge, a relation) of at least strength 2.

→ place the filter \"edge weight\" inside the filter \"Gender\":

![Filter on the Gender attribute](https://docs.google.com/drawings/d/1TixDBp9-RQTYHioDEV4gbo0BN6cWWzKt8fkXl9So3Ds/pub?w=886&h=462)

![Filter on edge weight](https://docs.google.com/drawings/d/1EtqSByLSNOrGCW3nvlrTW7Oci8IBYQP2koZB1v4XTu0/pub?w=1015&h=695)

![Keeping only female characters with at least 2 ties](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-edge-weight-gender-partition-en.gif)

In this case, it was equivalent to:

-   nest the \"Gender\" filter inside the \"Edge weight\" filter

or

-   nest the \"Edge weight\" filter inside the \"Gender\" Filter

→ The result was the same (the network on screen is identical in both
cases)

2. Case when the placement of filters makes a difference {#_2_case_when_the_placement_of_filters_makes_a_difference}
--------------------------------------------------------

Here, we want to visualize:

-   only the nodes which have **less than** 10 relations \<1\>

-   and among these, only those which form the \"main island\" of the
    network (we want to hide small detached groups of nodes) \<2\>

    -   in technical terms, nodes with a `degree` of less than 10.

    -   in technical terms, we are looking for the `giant component`

![Filter on degree](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-degree-range-1-en.png)

![Filter on giant component](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-giant-component-1-en.png)

We will see that the placement on the filters in the zone will make a
difference.

First, let us place the filter on giant component **inside** the filter
on degree:

![Filters in one configuration](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-order-1-en.png)

In this first case,

-   only the giant component of the network was made visible.

→ Since the network was just one big connected \"island\" to start with,
it did not change a thing.

-   then, all characters with more than 10 relations where hidden

→ this hides nodes which were connecting with many others, so that we
end up with many groups, disconnected from each others.

Now instead, placing the filter degree **inside** the filter on giant
component:

![Same filters in another configuration](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-order-2-en.png)

In this second case,

-   starting from the complete network, all characters with more than 10
    relations where deleted.

→ this created a network made of many disconnected groups of nodes

-   then the giant component filter is applied,

→ which had for effect to hide small groups, to keep in view only the
biggest group of connected nodes.

> **Warning**
>
> In summary: be careful how you apply several filters at once, this
> might have an effect on the logic of filtering.

filter operators {#_filter_operators}
================

1. The MASK operator {#_1_the_mask_operator}
--------------------

Imagine you are interested in the female characters of the novel \"Les
Miserables\".

-   you are interested in female characters and the relations among them

-   you are interested in the relations between female characters and
    male characters

-   you are **not** interested in the relations between male characters

How to display this?

The MASK operator applied on the gender partition filter enables you to:

-   show all characters

-   relations between female characters

-   *and relations between male and female characters*

-   *but masking male-male relations*

![Using the MASK operator](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/operator-mask-1-en.png)

It is also possible to hide / show only some of the directed relations
between the visible graph and the filtered out graph:

![Parameters of the MASK operator](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/operator-mask-2-en.png)

2. The UNION operator {#_2_the_union_operator}
---------------------

Imagine you are interested in the characters with names starting with
\"L\" or \"J\" in \"Les Miserables\".

How to display only these characters?

We will need to apply filters on the `Label` of the nodes, which
contains the names of the characters.

However, looking at the \"catalogue\" of filters, we see no filter on
`Label`. The reason is that `Label` is an internal property of nodes,
inaccessible to filters.

So we must first copy the Labels of the nodes in a new attribute, which
we will be able to apply a filter on.

Let's switch to the data laboratory and add this attribute:

![Adding a column for Names](https://docs.google.com/drawings/d/1j3B2ahLGqEYBGDqDyBcVOj8-Xp1oJGER8AnIudCvuZM/pub?w=1136&h=646)

![Copying to this new column](https://docs.google.com/drawings/d/1zYQs7U_Vlf8KfZcI4Btr0fo1JgQcrLjrkx5a8Jt_eV4/pub?w=1136&h=646)

We now have an attribute called \"Name\" that we can find in the
Filters:

![New filter available](https://docs.google.com/drawings/d/17zSqYMEEe5K34mWssyWpPRbRffX42U5eHjY5vvtfMuc/pub?w=1031&h=627)

This is how the filter on Name and its parameters look like in the zone:

![Name Filter](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-name-1-en.png)

To recall, we want to show only the characters which name start with
\"L\" or \"J\". Let's start with the \"L\" characters.

We need to find the names which match the pattern **`Start with an L`**.
The way to describe a pattern in text is called a \"regular
expression\".

Said differently, *a regular expressions (also called \"regex\") is a
convenient way to express a pattern we search for in a text*.

Regular expressions can become very sophisticated. But here, we need
just a simple one:

``` {.regex}
L.*
```

Let's examine what the L, the dot and the star mean.

-   the letter \"L\" means we want names starting with this first letter

-   . the dot means: any character

-   \* the star means: the previous character, repeated any time.

So: \"select nodes which have a name starting with L, followed by any
character, in any number\"

Please note that you need to check the box \"regex\":

![Using a regular expression in a filter](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-name-2-en.png)

When the filter is applied, only the characters wit a name starting with
L will be displayed:

![Using a regular expression in a filter](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-name-3-en.png)

How to filter characters with a name starting with the letter \"L\" or
\"J\"?

We could rely on a more complex regular expression to do this:

``` {.regex}
[LJ].*
```

Meaning: \"select nodes which have a name starting with L or J, followed
by any characters\"

But we can also rely on 2 filters: one for L, one for J. Nesting one
inside another would not work, it would mean:

\"show nodes which start with an L, and among them, only those which
start with a J\"

→ no node can meet this condition, so they would all be invisible.

Instead, we should use the **`UNION`** operator that can be found here:

![The UNION operator in filters](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-operator-union-1-en.png)

Drag it to the zone, and then drag inside it twice the
`Attributes -> Equal -> Name` filter:

![The UNION operator and 2 subfilters](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-operator-union-2-en.png)

In the settings of the first Name filter, put the regular expression:

``` {.regex}
L.*
```

In the second Name filter, put:

``` {.regex}
J.*
```

(make sure the \"regex\" box is checked in both cases)

As a result, the nodes selected by both filters are added up in the
display:

![The UNION operator and 2 subfilters](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-operator-union-3-en.png)

3. The NOT operator {#_3_the_not_operator}
-------------------

The NOT operator flips the result of a filter: what was hidden becomes
visible and vice and versa.

Example: if we want to display all characters except for those returned
by a UNION on 2 Name filters on L and J initials:

![The NOT nodes operator - 1](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-operator-not-3-en.png)

Same effect, but applying the NOT operator on single filter using a
regex on L or J:

![The NOT nodes operator - 2](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-operator-not-1-en.png)

Same effect again, achieved without using the NOT operator. In regular
expressions the \^ sign inside square brackets means \"NOT\":

``` {.regex}
[^LJ].*
```

![Achieving a NOT effect with regex](/docs/05_Community_Tutorials/02_Key_use_cases/using-filters-en/filter-operator-not-2-en.png)

Tutorials about regular expressions:

-   [https://regexone.com/](http://www.regular-expressions.info/quickstart.html)

-   [](http://www.themacroscope.org/?page_id=643)

And a web page where you can test your regular expressions:
[](http://regexpal.com)

more tutorials on using filters in Gephi {#_more_tutorials_on_using_filters_in_gephi}
========================================

-   [Video on using filters by Jen Golbeck](https://www.youtube.com/watch?v=UrrWA_t1rjc)


[^1]: D. E. Knuth, The Stanford GraphBase: A Platform for Combinatorial
    Computing, Addison-Wesley, Reading, MA (1993)
