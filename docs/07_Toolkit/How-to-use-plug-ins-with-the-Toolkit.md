---
id: how-to-use-plug-ins-with-the-toolkit
title: How to use plug ins with the Toolkit
---

This page explains how to use Gephi plug-ins with the Toolkit. A Gephi plug-in is one ore several NBM files, which contains the JARs files we need.

The steps below shows how to obtain the JARs files from the NBM files. Once you have the JARs, you have all the plug-in code and you can include them in the classpath of your project, with the Gephi Toolkit JAR.

## Using UnpackNBM

[UnpackNBM](https://github.com/mbastian/UnpackNBM) is a small utility application that can do this for you.

1. Download [UnpackNBM.jar](https://github.com/mbastian/UnpackNBM/raw/master/0.2/UnpackNBM.jar)
- Open a terninal or command-line and go where you downloaded UnpackNBM.jar
- Type `java -jar UnpackNBM.jar NBM-FILE-HERE` with the path to the NBM file as an argument
- That's all, the JARs appeared in the same folder as the NBM file

## Manually

Not recommended, but it's possible to unpack manually using unpack200 installed on the system.

1. Rename the NBM file in ZIP and unzip the folder
- Start a command line or terminal and go to this folder
- Go to the netbeans/modules/ folder, you should have a 'pack.gz' file
- Run the 'unpack200' command with the name of the file and the name of the JAR file to create, it should work if you have installed the Java JDK

``unpack200 FILE.pack.gz FILE.jar``

Repeat the operations above for all the NBMs files of the plug-in and include these JARs in your CLASSPATH.

We are looking forward a simpler way to do this, but unfortunately the Pack200 compression used to compress JARs is not supported in 7zip.