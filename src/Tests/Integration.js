/**
 * @file Integration.gs
 * @summary Integration tests (using the QUnitGS2 library).
 * @see {@link http://qunitgs2.com/examples/step-by-step-tutorial}
 * @see {@link http://qunitgs2.com/} Option 1 - Deploy your code as a web app for testing purposes.
 */

/**
 * gccIntegrationTests
 *
 * @param {object} appConfig App config
 * @returns {*} - HTML
 */
function gccIntegrationTests(appConfig) {
  const gccTest = new GccTest(appConfig);

  // QUnitGS2 is a wrapper for the main QUnit object, which can be accessed directly with "QUnit"
  const { QUnit } = QUnitGS2;

  QUnitGS2.init();

  QUnit.config.title = 'GCC Integration Tests';

  gccTest.runIntegrationTests(QUnit);

  QUnit.start();

  return QUnitGS2.getHtml();
}

/**
 * @function getResultsFromServer
 * @summary Retrieve test results when ready.
 * @returns {*} - Test results
 */
function getResultsFromServer() { // eslint-disable-line no-unused-vars
  return QUnitGS2.getResultsFromServer();
}
