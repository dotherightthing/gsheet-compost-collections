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
 * @returns {string} - App template
 */
function doGet() {
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
  GccUtils.setAppConfig({ ...cbConfig, ...devConfig });

  if (isBrowser) {
    return GccPage.getInstance().createHtmlTemplate();
  }

  return true;
}

/**
 * gccInitIntegrationTests
 *
 * @param {object} cbConfig - App config (container-bound)
 * @returns {*} - HTML
 */
function gccInitIntegrationTests(cbConfig) {
  GccUtils.setAppConfig({ ...cbConfig, ...devConfig });

  const config = GccUtils.getAppConfig('gccInitIntegrationTests');
  const gccTest = new GccTest(config);

  // QUnitGS2 is a wrapper for the main QUnit object, which can be accessed directly with "QUnit"
  const { QUnit } = QUnitGS2;

  QUnitGS2.init();
  QUnit.config.title = 'GCC Integration Tests';
  gccTest.runIntegrationTests(QUnit);
  QUnit.start();

  return QUnitGS2.getHtml();
}

/**
 * gccInitUnitTests
 *
 * @param {object} cbConfig - App config (container-bound)
 * @returns {*} - HTML Template
 */
function gccInitUnitTests(cbConfig) {
  GccUtils.setAppConfig({ ...cbConfig, ...devConfig });

  return GccPage.getInstance().createUnitTestHtmlTemplate();
}

/**
 * gccLanding
 *
 * @summary Display a landing page when the standalone app is loaded directly rather than as a library
 * @returns {*} - HTML Template
 */
function gccLanding() {
  let tpl = HtmlService.createTemplateFromFile('Templates/Index');

  tpl = tpl.evaluate();

  return tpl;
}
