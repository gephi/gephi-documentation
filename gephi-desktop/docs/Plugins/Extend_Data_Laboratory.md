---
id: Extend_Data_Laboratory
title: Extend Data Laboratory
sidebar_position: 11
---

Data Laboratory **manipulators** add actions for selected nodes or edges, a cell value, a column, or the table as a whole. Implement one when introducing a new action into the Data Laboratory UI. When a plugin only needs to invoke an operation Data Laboratory already provides, use its public controllers instead.

Add `datalab-api`, `graph-api`, and `org-openide-util-lookup`. Add UI modules only when the implementation imports them.

## Use existing Data Laboratory operations

The controllers expose built-in operations and their capability checks. Ask whether an operation is valid before executing it:

```java
AttributeColumnsController columns = Lookup.getDefault()
    .lookup(AttributeColumnsController.class);

if (columns.canClearColumnData(column)) {
    columns.clearColumnData(table, column);
}

if (columns.canChangeColumnData(column)) {
    columns.fillColumnWithValue(table, column, "Unknown");
}

if (columns.canDeleteColumn(column)) {
    columns.deleteAttributeColumn(table, column);
}
```

`GraphElementsController` similarly exposes supported node and edge operations. Prefer these controllers to reimplementing built-in behavior: their capability checks preserve property-column restrictions and other Data Laboratory rules. Resolve the table, column, and controller for the current workspace when the operation begins. Use the manipulator SPIs below only when adding a new user-visible action.

## Choose a manipulator

| Context | SPI | Registration |
| --- | --- | --- |
| General toolbar action | `GeneralActionsManipulator` | Register the manipulator directly |
| Overflow **More actions** menu | `PluginGeneralActionsManipulator` | Register directly |
| Selected node rows | `NodesManipulator` | Register `NodesManipulatorBuilder` |
| Selected edge rows | `EdgesManipulator` | Register `EdgesManipulatorBuilder` |
| One cell | `AttributeValueManipulator` | Register its builder |
| One column | `AttributeColumnsManipulator` | Register directly |
| Merge columns/rows | Merge-strategy SPI | Register the matching builder |

Builders matter because Lookup services are singletons while node, edge, cell, and merge manipulators hold per-invocation context. The builder must return a new instance.

## A general action

This quick action is registered directly:

```java
@ServiceProvider(service = PluginGeneralActionsManipulator.class)
public final class RemoveSelfLoops implements PluginGeneralActionsManipulator {
    @Override
    public void execute() {
        GraphModel model = Lookup.getDefault()
            .lookup(GraphController.class)
            .getGraphModel();
        if (model == null) {
            return;
        }

        Graph graph = model.getGraph();
        graph.writeLock();
        try {
            for (Edge edge : graph.getSelfLoops().toArray()) {
                graph.removeEdge(edge);
            }
        } finally {
            graph.writeUnlock();
        }
    }

    @Override public String getName() { return "Remove self-loops"; }
    @Override public String getDescription() {
        return "Removes every self-loop from the complete graph.";
    }
    @Override public boolean canExecute() {
        GraphModel model = Lookup.getDefault()
            .lookup(GraphController.class).getGraphModel();
        return model != null && model.getGraph().getEdgeCount() > 0;
    }
    @Override public ManipulatorUI getUI() { return null; }
    @Override public int getType() { return 100; }
    @Override public int getPosition() { return 100; }
    @Override public Icon getIcon() { return null; }
}
```

The action states that it changes the complete graph. If this could be slow on the supported graph sizes, ask for confirmation/settings through a UI and run the mutation through the long-task pattern rather than blocking the EDT.

## A selected-nodes action

`setup` is called before context-dependent methods. Store only what the invocation needs:

