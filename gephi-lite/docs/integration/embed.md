---
title: Embed using graph URL
sidebar_position: 3
---

The easiest way to integrate Gephi Lite in an existing web page is to embed it in a iframe. Moreover you can set the iframe to show one graph of your choice as long as you host it in a CORS enabled server. See the [Share Graph as URL documentation](../user-manual/share-graph-as-url.md) to learn more about Graph URL.

Setting up a Gephi Lite iframe is as simple as adding the right URL in a iframe tag:

```html
<iframe
  width="100%"
  height="600px"
  allowfullscreen="true"
  src="https://lite.gephi.org/?file=https://gist.githubusercontent.com/jacomyal/08b9cdd4c629f64c299eaa8b922bc37b/raw/a85f7bb53a6f6bb17cf3f5c0991142708f120146/arctic-shaded.json"
/>
```

This code rendered as:

<iframe width="100%" height="600px" allowfullscreen="true"  src="https://lite.gephi.org/?file=https://gist.githubusercontent.com/jacomyal/08b9cdd4c629f64c299eaa8b922bc37b/raw/a85f7bb53a6f6bb17cf3f5c0991142708f120146/arctic-shaded.json"/>

:::info

If you need a more complex interaction with an embed Gephi Lite than loading a graph file, you can also use the [TypeScript driver](./typescript-driver.md) with an iframe.

:::
