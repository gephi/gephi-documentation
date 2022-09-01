---
id: plugin-quick-start
title: Plugin Quick Start
---

**THIS PAGE IS OUTDATED, PLEASE CHECK THE README AT https://github.com/gephi/gephi-plugins**

This HowTo covers how to get started with Gephi plugin development. Make sure you have [Git and GitHub](https://wiki.gephi.org/index.php/Install_Git_and_Set_Up_GitHub) set up before starting.

## Checkout the gephi-plugins code

We prepared an out of the box development environment on the gephi-plugins repository on GitHub. Once downloaded it doesn't need anything else to run a development version of Gephi.
Fork the project on GitHUb and clone the repository (replace username with your login):

``git clone git@github.com:username/gephi-plugins.git``

Now you can open the project in [Netbeans](http://netbeans.org/). Gephi development happens in Netbeans because Gephi is based on the awesome [Netbeans Platform](http://platform.netbeans.org/). The gephi-plugins folder is automatically recognized when opening a project in Netbeans. Right click on the project and select **Run** to start Gephi.

You can also run Gephi from the command-line using the `ant run` command.

## Create a plugin

1. In Netbeans, expand the **Gephi Plugins** project and right-click on Modules. Select **Add New...**
- Enter the plugin name: *MyFirstPlugin* and click **Next**.
- In the next panel, enter a unique codebase name, for instance *org.myname.myfirstplugin* and click **Finish**.
- In the Netbeans Project tree, you should see now your module *MyFirstPlugin*. Expand it to find its Source Package. Here you will place your code.

![image](https://cloud.githubusercontent.com/assets/177962/5605694/d400f588-940a-11e4-83c8-ee7c9e847293.png)
New module Step 1

![image](https://cloud.githubusercontent.com/assets/177962/5605695/d78fb54a-940a-11e4-967e-00886daea18a.png)
New module Step 2

![image](https://cloud.githubusercontent.com/assets/177962/5605702/217797e0-940b-11e4-94e6-f867d9e05a78.png)
New module in the Projects tree

You created a plugin, which doesn't do anything for the moment. When you build Gephi, your plugin is now fully integrated. It appears in the Plugin Center (Tools > Plugin).

## Brand your plugin

1. Right-click on your plugin project *MyFirstPlugin* and select **Properties**.
- Select **Display** on the left panel and fill **Display Category**, **Short Description** and **Long Description**.
- Select **Packaging** on the left panel and fill **License**, **Homepage** (if exists) and **Author** information.
- Click on OK to validate changes.

![image](https://cloud.githubusercontent.com/assets/177962/5605707/4ab0abba-940b-11e4-9e6d-d0615db0044b.png)
Branding Step 1

![image](https://cloud.githubusercontent.com/assets/177962/5605708/4e773fd4-940b-11e4-8bb7-cb0924b3145f.png)
Branding Step 2

## Distribute your plugin

When you successfully tested your plugin, it's time to create a release.

1. Right-click on the project and select **Package As** and then **NMBs**.
- Go to the **build** folder and find the created *plugin-release.zip* file. Individual NBM files (one per each module) are packaged in this zip.

Now you can publish you plugin on the [Gephi Marketplace](https://marketplace.gephi.org).