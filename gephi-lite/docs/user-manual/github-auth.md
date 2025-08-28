---
title: GitHub Integration
sidebar_position: 3
---

Gephi Lite is serverless. Unless you chose to, no data will leave your computer when using Gephi Lite. It's a graph editor which can open file from your local computer or any public graph available on the internet.

However, many people now prefer working in the cloud with their favorite applications.
That’s why we provide an optional **GitHub integration**.
If you want to use it you have to first authenticate using your GitHub account. Once onde you’ll be able to open and save graphs directly from [Github Gist](https://gist.github.com/).

Using Github Gist allow you to save your graph on Github Cloud but also to share then publicly if you want. Read the [](../integration/permalinks.md)

## Authentication

:::info
Gephi Lite uses GitHub OAuth [Device Flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow).
:::

1. Open the `Workspace` menu (top left of the screen) and click on the `Link to GitHub` item.  
   The following modal should be displayed:

   ![Gephi Lite modal for GitHub authentication](./assets/github-modal.png)

2. Copy the displayed code and click on the `Open GitHub` button.  
   This opens a GitHub page in a new browser window.

   ![GitHub device activation](./assets/github-login.png)

3. Sign in to GitHub and click `Continue`. The **Device Activation** page will appear, asking you to enter the code.

   ![GitHub code](./assets/github-code.png)

4. Enter the code and click `Continue`. The **Authorization** page will then appear asking to confirm your acknowledgment to let Gephi-Lite create gists on your behalf.

   ![GitHub validation authorization](./assets/github-validation.png)

5. Verify that the authorization request is from the `Gephi` organization and for the `Gephi-Lite` project.  
   If correct, and if you agree to allow Gephi Lite access to your Gists, click `Authorize gephi`.

   ![GitHub authorization done](./assets/github-done.png)

6. Once authorized, you can close the window and return to Gephi Lite.  
   If the modal is closed, your Gephi Lite instance is now connected to GitHub.

## Open a graph from GitHub

1. Open the `Workspace` menu and click on the `Open from GitHub` item.  
   A new panel will appear on the left side.

2. Click on `Open a file from GitHub`. A table will be displayed with a list of your Gists (most recent at the top).

   ![List of GitHub gists](./assets/github-open-gist.png)

:::info
Gephi Lite filters gists by filename extension. Only files with `.json`, `.gexf`, or `.graphml` are listed.
:::

3. Select a file by clicking on its row in the table, then click the `Open` button.

## Save a graph previously opened from GitHub

If you opened a gephi-lite graph file from GitHub, saving modifications is straightforward:

1. Open the `Workspace` menu.
2. Click on the `Save` item.

   ![Save GitHub graph](./assets/github-save.png)

This will update your GitHub gist with the changes, creating a new revision.

:::info
If you opened a `.gexf` or `.graphml` file from GitHub, the `Save` option will not be available.  
In that case, use **Save As** instead (see below).
:::

## Save a graph to your GitHub profile

If you are connected to GitHub, you can save any graph to your account:

1. Open the `Workspace` menu.
2. Click on the `Save As` item.
3. In the modal, select `Save on GitHub As` from the left menu.

   ![Save as GitHub graph](./assets/github-save_as.png)

4. Fill in the form and validate it.

🎉 Congrats! Your graph is now saved in your GitHub gists.

You can reopen in any computer as long as you authenticate to your github account.

You can also share your Gist hosted file with someone by sharing an URL to Gephi Lite. Learn how to do that in the [Share Graph as URL documentation](./share-graph-as-url.md). Heads up, if you want to share it make sure to enable the `Create a public gist` option when saving your graph.
