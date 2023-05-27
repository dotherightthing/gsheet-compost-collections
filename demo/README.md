# GCC Demo

Regardless of whether you choose to set up your own standalone project or reuse the existing one, you will need to set up an Apps Script project which is attached to your spreadsheet document (i.e. 'container-bound').

This will allow you to:

* access custom menu options to format data and open useful links from the spreadsheet
* configure and deploy the web app

## Setup

### 1. Create an Apps Script project which is linked to your spreadsheet

1. Open a Google spreadsheet
2. Extensions > Apps Script
3. Click on `Untitled project` to rename it > `GCC Configuration` (or something else)

### 2. Add the Apps Script config

1. Project settings > General settings > Check `Show "appsscript.json" manifest file in editor`
2. Copy the contents of [demo/appsscript.json](https://github.com/dotherightthing/gsheet-compost-collections/blob/main/demo/appsscript.json) to `appsscript.json`
3. Replace the Script ID in `appsscript.json` with your own (see <https://github.com/dotherightthing/gsheet-compost-collections/wiki/Information-for-Developers> - *Create an Apps Script project*)

### 3. Add the app config and triggers

1. Copy the contents of [demo/Config.js](https://github.com/dotherightthing/gsheet-compost-collections/blob/main/demo/Config.js) to `Code.gs` (`.js` files have a `.gs` extension in the Apps Script editor)
2. Customise the `cbConfig` object to configure the app to your needs
    * Further information on each configuration option can be found by opening
      [the manual](https://github.com/dotherightthing/gsheet-compost-collections/blob/main/MAN.md)
      and searching for the configuration option:
      e.g. To find out what `organisationName` is used for *Edit > Find in page >* (Firefox) `config.organisationName`
      e.g. To find out what `env.headDeploymentId` is used for *Edit > Find in page >* (Firefox) `config.env.headDeploymentId`

### 4. Add the middleware communication layer

1. Files > + > Script > `Middleware`
2. Copy the contents of [demo/Middleware.js](https://github.com/dotherightthing/gsheet-compost-collections/blob/main/demo/Middleware.js) to `Middleware.gs` (`.js` files have a `.gs` extension in the Apps Script editor)
   * The `doGet` function runs the app from a web browser
   * The `gccMiddleware` function allows frontend/UI functions to communicate with the backend
   * The `gccSheetHandleEdit` function runs the app when the spreadsheet is edited
   * The `gccSheetHandleOpen` function runs the app when the spreadsheet is opened

### 5. Install the triggers

1. Triggers (alarm clock icon) > Add Trigger
   1. Choose which function to run: `gccSheetHandleEdit`
   2. Choose which deployment should run: `Head`
   3. Select event source: `From spreadsheet`
   4. Select event type: `On edit`
   5. Failure notification settings: `Notify me immediately`
   6. Save
   7. A popup window will open > Choose your Google account > Allow
2. Triggers (alarm clock icon) > Add Trigger
   1. Choose which function to run: `gccSheetHandleOpen`
   2. Choose which deployment should run: `Head`
   3. Select event source: `From spreadsheet`
   4. Select event type: `On open`
   5. Failure notification settings: `Notify me immediately`
   6. Save

### 6. Create a test deployment to test that everything is working

1. Add youself as a test user - see <https://github.com/dotherightthing/gsheet-compost-collections/wiki/Information-for-Administrators#b-provide-access-to-a-user-of-the-mobile-app-or-the-spreadsheet>
2. Open the Google spreadsheet > Check that the `GCC Help` menu appears
3. Deploy > Test deployments > Web app > URL > Copy
4. Paste the URL into a web browser
5. At the prompt, click *Review permissions* > click on your account name > scroll down > click *Allow*
6. Check that the app loads
7. If there is an error, go to <https://script.google.com/> > Open project > Executions > click on the Failed execution

### 7. Create an initial deployment to create a snapshot of the working configuration

Create a versioned deployment to protect users from changes to the container-bound Apps Script project.

1. Deploy > New deployment
2. Select type: `Web app`
3. Description: A short phrase describing the main changes, or use `Initial deployment` if this is the first deployment
4. Execute as: `User accessing the web app`
5. Who has access: `Only myself`
6. Deploy
7. Web app > URL > Copy
8. Paste the URL into a web browser
9. At the prompt, click *Review permissions* > click on your account name > scroll down > click *Allow*
10. Check that the app loads
11. If there is an error, go to <https://script.google.com/> > Open project > Executions > click on the Failed execution
