---
id: Generator
title: Generator
sidebar_position: 9
---

A generator creates a synthetic graph from parameters. Like an importer, it writes drafts into a `ContainerLoader`; Gephi validates and processes the container into a workspace. This is preferable to modifying the current `Graph` directly because it uses the normal import pipeline.

Add `io-generator-api`, `io-importer-api`, `utils-longtask`, and `org-openide-util-lookup`.

## Implement and register the generator

Unlike several other extension points, `Generator` is registered directly:

```java
@ServiceProvider(service = Generator.class)
public final class PathGenerator implements Generator {
    private int nodeCount = 100;
    private volatile boolean cancelled;
    private ProgressTicket progressTicket;
    private final GeneratorUI ui = new PathGeneratorUI();

    @Override public String getName() { return "Path graph"; }
    @Override public GeneratorUI getUI() { return ui; }

    @Override
    public void generate(ContainerLoader container) {
        Progress.start(progressTicket, nodeCount);
        NodeDraft previous = null;
        try {
            for (int i = 0; i < nodeCount && !cancelled; i++) {
                NodeDraft node = container.factory().newNodeDraft("n" + i);
                node.setLabel("Node " + i);
                container.addNode(node);

                if (previous != null) {
                    EdgeDraft edge = container.factory().newEdgeDraft("e" + i);
                    edge.setSource(previous);
                    edge.setTarget(node);
                    container.addEdge(edge);
                }
                previous = node;
                Progress.progress(progressTicket);
            }
        } finally {
            Progress.finish(progressTicket);
        }
    }

    @Override public boolean cancel() { cancelled = true; return true; }
    @Override public void setProgressTicket(ProgressTicket ticket) {
        progressTicket = ticket;
    }

    public int getNodeCount() { return nodeCount; }
    public void setNodeCount(int value) {
        if (value < 1 || value > 1_000_000) {
            throw new IllegalArgumentException("Node count is out of range");
        }
        nodeCount = value;
    }
}
```

Gephi's generator controller already runs generation through long-task infrastructure. Check cancellation inside the loop and finish progress in `finally`. Give generated elements stable, unique IDs when reproducibility or later lookup matters.

## Configure parameters

`GeneratorUI` is owned by the generator and copies values between the algorithm and a Swing panel:

```java
public final class PathGeneratorUI implements GeneratorUI {
    private PathGenerator generator;
    private JSpinner count;

    @Override
    public void setup(Generator value) {
        generator = (PathGenerator) value;
    }

    @Override
    public JPanel getPanel() {
        count = new JSpinner(new SpinnerNumberModel(
            generator.getNodeCount(), 1, 1_000_000, 1));
        JPanel panel = new JPanel();
        panel.add(new JLabel("Nodes:"));
        panel.add(count);
        return panel;
    }

    @Override
    public void unsetup() {
        generator.setNodeCount((Integer) count.getValue());
        generator = null;
        count = null;
    }
}
```

Use a validation panel when parameters depend on one another. Validate again in setters because a generator can be called without the desktop UI.

## Random and streaming generation

For random graphs, offer an optional seed and use one `java.util.Random`/`SplittableRandom` instance. Put the chosen seed in graph metadata or the report so a result can be reproduced.

A “streaming generator” from older examples may start its own indefinite thread. Treat that as a different product design in 0.11.2: define ownership, cancellation, rate limiting, workspace changes, and shutdown before starting any thread. Prefer bounded generation. If ongoing external data is the real requirement, consider an importer or dedicated controller with a visible connection lifecycle.

## Generator checklist

- Parameters have sensible bounds and deterministic defaults.
- Estimated node/edge counts are checked before allocating large structures.
- Cancellation leaves a valid container and stops promptly.
- Direction, weights, attributes, self-loops, and parallel-edge rules are explicit.
- A random seed can reproduce stochastic output.
- Tiny known cases and parameter boundaries have unit tests.

See Gephi 0.11.2's [GeneratorPlugin](https://github.com/gephi/gephi/tree/v0.11.2/modules/GeneratorPlugin) for production generators.
