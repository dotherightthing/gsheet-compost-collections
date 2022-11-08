/**
 * @file Config.gs
 * @summary Contaibner-bound configuration
 * @see {@link https://github.com/dotherightthing/gsheet-compost-collections/blob/main/demo}
 */

/* eslint-disable no-unused-vars */

// container-bound configuration
const cbConfig = {
  abbreviations: [
    {
      short: 'b',
      long: 'Business',
    },
    {
      short: 'np',
      long: 'Not Profit', // guess
    },
    {
      short: 'r',
      long: 'Residential',
    },
    {
      short: 'x',
      long: 'Checklist Task',
    },
  ],
  appName: 'Gsheet Compost Collections',
  collectionMapLocale: 'Wellington, New Zealand',
  computedNamedRangeNames: [ 'NRRunGroups' ],
  containerVolumeFractions: [
    '1/4',
    '1/2',
    '3/4',
    '4/4',
    '5/4',
  ],
  dateFormat: 'MMM d',
  debug: false,
  developerUserEmails: [
    'dan@dotherightthing.co.nz',
  ],
  env: {
    cloudProjectId: 'gsheet-compost-collections',
    containerBoundAppScriptId: '1h3jghLjpWGEE4ApYmtGxH_KYYp6xLku-6PTMfUB8AlJm5an0BoBTMWLt',
    headDeploymentId: 'AKfycbzHMeKqi2UxMv9cL6g47UrXER5UoIVBjVvmqGTJRXY',
    pubDeploymentId: 'AKfycbxOWjeFT1bUcDX5lWtopj8irf0wVr5idPSRvcRRXm5PyMLLoBp8CkELmQ-p8DqNw-rK',
    spreadsheetId: '113f_oo25BViZOGC-HoVWOnXT-7Cg6bGi584Ftb-eK0U',
    standaloneAppScriptId: '1_ZAI64WLHlg7M0yss76_X2s-4Ph0qdlbE-ShzF-Kjpuof54ATSzX5qil',
  },
  extraCollectionsLabel: 'Switched On pick-up and drop-off',
  feedbackEmailBody: 'Please enter your feedback/request. If you are logging a bug, please describe the steps required to recreate it. Thanks!',
  helpLinks: [
    {
      label: 'Quick Start guide (Google Docs)',
      url: 'https://docs.google.com/document/d/1-BeonHlGNY0I_Ny_U0aEGJHW8N3sfui2tIJKL6MJNBw/edit#',
    },
    {
      label: 'What Food Scraps Are Accepted',
      url: 'https://www.livingcomposthubs.org.nz/composting/whats-accepted',
    },
  ],
  imageFavicon: 'https://images.squarespace-cdn.com/content/v1/5d4cabb489e9b50001bdc242/1565671952937-SDYC2M12R5SVXYR6DCSK/favicon.png',
  imageLogo: 'https://images.squarespace-cdn.com/content/v1/5d4cabb489e9b50001bdc242/1565305834548-6J2L4NN68WIWMYUPPMWO/kaicycle-logo-color-large.png?format=200w',
  organisationName: 'Demo',
  pageTemplate: 'Index',
  pageTitle: 'Compost Collections',
  runBlankRowsAfter: 2,
  runGroupCount: 2,
  runGroupRunCount: 4,
};
