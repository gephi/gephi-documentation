---
id: generator
title: Generator
---

This HowTo shows how to create a new graph generator in Gephi.

Please look at [[Plugin Quick Start]] to know how to create a new Netbeans Module. When you have your plugin module, that we will call *MyGenerator*, you can start this tutorial.

## Create a new Generator

### Set Dependencies

Add `Lookup`, `GraphAPI` and `LongTaskAPI` modules as dependencies for your plugin module *MyGenerator*. See [[How To Set Module Dependencies]].

### Create Generator

* Create a new class that implements [Generator](https://gephi.org/docs/api/org/gephi/io/generator/spi/Generator.html). This is the place the code belongs.
* Fill getName() method by returning a display name like "My Generator". Fill `getUI()` method by returning `null`. Leaves other methods untouched for the moment.
* Add `@ServiceProvider` annotation to your builder class. Add the following line before *MyGenerator* class definition, as shown below:

```java
@ServiceProvider(service = Generator.class)
public class MyGenerator implements Generator {
...
```

### Generate the graph

Fill `generate()` method by creating `NodeDraft` and `EdgeDraft` elements to add to the `ContainerLoader`.

### Set LongTask

To let your graph creation task be canceled and its progress watched, implement `LongTask` interface on *MyGenerator*.
Add two fields:

private boolean cancel = false;
private ProgressTicket progressTicket;

and implement new methods:

```java
public boolean cancel() {
    cancel = true;
    return true;
}
 
public void setProgressTicket(ProgressTicket progressTicket) {
    this.progressTicket = progressTicket;
}
```

Use the `cancel` field to terminate your algorithm execution properly and return from `generate()`.

### Sample

```java
@ServiceProvider(service = Generator.class)
public class HelloWorld implements Generator {
 
    protected ProgressTicket progress;
    protected boolean cancel = false;
 
    public void generate(ContainerLoader container) {
        // create nodes
        NodeDraft n1 = container.factory().newNodeDraft();
        NodeDraft n2 = container.factory().newNodeDraft();
 
        // set node labels
        n1.setLabel("Hello");
        n2.setLabel("World");
 
        // create edge
        EdgeDraft e = container.factory().newEdgeDraft();
        e.setSource(n1);
        e.setTarget(n2);
 
        // fill in the graph
        container.addNode(n1);
        container.addNode(n2);
        container.addEdge(e);
    }
 
    public String getName() {
        return "Hello World";
    }
 
    public GeneratorUI getUI() {
        return null;
    }
 
    public boolean cancel() {
        cancel = true;
        return true;
    }
 
    public void setProgressTicket(ProgressTicket progressTicket) {
        this.progress = progressTicket;
    }
}
```