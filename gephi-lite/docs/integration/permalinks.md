---
title: Integrate using permalinks
sidebar_position: 3
---

Gephi-Lite lets you create special web links (permalinks) that open and display a graph directly in the browser.  

This is useful if you want to share a specific graph with others or embed it in documentation.


## Using file query parameter

To automatically load a graph, add the query parameter `file` followed by the URL of your graph file.  

**Format:** https://lite.gephi.org/?file=URL_TO_YOUR_GRAPH

Here’s a sample link that opens the classic *Les Misérables* dataset: 

https://lite.gephi.org/?file=https://raw.githubusercontent.com/gephi/gephi-lite/refs/heads/main/packages/gephi-lite/public/samples/Les%20Miserables.gexf

Click the link and you’ll see the graph load automatically.

## Supported file formats

You can provide different types of graph files:

- Gephi-Lite `.json`
- `.gexf`
- `.graphml`

## Make sure your file is accessible

The file you link must be **publicly accessible** and allow loading from another domain.  
That means [CORS (Cross-Origin Resource Sharing)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) must be enabled.


✅ That’s it! Now you can create permalinks that open graphs directly in Gephi-Lite.