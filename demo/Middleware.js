/**
 * @file Middleware.gs
 * @summary Expose GCC classes to:
 *  - Spreadsheet / container-bound Apps Script project, which consumes GCC as a library.
 * @see {@link https://github.com/dotherightthing/gsheet-compost-collections/blob/main/demo}
 */

/* eslint-disable no-unused-vars */

/**
 * doGet
 *
 * @summary Function which runs when the web app is visited in a web browser. Do not edit.
 * @returns {*} - The GsheetCompostCollections library will load the web page.
 */
function doGet() {
  const appTemplate = GsheetCompostCollections.gccInit(cbConfig, false);

  return appTemplate;
}

/**
 * gccMiddleware
 *
 * @summary Middleware to call standalone scripts from container-bound environment.
 * @param {string} classMethod - Class.method (combined arguments to facilitate find and replace in codebase)
 * @param {*}      args        - Args for callable function
 * @returns {*}    callback    - Callable function with args
 */
function gccMiddleware(classMethod, ...args) {
  return GsheetCompostCollections.gccMiddleware(classMethod, ...args);
}

/**
 * gccSheetHandleEdit
 *
 * @summary Run when the spreadsheet is edited.
 *  'Installable Trigger' (Triggers > Add Trigger)
 *   Differs from a 'Simple Trigger' (i.e. handleEdit in Main.gs) in that it can access services that require authorization.
 * @param {object} e Trigger event object
 * @returns {*} callback
 */
function gccSheetHandleEdit(e) {
  return GsheetCompostCollections.gccMiddleware('GccSheetInstance.handleEdit', e);
}

/**
 * gccSheetHandleOpen
 *
 * @summary Run when the spreadsheet is opened.
 *  'Installable Trigger' (Triggers > Add Trigger)
 *   Differs from a 'Simple Trigger' (i.e. handleEdit in Main.gs) in that it can access services that require authorization.
 * @returns {*} callback
 */
function gccSheetHandleOpen() {
  GsheetCompostCollections.gccInit(cbConfig, false);

  return GsheetCompostCollections.gccMiddleware('GccSheetInstance.handleOpen', cbConfig);
}
