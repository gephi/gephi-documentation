---
id: update-a-plugin
title: Update a plugin
---

## Step1: New code

A plugin usually use some of Gephi's APIs. For example for a layout plugin, it will depend on LayoutAPI and GraphAPI. Gephi developers sometimes have to change existing APIs, and break compatibility with existing plug-ins. In that case, plugin developers have to update their code to make it work with the new version. This is not likely to happen on APIs marked as **stable** on the [API Index](http://gephi.org/docs/api/).

When an API is updated, a message is sent on the [gephi-plugins](http://gephi.org/mailman/listinfo/gephi-plugins) mailing-list and the **API Changes** section is updated on the API Index.

## Step2: Update specification version

The specification version is a version number given by the plugin developers in the module properties. Gephi uses specification versions to know when a plugin should be updated. For instance if a Gephi user has the plugin "SuperLayout" at version 1.1 and the 1.2 version is available on the website, Gephi will ask the user if he wants to update it.

So, before uploading a new version of your plug-in, always increment the Specification Version.

Right click on your plugin and select `Properties`. On the "API Versionning" tab increase the number of the specification version.

## Step3: Upload on the Gephi Marketplace

![gephi_marketplace](https://marketplace.gephi.org/wp-content/uploads/2012/11/gmk2-300x82.png?71aaf5)

### Upload a new plugin

1. Go to https://gephi.org/plugins/#/
- Click on the **List your own > New plugin** menu item
- Log in
- Follow the instructions to upload the file.
- Wait for and admin approval. You will receive a notification by email when it is published.

### Update an existing plugin


1. Go to https://gephi.org/plugins/#/
- Log in
- Go to your user profile
- Select the plugin to update and follow instructions to upload a new version