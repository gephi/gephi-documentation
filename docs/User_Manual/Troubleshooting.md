---
id: troubleshooting
title: Troubleshooting
sidebar_position: 1
tags:
  - Troubleshooting
  - Startup
---
## Memory issues

Memory available to Gephi is determined by Java. Less or more memory can be allocated by configuring Gephi's startup settings. If too little memory is allocated, Gephi will stop running when it reached the limit and you will loose your current work. If too much memory is set, Java will not be able to start and return **JVM Creation failed** message. By default, maximum memory is set to 256mo or 512mo.

To modify memory settings, you need to edit Gephi settings file. Modify the value after the `-Xmx` option to change the maximum heap space. For example, to use a heap size between 256 and 1024 MB, change the options to `-Xms256m` and `-Xmx1024m`. If you have Gephi open, you must close and reopen Gephi before new options take effect. On computers with 2GB of memory, you can set `-Xmx1400` to get maximum performance.

### How to edit gephi.conf:

- On **Windows**, go to the Gephi folder in Start menu and click on Startup Settings. Edit this file with Notepad or WordPad. Alternatively, go to `C:\Program Files\Gephi\etc\gephi.conf` and edit file manually.
- On **Mac OS X**, right-click on Gephi application icon and select Show Package Contents to open a new Finder window displaying a Contents folder. Open the Contents folder, and then open the `Resources/gephi/etc` folder, in which the gephi.conf file resides. Use TextEdit to edit the file.
- On **Linux**, go into your application directory and then into the `etc` folder. Edit the file with a text editor.

**To use Gephi with more than ~1.5GB of memory, which could happen with very large graphs, you need to use A 64-bit version of Java. See following section.**

### 64-bit

Gephi has been successfully tested on 64-bit architecture (AMD64, Intel Core 2 Duo, Intel Core i7), 64 bits OS (Windows Vista 64-bit, Windows 7 64-bit) and 64-bit version of Java (JVM 64-Bit Server). To use more than ~1.5GB of memory in Gephi, which could happen with very large graphs, you need to have a 64-bit architecture, OS and a 64-bit JVM. A compatible 64-bit JRE or JDK can be downloaded from Java website.

When multiple JRE or JDK are installed on the same machine, you can specify to Gephi to use a particular path. Edit `gephi.conf` as described in the upper section, uncomment the jdkhome line and set the JRE or JDK path.

## Where are user files?

Locate and delete gephi user directory to clean your installation.

On Windows 2K/XP, user directory is located in

`C:\Documents and Settings\username\Application Data\.gephi`

On Windows Vista/Seven, user directory is located in

`C:\Users\username\AppData\Roaming\.gephi`  
(the logs files are under  `C:\Users\username\AppData\Roaming\.gephi\{gephiVersion}\dev\var\log\messages.log`

On Mac OS X, user directory is located in

`/Users/username/Library/Application\ Support/gephi`

On Linux, user directory is located in

`/home/username/.gephi`



## Linux issues

### Select Sun JRE on Ubuntu

After installing the Sun Java package, remember to run in command line:

```sh
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

In both cases select the option that has a path with java-6-sun in it.

### Improve text rendering

Add the following JVM parameter in the Gephi configuration file:

``-J-Dawt.useSystemAAFontSettings=on``

Or add it to your environment variables:

``export _JAVA_OPTIONS="-Dawt.useSystemAAFontSettings=on"``

## Mac OS X issues

### Improve text rendering

Add the following JVM parameter in the Gephi configuration file:

``-J-Dapple.awt.graphics.UseQuartz=true``

## Windows issues

### Gephi not using Graphical Card on Laptop

*The troubleshooting explained is for Intel + Nvidia based laptop, note that the process is still relevant for AMD based laptop, just the tools involved might be different*

If you have a laptop that has a dedicated graphical card (Nvidia), it's very probable that the laptop has also  integrated card (Intel(R) UHD Graphics).

Windows might probably, by default, wont' give Gephi the ability to use the dedicated graphical card, which will result in degraded performance for visualisation.

To check that Gephi has or not get granted to use the correct graphical card :

* Open Gephi
* On the top bar, go to **Tools -> Options**, a window will open
* On the tab go to **Visualisation** and then on the tab under **Open GL**

![image](/docs/User_Manual/Troubleshooting/Graphical_Card_Information.png)

On the right side of the windows, if you see something like `Nvidia Corporation` it means that Gephi is using the dedicated graphical card, all good.

If you see something like  `Intel UHD` it means Gephi is using the integrated graphical card. 


To change this and force Windows to let Gephi use the dedicated graphical card :

* Search for **Nvidia Control Panel** on your computer and open it.
* On left side, select **3D Settings -> Manage 3D settings**
* Then select the **Program settings** tab
* Click on **Add** and select **Gephi**
* Make sure the option **NVIDIA High Performance** is selected
* Click on **Apply**

![image](/docs/User_Manual/Troubleshooting/Nvidia_3D_Panel.png)

Then, restart Gephi. It should be now using the dedicated graphical card.