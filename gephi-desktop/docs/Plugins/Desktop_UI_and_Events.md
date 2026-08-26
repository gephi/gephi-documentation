---
id: Desktop_UI_and_Events
title: Desktop UI and events
sidebar_position: 4
---

Choose a desktop extension by how users should encounter it. A one-shot operation belongs in an action; direct graph-canvas interaction belongs in a tool; persistent controls or results belong in a `TopComponent`. Keep the calculation behind that UI in a separate class.

## Pick the right surface

| User interaction | Recommended mechanism |
| --- | --- |
| Click a menu or toolbar command | NetBeans Platform action annotations |
| Click or drag nodes in Overview | Gephi `Tool` and event-listener SPIs |
| Keep settings/results visible | NetBeans `TopComponent` |
| Act when a workspace changes | `WorkspaceListener` |
| Run once after the whole UI is ready | `ModuleInstall` plus `WindowManager.invokeWhenUIReady` |
| Change a Data Laboratory row, cell, or column | A Data Laboratory manipulator |

Do not create a full window for a command that needs no persistent state. Conversely, do not hide an interactive workflow behind a chain of modal dialogs.

## Add a menu action

NetBeans annotations generate registration metadata at compile time:

```java
@ActionID(category = "Tools", id = "org.example.plugin.CountNodesAction")
@ActionRegistration(displayName = "Count nodes")
@ActionReference(path = "Menu/Plugins", position = 100)
public final class CountNodesAction implements ActionListener {
    @Override
    public void actionPerformed(ActionEvent event) {
        GraphModel model = Lookup.getDefault()
            .lookup(GraphController.class)
            .getGraphModel();

        if (model == null) {
            DialogDisplayer.getDefault().notify(
                new NotifyDescriptor.Message("Open a workspace first."));
            return;
        }

        int count = model.getGraphVisible().getNodeCount();
        DialogDisplayer.getDefault().notify(
            new NotifyDescriptor.Message("Visible nodes: " + count));
    }
}
```

Add the NetBeans modules that own `org.openide.awt`, `org.openide.dialogs`, and `org.openide.util` packages. Use bundle keys for production display text. An action listener runs on the EDT: if the work is more than a quick lookup, launch a [long task](./Graph_API_and_Threads.md#keep-swing-responsive).

## Add a persistent window

A `TopComponent` is a dockable NetBeans window. The annotations below register it under **Window** and place it in an existing mode:

```java
@TopComponent.Description(
    preferredID = "MyResultsTopComponent",
    persistenceType = TopComponent.PERSISTENCE_ALWAYS
)
@TopComponent.Registration(mode = "filtersmode", openAtStartup = false)
@ActionID(category = "Window", id = "org.example.plugin.MyResultsTopComponent")
@ActionReference(path = "Menu/Window")
@TopComponent.OpenActionRegistration(
    displayName = "My results",
    preferredID = "MyResultsTopComponent"
)
public final class MyResultsTopComponent extends TopComponent {
    public MyResultsTopComponent() {
        setName("My results");
        setLayout(new BorderLayout());
        add(buildContent(), BorderLayout.CENTER);
    }
}
```

Treat the window as a view, not as the data model:

- Resolve the current workspace when Run is clicked or when a workspace event arrives.
- Store results with the workspace that produced them; clear stale results on `disable()` or `close()`.
- Start observers or timers in `componentOpened()` and destroy them in `componentClosed()`.
- Do not start a graph-wide scan in the constructor.
- Use `SwingUtilities.invokeLater` for UI updates arriving from other threads.

Generated `.form` files are optional. Hand-written Swing panels are often easier to review and merge; GUI-builder forms are useful for complex fixed layouts.

## Add a graph interaction tool

A tool appears in the Overview toolbar and can receive canvas or node events. Implement `org.gephi.tools.spi.Tool`, register it as a service, and provide a `ToolUI`:

```java
@ServiceProvider(service = Tool.class)
public final class InspectTool implements Tool {
    private final ToolUI ui = new InspectToolUI();

    @Override public void select() { }
    @Override public void unselect() { }

    @Override
    public ToolEventListener[] getListeners() {
        return new ToolEventListener[] {
            (NodeClickEventListener) nodes -> {
                inspect(nodes);
                return false;
            }
        };
    }

    @Override public ToolUI getUI() { return ui; }

    @Override
    public ToolSelectionType getSelectionType() {
        return ToolSelectionType.SELECTION;
    }
}
```

`ToolUI` supplies the name, description, icon, ordering position, and optional properties-bar panel. Event listeners should capture the event and return quickly. If inspection is expensive, copy stable node IDs and delegate the work; do not retain arbitrary node arrays indefinitely across graph changes.

Use public `ToolsAPI` and `VisualizationAPI` types. Older examples sometimes call internal visualization controllers directly; prefer public services in 0.11.2 so the plugin is not tied to an implementation.

## Capture lifecycle events

Use `WorkspaceListener` for project context; its complete pattern is shown in [Graph access and long tasks](./Graph_API_and_Threads.md#react-to-workspace-changes). Register it with `@ServiceProvider(service = WorkspaceListener.class)`.

For a single action after application startup, extend `ModuleInstall` and register the class in `manifest.mf`:

```text
OpenIDE-Module-Install: org/example/plugin/Installer.class
```

```java
public final class Installer extends ModuleInstall {
    @Override
    public void restored() {
        WindowManager.getDefault().invokeWhenUIReady(() -> {
            // Initialize UI integration only; do not perform heavy work here.
        });
    }
}
```

Startup hooks should be rare. Lazy initialization on first use makes Gephi start faster and avoids work for users who never open the plugin.

## Internationalization and accessibility

Place display text in `Bundle.properties` and retrieve it with `NbBundle`. Give controls accessible names and tooltips, associate each label with its input, preserve keyboard navigation, and never communicate state through color alone. User-visible errors should explain what happened and what the user can do next.

## UI review checklist

- The entry point is discoverable in the expected Gephi area.
- Controls are disabled when no workspace or valid selection exists.
- Run cannot be started twice; Cancel is available for long work.
- The window remains correct when users switch, close, or create workspaces.
- No internal implementation API is used where a public API exists.
- All listeners and workers have a clear owner and cleanup point.
- UI state is changed only on the EDT.
