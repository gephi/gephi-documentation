---
id: developer-handbook
title: Developer Handbook
---

This page explains how to contribute to Gephi's development.

## How to download the development version of Gephi

### Prerequisites

- Note: Gephi uses multi-platforms tools, so all the following steps should be the same (well, mostly) whatever the OS you are running
- First, you will need [git](http://git-scm.com/download) to download the files.
- You also need [Netbeans 8.0+](http://netbeans.org/)

### Getting the source code

- Read the full instructions: [[Checkout Code]]

Now you should have a Gephi fork and a master branch.

Set up your account credentials to Git:
```sh
git config --global user.name "Firstname Lastname"
git config --global user.email "your_email@youremail.com"
```

### Compiling and Running Gephi

Read full instructions: [[Configuring NetBeans]]

## How to create and publish your own feature

### Configure your forked repository

- You’ve successfully forked the Gephi repository and got the code in a gephi folder by doing

``git clone git@github.com:username/gephi.git``

When a repo is cloned, it has a default remote called origin that points to your fork on GitHub, not the original repo it was forked from. To keep track of the original repo, you need to add another remote named upstream:

```sh
cd gephi
git remote add upstream git://github.com/gephi/gephi.git
git fetch upstream master
```

This keeps your fork up to date. Each time you run ``git fetch upstream master`` it downloads the latest changes from the main repository (not your fork). Note that this does NOT change any of your files. You'll need a merge to actually apply the latest changes to your fork.

### Push commits

When you work on the code, commit often!
The commit process is straightforward. First add all the files you want to include in your commit:

``git add .``

Then commit these files

``git commit -m "This is my first commit hourray"``

Run git status often to see what your repository is up to.
Your commits are local. To send them to GitHub run:

``git push origin master``

### Merge from the main repository

When we update the main gephi repository, your fork doesn't get updated automatically. To merge the latest commits to your fork, run a merge from upstream:

```sh
git fetch upstream master
git merge upstream/master
```

To fetch and merge in one line, simply run

``git pull upstream master``

When you merge, you may run into conflicts. This is normal if you worked on the same files.
Note that ``git fetch upstream`` or ``git pull upstream`` will download the data from all branches, which you probably don't need. That's why we add 'master' to specify which branch to fetch to.

### Send pull requests

That's the standard and easiest way to contribute to the project. It's fully integrated into GitHub and well explained [here](http://help.github.com/send-pull-requests/).

## How to contribute to the main project

When you are a member of the gephi team, you have the write rights on the main repository. Instead of submitting pull requests you simply commit to the repository, including the master branch.
Change your upstream push url to authenticated version:

``git remote set-url upstream git@github.com:gephi/gephi.git``

Push to the master branch. Make sure you pulled to the latest revision before (git pull upstream master).

``git push upstream master``