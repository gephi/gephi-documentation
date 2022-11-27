---
id: Add_a_submenu
title: Add a submenu
sidebar_position: 13
---

From a plugin it is easy to add a menu in the menubar, for instance in **Plugins**. If you wanna add your action in a already existing menu, like **Generate**, don't follow this HowTo but look more how to create a new Generator, as the submenus may be created dynamically. 

## Create Action and Menu

- **Step 1**: Right click on your module and select **New > Other...** and find **Action** like showed in the step 1 below. The action wizard will create everything necessary to register your action in the system and create the submenu.

![addsubmenu-new-action](/docs/Plugins/Add_a_submenu/00_addsubmenu-new-action.png)

- **Step 2**: Then click on **Next**, be sure **Always Enabled** is checked and **Next** again.
- **Step 3**: In the **Menu** option, select where you want your submenu to be put. Select **Plugins** to be put in this menu.

![addsubmenu-new-action-gui](/docs/Plugins/Add_a_submenu/01_addsubmenu-new-action-gui.png)

- **Step 4**: Click on **Next** and fill the class name, as well as the display name.

![addsubmenu-new-action-name](/docs/Plugins/Add_a_submenu/02_addsubmenu-new-action-name.png)

- **Step 5**: Finally, click on **Next** to create the file.

![addsubmenu-new-action-result](/docs/Plugins/Add_a_submenu/03_addsubmenu-new-action-result.png)

*Result*

## Fill Action

The precedent step created the **MyAction.java** file in your module. Implement something in the action to be executed when users click on the menu. In the example below an empty dialog is showed, using **Dialogs API**. Include **Dialogs API** as a dependency of your module if you want to use it.

```java
public final class MyAction implements ActionListener {
 
   public void actionPerformed(ActionEvent e) {
      //Do something - for instance display a dialog
      DialogDescriptor dd = new DialogDescriptor(new JPanel(), "My Dialog", false, null);
      DialogDisplayer.getDefault().notify(dd);
   }
}
```