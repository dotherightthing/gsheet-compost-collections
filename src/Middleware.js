/**
 * @file Middleware.gs
 * @summary Expose GCC classes to:
 *  - GCC Apps Script IDE, which accesses class methods via its 'Run' control
 *  - GccUi frontend, which accesses class methods via google.script.run callbacks, which must be globals
 *  - Spreadsheet container-bound Apps Script project, which consumes GCC as a library.
 */

/**
 * gccMiddleware
 *
 * @summary Middleware to call standalone scripts from container-bound or standalone environment.
 * @param {string} classMethod - Class.method (combined arguments to facilitate find and replace in codebase)
 * @param {*}      args        - Args for callable function
 * @returns {*}    callback    - Callable function with args
 * @example
 *  // standalone
 *  google.script.run
 *    .withSuccessHandler(this.handleSubmitSuccessCb)
 *    .withFailureHandler(this.handleSubmitFailCb)
 *    .gccMiddleware('GccClass.methodName', formObject);
 *
 *  // container-bound script passes calls on to this function like so:
 *  function gccMiddleware(classMethod, ...args) {
 *    return GsheetCompostCollections.gccMiddleware(classMethod, ...args);
 *  }
 */
function gccMiddleware(classMethod, ...args) {
  const classMap = new Map([
    [ 'GccCache', GccCache ],
    [ 'GccPageInstance', GccPage.getInstance() ],
    [ 'GccSheet', GccSheet ],
    [ 'GccSheetInstance', GccSheet.getInstance() ],
  ]);

  const [
    className,
    methodName,
  ] = classMethod.split('.');

  const instance = classMap.get(className);

  if (typeof instance[methodName] === 'function') {
    if (args.length) {
      return instance[methodName](...args);
    }

    return instance[methodName]();
  }

  throw new Error(`${className}.${methodName} is not a function`);
}

