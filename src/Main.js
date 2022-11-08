/**
 * @file Main.gs
 * @summary Initialises the GCC App.
 * @todo Consider combining properties to define a 'template' (page title, templates.run, pageTemplate etc).
 * @todo Can runGroupCount be computed by filtering Named Ranges by the prefix 'NRRunGroupX'?
 * @todo Can runGroupRunCount be computed by filtering Named Ranges by the prefix 'NRRunGroupXRunHeader'?
 * @todo Remove ESLint rule - disallow class methods that dont use 'this' (class-methods-use-this)
 */

// functions

/**
 * doGet
 *
 * @summary Called when the user loads the web app in a web browser. This autostarts the app.
 * @param {object} e - An event parameter that can contain information about any request parameters.
 * @returns {string} - App template
 */
function doGet(e) {
  if (e.pathInfo === 'test') {
    const appConfig = GccUtils.getAppConfig('doGet');

    return gccIntegrationTests(appConfig);
  }

  const appTemplate = gccInit(saConfig, true);

  return appTemplate;
}

/**
 * gccInit
 *
 * @param {object} appConfig - App config (saConfig|cbConfig)
 * @param {boolean} isBrowser - Whether the function was called from a web browser (or the spreadsheet)
 * @returns {*} - HTML Template
 */
function gccInit(appConfig, isBrowser) {
  const config = { ...appConfig, ...devConfig };

  GccUtils.setAppConfig(config);

  if (isBrowser) {
    return GccPage.getInstance().createHtmlTemplate();
  }

  return true;
}
