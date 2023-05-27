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

  const appTemplate = gccLanding();

  return appTemplate;
}

/**
 * gccInit
 *
 * @param {object} cbConfig - App config (container-bound)
 * @param {boolean} isBrowser - Whether the function was called from a web browser (or the spreadsheet)
 * @returns {*} - HTML Template
 */
function gccInit(cbConfig, isBrowser) {
  const config = { ...cbConfig, ...devConfig };

  GccUtils.setAppConfig(config);

  if (isBrowser) {
    return GccPage.getInstance().createHtmlTemplate();
  }

  return true;
}

/**
 * gccLanding
 *
 * @summary Display a landing page when the standalone app is loaded directly rather than as a library
 * @returns {*} - HTML Template
 */
function gccLanding() {
  let tpl = HtmlService.createTemplateFromFile('Index');

  tpl = tpl.evaluate();

  return tpl;
}