/**
 * gccMiddlewareCacheClear
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareCacheClear() {
  return gccMiddleware('GccCache.clearCache');
}

/**
 * gccMiddlewareCacheLog
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareCacheLog() {
  return gccMiddleware('GccSheetInstance.cacheLog');
}

/**
 * gccMiddlewareFocusNRBrandColors
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRBrandColors() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRBrandColors');
}

/**
 * gccMiddlewareFocusNRContainerCapacities
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRContainerCapacities() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRContainerCapacities');
}

/**
 * gccMiddlewareFocusNRContainerTypes
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRContainerTypes() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRContainerTypes');
}

/**
 * gccMiddlewareFocusNRDateFlags
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRDateFlags() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRDateFlags');
}

/**
 * gccMiddlewareFocusNRNonVolumes
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRNonVolumes() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRNonVolumes');
}

/**
 * gccMiddlewareFocusNRRunGroup1ColumnHeaders
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1ColumnHeaders() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1ColumnHeaders');
}

/**
 * gccMiddlewareFocusNRRunGroup1PreRunHeader
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1PreRunHeader() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1PreRunHeader');
}

/**
 * gccMiddlewareFocusNRRunGroup1PostRunHeader
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1PostRunHeader() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1PostRunHeader');
}

/**
 * gccMiddlewareFocusNRRunGroup1Footer
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1Footer() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1Footer');
}

/**
 * gccMiddlewareFocusNRRunGroup1RunHeader1
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1RunHeader1() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1RunHeader1');
}

/**
 * gccMiddlewareFocusNRRunGroup1RunHeader2
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1RunHeader2() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1RunHeader2');
}

/**
 * gccMiddlewareFocusNRRunGroup1RunHeader3
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1RunHeader3() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1RunHeader3');
}

/**
 * gccMiddlewareFocusNRRunGroup1RunHeader4
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup1RunHeader4() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup1RunHeader4');
}

/**
 * gccMiddlewareFocusNRRunGroup2ColumnHeaders
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2ColumnHeaders() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2ColumnHeaders');
}

/**
 * gccMiddlewareFocusNRRunGroup2PreRunHeader
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2PreRunHeader() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2PreRunHeader');
}

/**
 * gccMiddlewareFocusNRRunGroup2PostRunHeader
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2PostRunHeader() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2PostRunHeader');
}

/**
 * gccMiddlewareFocusNRRunGroup2Footer
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2Footer() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2Footer');
}

/**
 * gccMiddlewareFocusNRRunGroup2RunHeader1
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2RunHeader1() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2RunHeader1');
}

/**
 * gccMiddlewareFocusNRRunGroup2RunHeader2
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2RunHeader2() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2RunHeader2');
}

/**
 * gccMiddlewareFocusNRRunGroup2RunHeader3
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2RunHeader3() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2RunHeader3');
}

/**
 * gccMiddlewareFocusNRRunGroup2RunHeader4
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareFocusNRRunGroup2RunHeader4() {
  return gccMiddleware('GccSheetInstance.focusNR', 'NRRunGroup2RunHeader4');
}

/**
 * gccMiddlewareOpenLinkAppDev
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkAppDev() {
  const { env } = GccUtils.getAppConfig('gccMiddlewareOpenLinkAppDev');
  const { headDeploymentId } = env;

  return gccMiddleware('GccSheet.openLinkPhoneSize', `https://script.google.com/macros/s/${headDeploymentId}/exec`);
}

/**
 * gccMiddlewareOpenLinkAppStable
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkAppStable() {
  const { env } = GccUtils.getAppConfig('gccMiddlewareOpenLinkAppStable');
  const { pubDeploymentId } = env;

  return gccMiddleware('GccSheet.openLinkPhoneSize', `https://script.google.com/macros/s/${pubDeploymentId}/exec`);
}

/**
 * gccMiddlewareOpenLinkCodeDocumentation
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkCodeDocumentation() {
  return gccMiddleware('GccSheet.openLink', 'https://github.com/dotherightthing/gsheet-compost-collections/blob/main/MAN.md');
}

/**
 * gccMiddlewareOpenLinkCodeIssue
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkCodeIssue() {
  return gccMiddleware('GccSheet.openLink', 'https://github.com/dotherightthing/gsheet-compost-collections/issues/new');
}

/**
 * gccMiddlewareOpenLinkCodeRepository
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkCodeRepository() {
  return gccMiddleware('GccSheet.openLink', 'https://github.com/dotherightthing/gsheet-compost-collections');
}

/**
 * gccMiddlewareOpenLinkConfig
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkConfig() {
  const { env } = GccUtils.getAppConfig('gccMiddlewareOpenLinkConfig');
  const { containerBoundAppScriptId } = env;

  return gccMiddleware('GccSheet.openLink', `https://script.google.com/home/projects/${containerBoundAppScriptId}/edit`);
}

/**
 * gccMiddlewareOpenLinkInternalDocumentation
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkInternalDocumentation() {
  const { helpLinks } = this;
  const { url } = helpLinks[0];

  return gccMiddleware('GccSheet.openLink', url);
}

/**
 * gccMiddlewareOpenLinkPermissions
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkPermissions() {
  const { env } = GccUtils.getAppConfig('gccMiddlewareOpenLinkPermissions');
  const { cloudProjectId } = env;

  return gccMiddleware('GccSheet.openLink', `https://console.cloud.google.com/iam-admin/iam?project=${cloudProjectId}`);
}

/**
 * gccMiddlewareOpenLinkTestUsers
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkTestUsers() {
  const { env } = GccUtils.getAppConfig('gccMiddlewareOpenLinkTestUsers');
  const { cloudProjectId } = env;

  return gccMiddleware('GccSheet.openLink', `https://console.cloud.google.com/apis/credentials/consent?authuser=0&project=${cloudProjectId}`);
}

/**
 * gccMiddlewareOpenLinkWiki
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareOpenLinkWiki() {
  return gccMiddleware('GccSheet.openLink', 'https://github.com/dotherightthing/gsheet-compost-collections/wiki');
}

/**
 * gccMiddlewareSetDateValidation
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareSetDateValidation() {
  return gccMiddleware('GccSheetInstance.setDateValidation');
}

/**
 * gccMiddlewareShowSidebar
 *
 * @summary Called from GCC Help menu
 * @returns {*} Calls method of GccSheet
 */
function gccMiddlewareShowSidebarHelpCache() {
  return gccMiddleware('GccSheetInstance.showSidebarHelp', 'Cache');
}

/**
 * gccMiddlewareShowVersionHistory
 *
 * @summary Called from GCC Help menu
 * @returns {*} Performs function
 */
function gccMiddlewareShowVersionHistory() {
  return gccMiddleware('GccSheetInstance.showVersionHistory');
}
