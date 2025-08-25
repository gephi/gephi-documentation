---
title: Differences with Gephi
sidebar_position: 2
---

## What makes Gephi Lite _light_?

When the Gephi team decided to launch a new web "spinoff" of Gephi based on [various previous and existing experiences](https://archive.fosdem.org/2024/schedule/event/fosdem-2024-3253-bridging-research-and-open-source-the-genesis-of-gephi-lite/), we decided against calling it "Gephi Web", because:

- The user interface would not be the exact same (in a good way, because web technologies are better than the current Java Gephi stack for user interfaces development)
- It would not handle the same scales, not even closely (in a bad way, because this time, JavaScript as way less control on memory, CPU and GPU usage than Java)
- The features would probably not even be the exact same

We decided to go for **Gephi Lite**, meaning:

- It would be **lighter** in terms of features, and would target less expert users
- It would have a **lighter** user interface, with less information and noise
- It would handle **lighter** graphs

## Dynamic graph appearance

One core difference between Gephi and Gephi Lite is that Gephi Lite handles the graph appearance **dynamically**, rather than statically.

The reason of this is that we wanted to have captions in Gephi Lite from day one, and for this, we need to keep track of why are nodes and edges rendered the way they are.

### Gephi behaves like Photoshop

In Gephi, when users colorize nodes for instance, it changes the colors the stored color value of each node in the data model, and does not try to remember why. This makes it very easy for users to do exactly what the want (like "I want this specific node to be red" or "I have a very expert use case, where nodes are not colored the same way according to their type" for instance).

The main tradeoff is that Gephi can't "explain" why nodes and edges are rendered the way they are, so there can't be any caption.

### Gephi Lite behaves like Excel

In Gephi Lite, when users update nodes colors from the _Appearance_ panel, it updates the nodes coloring rules in the data model. Then, any time anything changes in the graph data, the nodes are dynamically colored, before the graph is rendered to the stage.

#### **Advantages**

This allows basically two main things:

1. Gephi Lite has a **dynamic caption**
2. When using **dynamic attributes** (like node degrees for sizes), when they become updated (because of data updates of filters modifications), the graph appearance is **instantly impacted**

#### **Main cost**

Users can only modify nodes and edges appearance in a way that Gephi Lite can **explain** through its caption.

There is a way out of this system, though: It is possible to directly use a **data column** for a given **visual variable**. That is exactly what happens by default when a GEXF from Gephi is loaded, for instance:

- There is a node attribute, named `color`, of type "color", containing color strings, that are used to color nodes;
- There is a node attribute, named `size`, of type "number", containing positive numbers, that are used for nodes sizes;
- etc...

## The graph algorithms are not the same

Gephi Lite has been made possible by two JavaScript libraries written by people close to Gephi:

- [sigma.js](https://www.sigmajs.org/), a WebGL-based graph rendering engine
- [graphology](https://graphology.github.io/), a JavaScript graph model

Graphology has been written by [Guillaume Plique](https://yomguithereal.github.io/), partly to enable JavaScript client application and server scripts, to **analyze networks** for social sciences. To do this, he implemented [various graph algorithms](https://graphology.github.io/standard-library/), including many that are already inside Gephi.

But some algorithms can exist in Gephi and not in graphology, and some algorithms implemented in graphology can be missing in Gephi too. That explains why the lists of available algorithms can differ between Gephi and Gephi Lite.

## Additional features

Since Gephi Lite is a web application, that enabled various feature opportunities, some of which are already implemented. Here are some features that Gephi Lite offer, that you cannot find in Gephi:

### Cloud-like behavior with GitHub

This feature allows connecting to GitHub from Gephi Lite, and save and load graphs as [GitHub Gists](https://gist.github.com/). Please read the [dedicated documentation page](./github-auth.md) to know more.

### Node images

TODO

### Experimental features

TODO

### Captions

TODO

## Missing features

On the other side, some core features from Gephi are not implemented in Gephi Lite, either because we did not find a way to do it in a "lite-enough" way, or because we did not find the time yet.

### "Preview" tab

TODO

### SVG / PDF exports

TODO

### Timeline

TODO

### Plugins

TODO