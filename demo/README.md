# GCC Demo

Regardless of whether you choose to set up your own standalone project or reuse the existing one, you will need to set up an Apps Script project which is attached to your spreadsheet document (i.e. 'container-bound').

This will allow you to:

* access custom menu options to format data and open useful links from the spreadsheet
* configure and deploy the web app

## Setup

### 1. Create an Apps Script project which is linked to your spreadsheet

1. Open a Google spreadsheet
2. Extensions > Apps Script
3. Click on `Untitled project` to rename it > `GCC CB` (`Gsheet Compost Collections container-bound`) (or something else)

### 2. Add the Apps Script config

1. Project settings > General settings > Check `Show "appsscript.json" manifest file in editor`
2. Copy the contents of [demo/appsscript.json](https://github.com/dotherightthing/gsheet-compost-collections/blob/main/demo/appsscript.json) to `appsscript.json`
3. If you have edited the codebase to create your own standalone project, replace the Script ID in `appsscript.json` with your own

### 3. Add the app config and triggers

1. Copy the contents of [demo/Config.js](https://github.com/dotherightthing/gsheet-compost-collections/blob/main/demo/Config.js) to `Code.gs` (`.js` files have a `.gs` extension in the Apps Script editor)
2. Customise the `hostConfig` object to configure the app to your needs
    * Further information on each configuration option can be found by opening
      [the manual](https://github.com/dotherightthing/gsheet-compost-collections/blob/main/MAN.md)
      and searching for the configuration option:
      e.g. In Firefox: Edit > Find in page > `organisationName`

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

### 6. Create an initial deployment of the Apps Script project to enable testing

1. Deploy > New deployment > Select type: `Web app` > Description: `Initial deployment` > Execute as: `User accessing the web app` > Who has access: `Only myself` > Deploy

### 7. Test that everything is working

1. Open the Google spreadsheet > Check that the `App Help` menu appears
2. Deploy > Test deployments > Web app > Click URL link > Check that the app loads
