---
id: gsoc
title: GSoC
---

This document compiles official Gephi Google Summer of Code 2013 proposals. You can propose other ideas by going on the forum and start the discussion.

The GSoC timeline can be found at: http://www.google-melange.com/gsoc/events/google/gsoc2013

## Official proposals

### GraphStore benchmark and tuning

This idea proposes to optimize and tune GraphStore based on a serie of new well-defined benchmarks.

* Difficulty: Medium
* Required skills: Java, Data Structures, Profiling
* Assigned Mentor: Mathieu Bastian

GraphStore is a work-in-progress redesign of Gephi core graph structure. Our aim is to design an efficient, yet simple and powerful in-memory graph structure. The graph structure is the core of the software and need to be very fast and compact in memory. As we're making progress on the code we need to evaluate the impact on performance and memory usage. Therefore, we need a set of well-defined benchmarks to test how quick operations (ex: adding nodes, iterating over the edges...) are and detect possible bottlenecks. Based on the benchmarks learning, the student will optimize the code and implement more efficient solution where it matters the most.
The following benchmarks should be developed:

* Memory usage for different types of graphs and features. Different types of graphs and different size should be tested and compared.
* CPU speed to most common operations: iterations, adding and deletion nodes, updating attributes. Measures could be combined in throughput charts where the X axis is the number of elements in the graph and Y the time.
* Impact on memory usage for important features like graph observation, views and dynamic attributes.

#### A roadmap proposal

* Define the benchmarks specification in details and compare to other graph-related benchmarks.
* Learn how to write good Java benchmarking code and set up the framework.
* Implement the benchmark and test it against GraphStore.
* Draw conclusions and requirements from the analysis of the data.
* Implement a few key optimizations in the code and compare results.
* Format and present the benchmarks on the project web page so others can see the work and reproduce the results.

#### Resources

* Announcement on the blog. [link](https://blog.gephi.org/2013/rebuilding-gephis-core-for-the-0-9-version/).
* Work in progress graphdb-benchmark. [link](https://code.google.com/p/graphdb-bench/).

## Completing Legend module

This idea proposes to complete the Legend module, which was started in last year GSoC.

* Difficulty: Medium
* Required skills: Java, Swing, Processing/Java2D
* Recommended skills: API design fundamentals, Gephi Preview API knowledge, Netbeans RCP
* Assigned Mentor: Eduardo Ramos

Legends are complementary graphics, text and images that add extra information, describe or help to understand the graph. This module aims at offering support for standard, easy to use and appealing legends that integrate well with the Preview module in Gephi.

The Legend module is an already started project with some level of completion, but requires extra work and maturity before being included in Gephi. The current module implementation already covers the basic legends models and their rendering. It's based on a generic Legend API for making the creation of base legends and the possibility of plugin legends as short as possible while including common utilities and tools for them. Some of the features that this API covers are:

* Abstraction for drawing legends for Processing, PDF and SVG
* UI for managing Legends
* Common properties for all legends such as a title, background, borders and bounds
* Legends storage in Gephi projects
* Mouse interaction (select move and resize) with legends in Preview canvas

The studend should focus on making the Legend module more mature, stable and ready to release. The parts that specially need improvement are:

* **Improved UI** - A new UI for managing legends is required. The current UI utilizes Netbeans Nodes API (like Preview) for all properties of the legends. Due to the fact that all legends contain a big set of common properties and other specific properties for each type of legend, the UI is not as clear and usable as it should be. Ideas for the new UI are separating these properties, including an example of each legend (with sample image) and an explanation of the legend.
* **Revised Legend API** - The API needs to enable developers to create legends as powerful as possible while staying small and simple. Documentation for it is also necessary
* **Rewrite legends serialization** - The current XML serialization can be simplified and made more generic. Unit testing this part would be useful
* Making default aspect of existing legends more appealing
* Extend interaction possibilities with legends

Other interesting possibilities are:
* New legends that the student suggests
* Integration with other parts of Gephi like Statistics or data available in Data Laboratory

#### Resources

* Diseasome poster as an example of the basic desired legends. [link](http://diseasome.eu/poster.html).
* Blog post about the project progress. [link](https://blog.gephi.org/2012/gsoc-legend-module).
* Gephi branch with Legend module code. [link](https://github.com/edubecks/gephi).
* Forum thread about Legend module. [link](http://forum.gephi.org/viewtopic.php?t=1774).
* Ready to try Legend project build. [link](https://dl.dropbox.com/u/916968/Gephi/legend-20121111.zip).
