/**
 * @file Config.gs
 * @summary Standalone and Developer configuration
 * @todo Consider combining properties to define a 'template' (page title, templates.run, pageTemplate etc).
 * @todo Can runGroupCount be computed by filtering Named Ranges by the prefix 'NRRunGroupX'?
 * @todo Can runGroupRunCount be computed by filtering Named Ranges by the prefix 'NRRunGroupXRunHeader'?
 */

const saConfig = { // eslint-disable-line no-unused-vars
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
    cloudProjectId: 'gsheet-compost-collections-2',
    containerBoundAppScriptId: '1h3jghLjpWGEE4ApYmtGxH_KYYp6xLku-6PTMfUB8AlJm5an0BoBTMWLt',
    headDeploymentId: 'AKfycbyXIo-wDHA4IIzSsMAmcT97XUiFPaMdsUaI2vPnLX1s',
    pubDeploymentId: 'AKfycbyFMw-ILDiJD6E1oWd7Gv6UkQSAkNZ5OezOcTAWjqoNgtkM2X5ZUDfK1Afp3Ih_mn0PYg',
    spreadsheetId: '113f_oo25BViZOGC-HoVWOnXT-7Cg6bGi584Ftb-eK0U',
    standaloneAppScriptId: '1Unnx4ReGPj5b88PBKkadr6jD-tbQ2aIt1O3cMBjcpY4SCxalTiXFu7jW',
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

// developer configuration - changes here may require changes in the internals
const devConfig = { // eslint-disable-line no-unused-vars
  colorNamedRangeNames: [
    'NRBrandColors',
    'NRDateFlags',
    'NRNonVolumes',
  ],
  namedRangeItems: [
    {
      name: 'NRBrandColors',
      description: 'Brand Colours',
      validation: [],
      usage: 'App Interface',
    },
    {
      name: 'NRContainerCapacities',
      description: 'Container Capacities',
      validation: [ 'NUMBER_GREATER_THAN', 0 ],
      usage: 'Collection Inputs',
    },
    {
      name: 'NRContainerTypes',
      description: 'Container Types',
      validation: [],
      usage: 'Collection Inputs',
    },
    {
      name: 'NRDateFlags',
      description: 'Date Flags',
      validation: [],
      usage: 'Collection Inputs',
    },
    {
      name: 'NRNonVolumes',
      description: 'Non-volumes',
      validation: [],
      usage: 'Collection Inputs',
    },
  ],
  uiCss: { // GccUi
    fixedPositionIds: [
      'header',
      'footer',
    ],
  },
  uiDialog: { // GccUiDialog
    cacheClearButtonId: 'cache-clear',
    cacheLogButtonId: 'cache-log',
    closeClass: 'dialog-close',
    componentClass: 'dialog',
    consoleContainerId: 'dialog-console',
    endClass: 'dialog-end',
    startClass: 'dialog-start',
    erudaScriptId: 'injection-eruda',
    parentDataAttr: 'data-dialog-open',
    triggerClass: 'dialog-open',
    updateDateValidationId: 'date-validation-update',
  },
  uiFocusableSelectors: [ // GccUi, GccUiDialog
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex="0"]:not(.dialog-tabtrap)',
  ],
  uiLoader: { // GccUiLoader
    componentClass: 'loader',
    dataAttr: 'data-is-loading',
    descriptionClass: 'loader-description',
    hideDelay: 1250,
    parentDataAttr: 'data-child-is-loading',
    runLoaderId: 'run-loader',
    runSaverId: 'run-saver',
    titleClass: 'loader-title',
  },
  uiRunForm: { // GccUiRunForm
    collectionsId: 'collections',
    id: 'run-form',
    placeholderLogoClass: 'bg-logo',
    runId: 'run',
  },
  uiSelectDisclosure: { // GccUiSelectDisclosure
    closeOnSelect: true,
    closeOnSelectDelay: 1250,
    triggerClass: 'button-disclosure',
  },
  uiSelectForm: { // GccUiSelectForm
    id: 'run-select',
  },
};
