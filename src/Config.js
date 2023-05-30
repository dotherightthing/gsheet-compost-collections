/**
 * @file Config.gs
 * @summary Developer configuration
 * @todo Consider combining properties to define a 'template' (page title, templates.run, pageTemplate etc).
 * @todo Can runGroupCount be computed by filtering Named Ranges by the prefix 'NRRunGroupX'?
 * @todo Can runGroupRunCount be computed by filtering Named Ranges by the prefix 'NRRunGroupXRunHeader'?
 */

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
  pageTemplate: 'Templates/App',
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
