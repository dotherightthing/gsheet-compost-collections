/**
 * @file Integration.gs
 * @summary Integration tests (using the QUnitGS2 library).
 * @see {@link http://qunitgs2.com/examples/step-by-step-tutorial}
 * @see {@link http://qunitgs2.com/} Option 1 - Deploy your code as a web app for testing purposes.
 */

/**
 * gccIntegrationTests
 *
 * @param {object} cbConfig App config (container-bound)
 * @returns {*} - HTML
 */
function gccIntegrationTests(cbConfig) {
  const appConfig = { ...cbConfig, ...devConfig };

  GccUtils.setAppConfig(appConfig);

  const gccTest = new GccTest(appConfig);

  // QUnitGS2 is a wrapper for the main QUnit object, which can be accessed directly with "QUnit"
  const { QUnit } = QUnitGS2;

  QUnitGS2.init();

  QUnit.config.title = 'GCC Integration Tests';

  gccTest.runIntegrationTests(QUnit);

  QUnit.start();

  return QUnitGS2.getHtml();
}
