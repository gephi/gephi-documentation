---
id: Troubleshooting
title: Troubleshooting
sidebar_position: 1
tags:
  - Troubleshooting
  - Startup
---
## Do I need to install Java?

No, since [Gephi 0.9.3](https://gephi.wordpress.com/2022/04/10/gephi-0-9-3/), Java is bundled with the application, so you don't need to install Java separately.

## Memory issues

The computer memory available to Gephi is automatically determined, based on the amount of physical memory (RAM) installed on your computer.

The threshold is conservative by design, to make sure Gephi doesn't use too much memory and slow down your computer. However, this can be overridden. That way, you can allocate more memory to Gephi if you have a lot of RAM installed on your computer.

By default, Gephi will detect itself that it's running out of memory and will propose to set the setting manually for you:
![image](/docs/User_Manual/Troubleshooting/Memory_Modal_Manual_Config.png). 

That, will however require a restart of Gephi.

Not recommended, but you can manually edit the configuration file to set the memory limit:

- On **Windows**, go to the Gephi folder in Start menu and click on Startup Settings. Edit this file with Notepad or WordPad. Alternatively, go to `C:\Program Files\Gephi\etc\gephi.conf` and edit file manually.
- On **Mac OS X**, right-click on Gephi application icon and select Show Package Contents to open a new Finder window displaying a Contents folder. Open the Contents folder, and then open the `Resources/gephi/etc` folder, in which the gephi.conf file resides. Use TextEdit to edit the file.
- On **Linux**, go into your application directory and then into the `etc` folder. Edit the file with a text editor.

## Where are user files?

To completely clean up your installation, you may want to delete the user directory. This will remove all settings, plugins and recent files.

On Windows, user directory is located in

`C:\Users\username\AppData\Roaming\.gephi`

On Mac OS X, user directory is located in

`/Users/username/Library/Application\ Support/gephi`

On Linux, user directory is located in

`/home/username/.gephi`

## Windows issues

### Gephi not using Graphical Card on Laptop

*The troubleshooting explained is for Intel + Nvidia based laptop, note that the process is still relevant for AMD based laptop, just the tools involved might be different*

If you have a laptop that has a dedicated graphical card (Nvidia), it's very probable that the laptop has also  integrated card (Intel(R) UHD Graphics).

Windows might probably, by default, won't give Gephi the ability to use the dedicated graphical card, which will result in degraded performance for visualisation.

To check that Gephi has or not get granted to use the correct graphical card :

* Open Gephi
* On the top bar, go to **Tools -> Options**, a window will open
* On the tab go to **Visualisation** and then on the tab under **Open GL**

On the right side of the windows, if you see something like `Nvidia Corporation` it means that Gephi is using the dedicated graphical card, all good.

If you see something like  `Intel UHD` it means Gephi is using the integrated graphical card. 

To change this and force Windows to let Gephi use the dedicated graphical card :

* Search for **Nvidia Control Panel** on your computer and open it.
* On left side, select **3D Settings -> Manage 3D settings**
* Then select the **Program settings** tab
* Click on **Add** and select **Gephi**
* Make sure the option **NVIDIA High Performance** is selected
* Click on **Apply**

Then, restart Gephi. It should be now using the dedicated graphical card.