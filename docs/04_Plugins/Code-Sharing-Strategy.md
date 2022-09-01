---
id: code-sharing-strategy
title: Code Sharing Strategy
---

## Code sharing

Some basic rules how we code in Gephi and how we use Netbeans:

### Using libraries

If you use libraries, wrap them into one or several modules. Further information here: http://wiki.netbeans.org/DevFaqWrapperModules

The module codebase should be **org.gephi.lib.NAME**.

Please send email to DEV mailing-list about that change and include it in the ChangeLog, not to forgot to update the [license page](http://gephi.org/developers/license/) on the website.

### Code formatting

Always format all the code you submit. Use the Netbeans format feature (right click > Format) with default parameters.

### License

This is the Gephi offical license. 

	 Copyright 2008-2012 Gephi
	 Authors : YOUR NAME <yourname@domain.org>
	 Website : http://www.gephi.org
	 
	 This file is part of Gephi.
	 
	 DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
	 
	 Copyright 2012 Gephi Consortium. All rights reserved.
	 
	 The contents of this file are subject to the terms of either the GNU
	 General Public License Version 3 only ("GPL") or the Common
	 Development and Distribution License("CDDL") (collectively, the
	 "License"). You may not use this file except in compliance with the
	 License. You can obtain a copy of the License at
	 http://gephi.org/about/legal/license-notice/
	 or /cddl-1.0.txt and /gpl-3.0.txt. See the License for the
	 specific language governing permissions and limitations under the
	 License.  When distributing the software, include this License Header
	 Notice in each file and include the License files at
	 /cddl-1.0.txt and /gpl-3.0.txt. If applicable, add the following below the
	 License Header, with the fields enclosed by brackets [] replaced by
	 your own identifying information:
	 "Portions Copyrighted [year] [name of copyright owner]"
	 
	 If you wish your version of this file to be governed by only the CDDL
	 or only the GPL Version 3, indicate your decision by adding
	 "[Contributor] elects to include this software in this distribution
	 under the [CDDL or GPL Version 3] license." If you do not indicate a
	 single choice of license, a recipient has the option to distribute
	 your version of this file under either the CDDL, the GPL Version 3 or
	 to extend the choice of license to its licensees as provided above.
	 However, if you add GPL Version 3 code and therefore, elected the GPL
	 Version 3 license, then the option applies only if the new code is
	 made subject to such option by the copyright holder.
	 
	 Contributor(s):
	 
	 Portions Copyrighted 2011 Gephi Consortium.

Please put your name on the top of the license at 'YOUR_NAME' and put this license in all files you own.

You can directly include license texts in Netbeans using Tools>Templates.

### Javadoc

All open APIs (public interfaces) should have a complete Javadoc. This is important but commit to it only when you estimate a module is finished.
In the mean time, be sure your real name appears completely in all classes you own. This is the minimum thing you should add. As for license, it can be done with Netbeans.

It is recommended to read the Javadoc [Good practices](http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html). It gives guidance and rules to make good Javadoc.

### Module name convention

Please respect new modules naming convention:
* No whitespace
* Add Wrapper in case of a library wrapper

### Codebase convention

New modules should follow the following codebase rules:

| First Header  | Second Header |
| ------------- | ------------- |
| API  | org.gephi.NAME.api  |
| API Implementation  | org.gephi.NAME  |
| SPI  | org.gephi.NAME.spi  |
| SPI Implementation  | org.gephi.NAME.plugin  |
| SPI Implementation UI  | org.gephi.ui.NAME.plugin  |
| Desktop UI  | org.gephi.desktop.NAME  |


### Module branding

Branding options for Netbeans modules. Set it from module Properties > Display.

* Display name can have whitespace
* Display Category:
  * **Gephi Core** for all **API** and **Impl** modules
  * **Plugin** for all **Plugin** and **PluginUI** modules
  * **Libraries** for all libs
  * **Gephi UI** for all **Desktop** modules

And don't forget to set the license and author in the Build > Packaging settings.

License should be **../gpl-3.0.txt** and Author **Gephi.org**

## Distributed development

### Get started

Follow these links to get started with the development environment:
* [[Developer Handbook]]
* [Issues on Github](https://github.com/gephi/gephi/issues)

### Git at Gephi

There is a master branch on the Gephi repository which we call the trunk. This is the main branch where all the daily work happen.

When we are releasing a major version we create a release branche (ex: 0.8) from master. These branches shouldn't get new features, only bug fixes. After the version is released, bugs that don't require to break compatibility of make significant changes (add/removed modules etc) should be developed in this branch and released as hot fixes.

We like to always have the master branch working and developers should always make sure the code builds before commit. 

### Before commit

'''Some simple steps to make sure it's done right:'''
* Run <code>git status</code> to see what's going on. 
* Run <code>git pull upstream BRANCH</code> to get latest updates from GitHub.
* Run <code>git add ...</code> on the files you want to commit. If you removed some files run <code>git rm ...</code>. This step is called 'staging' and add stuff to your commit.
* Run <code>git status</code> again. That lists the files you modified and are part of your next commit.
* Make sure you didn't forget any essential file.
* Run <code>git commit -m "message"</code> with a message with enough information for a fellow to understand.

If you 'staged' something you didn't ant to stage run <code>git reset FILES</code>. If you want to reset a file changes run <code>git checkout FILE</code>. This will revert any changes you made to that files.

'''Some things not to do:'''
* Don't add anything to the .gitignore file unless you've been told to.
* Don't commit changes in modules you are not working on. It happens that Netbeans will override some random xml or properties file. Don't commit those and revert them use 'git checkout'.
* If you encounter a conflict and you're not sure how to fix it, don't try random things. Ask we can help :-)

Command line is fine for Git but you can also use [TortoiseGit](https://code.google.com/p/tortoisegit/) on Windows or [http://gitx.frim.nl/ GitX] if you're on Mac. A Netbeans Git module exists but is still in beta, so you should avoid using it.

### Merging branches

The master branch contains the trunk and all work happens there. When all developers work on separate modules it's relatively easy to manage and it's convenient to all work on the same code. However it gets complicated really fast when developers work on APIs, rewrite modules or refactor code. Therefore, for any significant work developers should create feature branches. This is typically the case for Google Summer of Code projects or large code changes. 

To create a new branch:
* Make sure you're on the master branch by running <code>git branch</code>
* Run <code>git branch NAME</code> to create the branch. Run <code>git branch</code>. Your new branch should appear.
* Run <code>git checkout NAME</code> to go to your branch
* Run <code>git push origin NAME</code> to push it to GitHub

Features branches typically need to merge the master branch time to time to get up to date with core developments. To merge the master branch:
* Make sure you're on your feature branch by running <code>git branch</code>. If not, run <code>git checkout BRANCH</code>
* Run <code>git pull upstream master</code>. That will pull and merge the master branch.

The merge will fail if some of the files Git want to merge have uncommited changes. IF that happens, commit your changes and in most cases Git will do the merge automatically.

The master branch merges hotfixes in release branches when done.

### Hot fixes

Gephi is distributed through a installation package but also online as NBM packages. Thanks to Netbeans Platform, Gephi has the capability to update itself using the NBMs packages we store on our server. We call this the 'Update Center' and it is the same system we use to distribute third party plug-ins. It works like this. There is a XML files with all modules and version on our server and Gephi can read that files and compare online versions with it's local versions. If some modules have been updated the user is asked to update.

This capability allows us to deploy hot fixes. When a bug is fixed and the version of the module is incremented the NBM file of the module is created and uploaded to our server. This is process is manual at the moment but it just takes a few minutes. We have done it many times to deliver bug fixes as soon as they are ready without waiting for a release.

All bugs for hot fixes should be developed in release branches. For instance, if the latest stable release is 0.8 and we want to fix an issue and release it as hotfix the bug should be fixed in the 0.8 branch. The branch should be then merged to master to make sure the fix is in trunk as well.

### Auto-Update

Thanks to Netbeans Platform, Gephi has an auto-update feature. Update is done according to the "Specification version" for each module. Therefore, if you made a change that will be deployed through auto-update, increment the **Specification Version** of all modules you touched.