```java
public final class SetNodesRed implements NodesManipulator {
    private Node[] nodes;

    @Override
    public void setup(Node[] selectedNodes, Node clickedNode) {
        nodes = selectedNodes.clone();
    }
    @Override public void execute() {
        for (Node node : nodes) {
            node.setColor(Color.RED);
        }
    }
    @Override public boolean canExecute() { return nodes != null && nodes.length > 0; }
    @Override public boolean isAvailable() { return true; }
    @Override public ContextMenuItemManipulator[] getSubItems() { return null; }
    @Override public Integer getMnemonicKey() { return null; }
    @Override public String getName() { return "Set color to red"; }
    @Override public String getDescription() { return "Colors the selected nodes red."; }
    @Override public ManipulatorUI getUI() { return null; }
    @Override public int getType() { return 100; }
    @Override public int getPosition() { return 100; }
    @Override public Icon getIcon() { return null; }
}
```

Register a factory, not this stateful class:

```java
@ServiceProvider(service = NodesManipulatorBuilder.class)
public final class SetNodesRedBuilder implements NodesManipulatorBuilder {
    @Override public NodesManipulator getNodesManipulator() {
        return new SetNodesRed();
    }
}
```

`getSubItems()` can create a submenu. If an item returns children, Gephi executes a child rather than the parent. Subitems receive the same selection context.

## Column actions

`AttributeColumnsManipulator` has a different lifecycle: eligibility and execution both receive the table and column.

```java
@ServiceProvider(service = AttributeColumnsManipulator.class)
public final class ClearStringColumn implements AttributeColumnsManipulator {
    @Override
    public boolean canManipulateColumn(Table table, Column column) {
        return String.class.equals(column.getTypeClass()) && !column.isProperty();
    }

    @Override
    public void execute(Table table, Column column) {
        Graph graph = table.getGraph();
        if (table.isNodeTable()) {
            for (Node node : graph.getNodes()) {
                node.setAttribute(column, null);
            }
        } else {
            for (Edge edge : graph.getEdges()) {
                edge.setAttribute(column, null);
            }
        }
    }

    @Override public AttributeColumnsManipulatorUI getUI(Table table, Column column) {
        return null;
    }
    @Override public String getName() { return "Clear text values"; }
    @Override public String getDescription() { return "Sets every value in this text column to null."; }
    @Override public int getType() { return 100; }
    @Override public int getPosition() { return 100; }
    @Override public Image getIcon() { return null; }
}
```

For destructive operations, provide a confirmation UI and describe the scope. Use `table.isNodeTable()`/`isEdgeTable()` rather than assuming which kind of row was supplied.

## Settings UI lifecycle

Most manipulators return a `ManipulatorUI`:

1. `setup(manipulator, dialogControls)` receives the operation and dialog controls.
2. `getSettingsPanel()` returns the Swing panel.
3. The user confirms or cancels.
4. `unSetup()` transfers validated values and clears references.

`isModal()` controls whether the dialog blocks other interaction. Use `DialogControls` to disable OK while values are invalid. The action itself must validate again.

## Ordering and availability

`getType()` groups related actions; `getPosition()` orders them within that group. Leave numerical gaps so future actions can be inserted. `canExecute()` determines whether the current prepared action can run; `isAvailable()` determines whether a context-menu item appears at all.

Do not make `getName()`, ordering, or icons depend on selection context unless the interface lifecycle guarantees `setup()` was called first.

## Data Laboratory checklist

- The action appears in the narrowest correct context.
- Stateful manipulators are created by builders, not registered as singletons.
- Selection arrays are copied if retained and not kept after execution.
- Destructive scope is named and confirmed.
- Graph/table changes use the appropriate locking and threading strategy.
- `canExecute()` handles no project, empty selection, and incompatible columns.
- UI references are released in `unSetup()`.

Use Gephi 0.11.2's [DataLaboratoryAPI](https://github.com/gephi/gephi/tree/v0.11.2/modules/DataLaboratoryAPI) for contracts and [DataLaboratoryPlugin](https://github.com/gephi/gephi/tree/v0.11.2/modules/DataLaboratoryPlugin) for current implementations.
