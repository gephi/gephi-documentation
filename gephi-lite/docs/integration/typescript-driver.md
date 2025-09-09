---
title: Integrate using the TypeScript driver
sidebar_position: 4
---

It is possible to **control Gephi Lite** in a tab or an iframe **from another web page**. This feature uses the browser [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API).

:::info

The main constraint of the `BroadcastChannel` API is that both the controlling web page and the controlled Gephi Lite must be hosted on **the same domain**. Please read the [**Deploying Gephi Lite**](./deploying.md) documentation page to know more on how to host Gephi Lite on your servers.

:::

To ease communicating with Gephi Lite, you can use the [`@gephi/gephi-lite-broadcast`](https://www.npmjs.com/package/@gephi/gephi-lite-broadcast) NPM project from your TypeScript or JavaScript codebase. At the moment, this driver supports:

- Read or import a [Graphology](https://github.com/graphology/graphology/) graph
- Read or set the `SerializedGraphDataset` object (that fully describes the dataset)
- Read or set the `AppearanceState` object (that describes everything from the **Appearance** menus in Gephi Lite)
- Read or set the `FiltersState` object (that describes the filters)

## Example

The easiest way to dive into how to use the driver, is to look at how Gephi Lite itself uses it! Indeed, Gephi Lite offers users to clone their current workspace in a new tab, using the `@gephi/gephi-lite-broadcast` package. This allows duplicating a graph to compare two different appearance setups, for instance - or also "saving" a state before applying some destructive modifications...

So, let's see [how Gephi Lite uses the driver](https://github.com/gephi/gephi-lite/blob/main/packages/gephi-lite/src/core/broadcast/utils.ts):

```typescript
// This is the driver class, that allows all that:
import { GephiLiteDriver } from "@gephi/gephi-lite-broadcast";
// These are some internal Gephi Lite typings:
import { AppearanceState, FiltersState, GraphDataset } from "@gephi/gephi-lite-sdk";

export async function openInNewTab({
  dataset,
  appearance,
  filters,
}: { dataset: GraphDataset; appearance: AppearanceState; filters: FiltersState } = {}) {
  // 1. Instanciate GephiLiteDriver (no name is given, so a random UUID will be
  //    used instead):
  const driver = new GephiLiteDriver();

  // 2. Open a new Gephi Lite in a new tab, and wait for it to emit a
  //    "newInstance" on the proper channel:
  await new Promise<void>((resolve) => {
    driver.on("newInstance", () => {
      resolve();
    });
    driver.openGephiLite({
      baseUrl: location.pathname,
    });
  });

  // 3. Set graph data, appearance and filters in the new Gephi Lite instance:
  await Promise.all([driver.setAppearance(appearance), driver.setFilters(filters), driver.setGraphDataset(dataset)]);

  // 4. Now that everything went fine, just destroy the driver (and close the
  //    Broacast Channel listener on this side):
  driver.destroy();
}
```

:::note

The code has been slightly redacted from its original version:

- Some code related to the internal logic of Gephi Lite has been removed for simplicity
- Comments have been added to clarify what it does

:::

Then, this function is called in two different parts:

- For the `"Duplicate in a new tab"` feature
- For the [Louvain edges ambiguity representation](/user-manual/experimental#louvain-edges-ambiguity)

## How it works under the hood

:::info

This section is quite advanced, and is not necessary to use the driver. It's mostly here so that future maintainers can get more insights on what's going on in the codebase.

:::

### The `BroadcastChannel` API

So, basically, the `BroadcastChannel` allows for browser pages to broadcast messages on a "channel" (each channel being identified with a given string), that every other browser contexts opened in the same browser and on the same domain at the time can receive.

### What Gephi Lite does

When Gephi Lite starts, it checks if it has a `broadcast` query param (the channel name). If it has, it opens a `BroadcastChannel` on that channel name, and listens to all messages. It will react to [`GephiLiteMethodBroadcastMessage`](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L159-L171) messages, that basically contain:

- a method name
- arguments for that method
- an optional identifier (that will be used for responses)

When Gephi Lite receives such a message, it will execute the asked method, and, if an identifier is given, will broadcast the return of the method on the channel, in a [`ReplyMessage`](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L69-L72).

### What the driver does

The [`@gephi/gephi-lite-broadcast`](https://www.npmjs.com/package/@gephi/gephi-lite-broadcast) package is mostly some sugar to avoid having to write the messages by hand. Also, it waits for a reply from the related Gephi Lite instance before resolving some promise, which helps to know whether things went well, basically.

So, when some method from the driver is called, for instance `const graph = await driver.getGraph();`, here is what happens:

1. The driver calls [its internal method](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/driver.ts#L117): `this.callMethod<GetGraphMethod>("getGraph")` and returns a new result promise
2. It creates a unique `messageID` and emits a [`MethodBroadcastMessage`](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L74-L80), using `this.channel.postMessage({ ... })`
3. It then waits for a [`MethodReplyMessage`](http://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L81-L83) message from the Gephi Lite instance
4. If the reply comes, it resolves the result promise with the reply's payload
5. If it doesn't (after some `timeout`), it rejects the result promise with a timeout error

### Implementing a new method for the driver

There are still some missing methods from the Gephi Lite driver, unfortunately. Here is a quick guide (mostly for maintainers) on how to implement a new method:

1. A new "Method type", extending [`BaseMethod`](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L46-L50) must be added in [`broadcast/src/types.ts`](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L125-L128), and added to the [`GephiLiteMethod`](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L145) and [`GephiLiteMethodBroadcastMessage`](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/types.ts#L159) union types. This will determine the arguments and response types of the new method.
2. A new "shortcut method" must be added directly to the [`GephiLiteDriver` class](https://github.com/gephi/gephi-lite/blob/main/packages/broadcast/src/driver.ts#L103-L106). This will help TypeScript users discover this new method. It also can deal with serializing/deserializing inputs/outputs.
3. Finally, the actual code that tells Gephi Lite how it should handle these events must be added in the [`BROADCAST_METHODS` collection](https://github.com/gephi/gephi-lite/blob/main/packages/gephi-lite/src/core/broadcast/client.ts#L32-L37), under the `BaseMethod`'s name. Hopefully, at this point, the typings will ensure the inputs and outputs are properly handled.

Et voilà! That's all it takes to implement a new Gephi Lite driver method.
