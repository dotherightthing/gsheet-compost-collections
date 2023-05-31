/**
 * @file GccSheet.js
 */
class GccSheet {
  /**
   * @class
   * @summary Properties and methods relating to querying of the spreadsheet.
   * @param {object}  config                         - Module configuration.
   * @param {string}  config.appName                 - App name (used in the feedback email).
   * @param {Array}   config.computedNamedRangeNames - Named ranges which are computed by the app.
   * @param {string}  config.dateFormat              - Date format (used to locate the next run date)
   * @param {boolean} config.debug                   - Output debugging messages.
   * @param {Array}   config.namedRangeItems         - { name, description, validation } of the named ranges set in the spreadsheet (an array of objects).
   * @param {number}  config.runBlankRowsAfter       - Number of blank rows after a run (used to calculate run bounds).
   * @param {number}  config.runGroupCount           - Number of NRRunGroup items to process.
   * @param {number}  config.runGroupRunCount        - Number of NRRunGroupRunHeader items to process.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      appName,
      computedNamedRangeNames,
      dateFormat,
      debug,
      helpLinks,
      namedRangeItems,
      runBlankRowsAfter,
      runGroupCount,
      runGroupRunCount,
    } = config;

    Object.assign(this, {
      appName,
      computedNamedRangeNames,
      dateFormat,
      debug,
      helpLinks,
      namedRangeItems,
      runBlankRowsAfter,
      runGroupCount,
      runGroupRunCount,
    });
  }

  /* Getters and Setters */

  /**
   * appName
   *
   * @type {string}
   * @memberof GccSheet
   */
  get appName() {
    return this._appName;
  }

  set appName(appName) {
    this._appName = GccValidate.validate(appName, 'string1', 'GccSheet.appName');
  }

  /**
   * computedNamedRangeNames
   *
   * @type {Array}
   * @memberof GccSheet
   */
  get computedNamedRangeNames() {
    return this._computedNamedRangeNames;
  }

  set computedNamedRangeNames(computedNamedRangeNames) {
    this._computedNamedRangeNames = GccValidate.validate(computedNamedRangeNames, 'Array', 'GccSheet.computedNamedRangeNames');
  }

  /**
   * dateFormat
   *
   * @type {string}
   * @memberof GccSheet
   */
  get dateFormat() {
    return this._dateFormat;
  }

  set dateFormat(dateFormat) {
    this._dateFormat = GccValidate.validate(dateFormat, 'string1', 'GccSheet.dateFormat');
  }

  /**
   * debug
   *
   * @type {boolean}
   * @memberof GccSheet
   */
  get debug() {
    return this._debug;
  }

  set debug(debug) {
    this._debug = GccValidate.validate(debug, 'boolean', 'GccSheet.debug');
  }

  /**
   * helplinks
   *
   * @type {Array}
   * @memberof GccSheet
   */
  get helplinks() {
    return this._helplinks;
  }

  set helplinks(helplinks) {
    this._helplinks = GccValidate.validate(helplinks, 'Array', 'GccSheet.helplinks');
  }

  /**
   * instance
   *
   * @type {GccSheet}
   * @memberof GccSheet
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * namedRangeItems
   *
   * @type {Array}
   * @memberof GccSheet
   */
  get namedRangeItems() {
    return this._namedRangeItems;
  }

  set namedRangeItems(namedRangeItems) {
    this._namedRangeItems = GccValidate.validate(namedRangeItems, 'Array', 'GccSheet.namedRangeItems');
  }

  /**
   * namedRangeValues
   *
   * @type {object}
   * @memberof GccSheet
   */
  get namedRangeValues() {
    return this._namedRangeValues;
  }

  set namedRangeValues(namedRangeValues) {
    this._namedRangeValues = GccValidate.validate(namedRangeValues, 'object', 'GccSheet.namedRangeValues');
  }

  /**
   * runBlankRowsAfter
   *
   * @type {number}
   * @memberof GccSheet
   */
  get runBlankRowsAfter() {
    return this._runBlankRowsAfter;
  }

  set runBlankRowsAfter(runBlankRowsAfter) {
    this._runBlankRowsAfter = GccValidate.validate(runBlankRowsAfter, 'number', 'GccSheet.runBlankRowsAfter');
  }

  /**
   * runGroupCount
   *
   * @type {number}
   * @memberof GccSheet
   */
  get runGroupCount() {
    return this._runGroupCount;
  }

  set runGroupCount(runGroupCount) {
    this._runGroupCount = GccValidate.validate(runGroupCount, 'number', 'GccSheet.runGroupCount');
  }

  /**
   * runGroupRunCount
   *
   * @type {number}
   * @memberof GccSheet
   */
  get runGroupRunCount() {
    return this._runGroupRunCount;
  }

  set runGroupRunCount(runGroupRunCount) {
    this._runGroupRunCount = GccValidate.validate(runGroupRunCount, 'number', 'GccSheet.runGroupRunCount');
  }

  /* Instance methods */

  /**
   * cacheLog
   *
   * @summary Show the contents of the cache
   * @returns {*} Open link
   * @memberof GccSheet
   */
  cacheLog() {
    let log = GccCache.logCache();
    log = JSON.stringify(log, null, 2);

    return this.showLog(log);
  }

  /**
   * focusNR
   *
   * @summary Activate a specific sheet/tab in the current spreadsheet and focus a named range in it
   *  (from a custom menu item).
   * @param {string} namedRangeName Named Range name
   * @memberof GccSheet
   * @see {@link https://spreadsheet.dev/navigation-menu-in-google-sheets}
   */
  focusNR(namedRangeName) {
    const namedRange = this.getNamedRange(namedRangeName);
    const sheet = namedRange.getSheet();
    const sheetName = sheet.getName();

    SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
    SpreadsheetApp.setActiveRange(namedRange);
  }

  /**
   * getActiveSpreadsheet
   *
   * @summary Get the active spreadsheet (container-bound script) or the configured spreadsheet (standalone script)
   * @returns {object} activeSheet
   * @memberof GccSheet
   */
  getActiveSpreadsheet() {
    let activeSheet = SpreadsheetApp.getActiveSpreadsheet();

    // support debugging from standalone GAS IDE
    if (activeSheet === null) {
      const { env } = GccEnv.getInstance();

      const {
        scriptTypeAbbr,
        spreadsheetId,
      } = env;

      activeSheet = SpreadsheetApp.openById(spreadsheetId);

      // eslint-disable-next-line no-console
      console.log(`No active spreadsheet, running script on https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit from "${scriptTypeAbbr}"`);
    }

    return activeSheet;
  }

  /**
   * getAllNamedRangeValues
   *
   * @summary Retrieve, validate and cache all named ranges upfront, to mitigate app failure due to bad input.
   *  Note: arguments are passed in rather than retrieved from the instantiated class
   *  as this function is called during instantiation
   * @returns {object} namedRangeValues
   * @memberof GccSheet
   * @see {@link https://stackoverflow.com/questions/35288998/how-to-remove-data-validations}
   */
  getAllNamedRangeValues() {
    const {
      computedNamedRangeNames,
      namedRangeItems,
    } = this;

    const cacheKey = 'namedRangeValues';
    let errorMessages = [];
    let namedRangeValues = GccCache.getCacheItem(cacheKey);

    if ((typeof namedRangeValues === 'object') && (namedRangeValues !== null)) {
      if (Object.keys(namedRangeValues).length === (namedRangeItems.length + computedNamedRangeNames.length)) {
        return namedRangeValues;
      }
    }

    namedRangeValues = {};

    namedRangeItems.forEach((namedRangeName) => {
      const {
        name,
        validation,
      } = namedRangeName;

      let val = this.getNamedRangeValues(name);

      if (typeof val === 'undefined') {
        throw new Error(`No named range values found for "${name}"`);
      }

      if (!Array.isArray(val)) {
        val = val[0]; // eslint-disable-line prefer-destructuring
      }

      namedRangeValues[name] = val;

      const namedRange = this.getNamedRange(name);
      const [ criteriaType, ...criteriaValues ] = validation;

      GccSheet.setRangeValidationCriteria(namedRange, criteriaType, criteriaValues);

      const { invalid } = GccSheet.validateRangeValues(namedRange);

      if (invalid.length) {
        errorMessages = [ ...errorMessages, ...invalid ];
      }
    });

    namedRangeValues.NRRunGroups = this.getNamedRangeRunGroups();

    GccCache.setCacheItem(cacheKey, namedRangeValues);

    if (errorMessages.length) {
      const errorMessagesStr = errorMessages.join('.\r\n');
      throw new Error(errorMessagesStr);
    }

    return namedRangeValues;
  }

  /**
   * getLastRowIndex
   *
   * @summary Get the index of the last row in the spreadsheet.
   * @param {string} sheetName Sheet name
   * @param {string} footer Text in footer row
   * @returns {number} lastRowIndex
   * @memberof GccSheet
   * @see {@link GccTest#runIntegrationTests}
   * @todo Replace with footerRowIndex
   */
  getLastRowIndex(sheetName, footer) {
    const { runBlankRowsAfter } = this;

    const footerIndex = GccSheet.getRowIndex(sheetName, footer);
    const footerSelf = 1;
    const lastRowIndex = (footerIndex - footerSelf - runBlankRowsAfter);

    return lastRowIndex;
  }

  /**
   * getMenu
   *
   * @summary Get the custom menu which is displayed in the spreadsheet.
   * @returns {object} menu
   * @memberof GccSheet
   */
  getMenu() {
    const {
      helpLinks,
      namedRangeItems,
      runGroupCount,
      runGroupRunCount,
    } = this;

    const runGroupNamedRangeItems = [
      {
        name: 'NRRunGroupXColumnHeaders',
        description: 'Column Headers',
      },
      {
        name: 'NRRunGroupXPreRunHeader',
        description: 'Pre Run Header',
      },
      {
        name: 'NRRunGroupXPostRunHeader',
        description: 'Post Run Header',
      },
      {
        name: 'NRRunGroupXFooter',
        description: 'Footer',
      },
      {
        name: 'NRRunGroupXRunHeaderY',
        description: 'Run Header Y',
      },
    ];

    const internalDocumentation = helpLinks[0];
    const ui = SpreadsheetApp.getUi();

    // GCC Help

    const menu = ui.createMenu('GCC Help');

    // GCC Help > Setup

    const menuSetup = ui.createMenu('Setup');

    menuSetup.addItem(`Open ${internalDocumentation.label} (in new window)`, 'GsheetCompostCollections.gccMiddlewareOpenLinkInternalDocumentation');
    menuSetup.addItem('Open GCC Wiki (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkWiki');
    menuSetup.addItem('Edit Configuration File', 'GsheetCompostCollections.gccMiddlewareOpenLinkConfig');

    // GCC Help > Setup > Edit App Interface

    const menuInterface = ui.createMenu('Edit App Interface');

    // GCC Help > Setup > Edit Collection Inputs

    const menuCollectionInputs = ui.createMenu('Edit Collection Inputs');

    namedRangeItems.forEach((namedRangeItem) => {
      const {
        description,
        name,
        usage,
      } = namedRangeItem;

      if (usage === 'App Interface') {
        menuInterface.addItem(`Edit ${description} (${name})`, `GsheetCompostCollections.gccMiddlewareFocus${name}`);
      } else if (usage === 'Collection Inputs') {
        menuCollectionInputs.addItem(`Edit ${description} (${name})`, `GsheetCompostCollections.gccMiddlewareFocus${name}`);
      }
    });

    menuCollectionInputs.addItem('Regenerate Collection Inputs (checkboxes and dropdowns)', 'GsheetCompostCollections.gccMiddlewareSetDateValidation');

    menuSetup.addSubMenu(menuInterface);
    menuSetup.addSubMenu(menuCollectionInputs);

    // GCC Help > Setup > Edit Run Groups

    const menuRunGroups = ui.createMenu('View Run Groups');

    for (let g = 0; g < runGroupCount; g += 1) {
      // GCC Help > Setup > Edit Run Groups > Run Group 1

      const menuRunGroup = ui.createMenu(`Run Group ${g + 1}`);

      runGroupNamedRangeItems.forEach((item) => {
        const {
          description,
          name,
        } = item;

        const indexedName = name.replace('X', g + 1);
        const indexedDescription = description.replace('X', g + 1);

        if (name === 'NRRunGroupXRunHeaderY') {
          for (let r = 0; r < runGroupRunCount; r += 1) {
            const indexedName2 = indexedName.replace('Y', r + 1);
            const indexedDescription2 = indexedDescription.replace('Y', r + 1);
            menuRunGroup.addItem(`View ${indexedDescription2} (${indexedName2})`, `GsheetCompostCollections.gccMiddlewareFocus${indexedName2}`);
          }
        } else {
          menuRunGroup.addItem(`View ${indexedDescription} (${indexedName})`, `GsheetCompostCollections.gccMiddlewareFocus${indexedName}`);
        }
      });

      menuRunGroups.addSubMenu(menuRunGroup);
    }

    menuSetup.addSubMenu(menuRunGroups);
    menu.addSubMenu(menuSetup);
    menu.addSeparator();

    // GCC Help > Users

    const menuUsers = ui.createMenu('Users');

    // Add Test users (external to the organisation) - GCP IAM ADMIN ---> GCC Help > Manage Test Users in OAUTH Admin
    menuUsers.addItem('Manage Test Users in OAUTH Admin (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkTestUsers');
    // Add Project editors who can in turn add Test users
    menuUsers.addItem('Manage Project Permissions in IAM Admin (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkPermissions');
    menu.addSubMenu(menuUsers);
    menu.addSeparator();

    // GCC Help > Mobile App

    const menuMobileApp = ui.createMenu('Mobile App');

    menuMobileApp.addItem('Open STABLE App (in popup window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkAppStable');
    menuMobileApp.addItem('View STABLE App Version History', 'GsheetCompostCollections.gccMiddlewareShowVersionHistory');
    menuMobileApp.addItem('Open DEV App (in popup window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkAppDev');
    menu.addSubMenu(menuMobileApp);
    menu.addSeparator();

    // GCC Help > Cache

    const menuCache = ui.createMenu('Cache');

    menuCache.addItem('Clear Cache', 'GsheetCompostCollections.gccMiddlewareCacheClear');
    menuCache.addItem('View Cache', 'GsheetCompostCollections.gccMiddlewareCacheLog');
    menuCache.addItem('View Cache Help', 'GsheetCompostCollections.gccMiddlewareShowSidebarHelpCache');
    menu.addSubMenu(menuCache);
    menu.addSeparator();

    // GCC Help > Code

    const menuCode = ui.createMenu('Code');

    menuCode.addItem('Open Code Repository (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkCodeRepository');
    menuCode.addItem('Open Code Documentation (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkCodeDocumentation');
    menuCode.addItem('Report a Code Issue (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkCodeIssue');
    menuCode.addItem('Run Integration Tests (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkCodeIntegrationTests');
    menuCode.addItem('Run Unit Tests (in new window)', 'GsheetCompostCollections.gccMiddlewareOpenLinkCodeUnitTests');
    menu.addSubMenu(menuCode);

    return menu;
  }

  /**
   * getNamedRange
   *
   * @param {string} name Name
   * @returns {Range} namedRange
   * @memberof GccSheet
   */
  getNamedRange(name) {
    const { spreadsheetId } = GccEnv.getInstance();

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const namedRanges = ss.getNamedRanges();
    let namedRange = null;

    if (namedRanges.length === 0) {
      throw new Error('Spreadsheet does not contain any named ranges');
    }

    namedRanges.forEach((_namedRange) => {
      const namedRangeName = _namedRange.getName();
      if (namedRangeName.indexOf(name) !== -1) {
        namedRange = _namedRange.getRange();
      }
    });

    if (namedRange === null) {
      throw new Error(`Spreadsheet does not contain the named range "${name}"`);
    }

    return namedRange;
  }

  /**
   * getNamedRangeBackgrounds
   *
   * @summary Simple wrapper function to support stubbing in unit tests.
   * @param {string} name Name
   * @returns {Array} namedRangeBackgrounds
   * @memberof GccSheet
   */
  getNamedRangeBackgrounds(name) {
    const namedRange = this.getNamedRange(name);

    return namedRange.getBackgrounds();
  }

  /**
   * getNamedRangeFontColors
   *
   * @summary Simple wrapper function to support stubbing in unit tests.
   * @param {string} name Name
   * @returns {Array} namedRangeFontColors
   * @memberof GccSheet
   */
  getNamedRangeFontColors(name) {
    const namedRange = this.getNamedRange(name);

    return namedRange.getFontColors();
  }

  /**
   * getNamedRangeRunGroups
   *
   * @summary Build runGroups object from named ranges. Called once by GccSheet.getAllNamedRangeValues.
   * @returns {Array} runGroups
   * @memberof GccSheet
   * @todo Change postRunExtras to postRunExtrasName
   * @todo Change preRunExtras to preRunExtrasName
   */
  getNamedRangeRunGroups() {
    const {
      dateFormat,
      runGroupCount,
      runGroupRunCount,
    } = this;

    const NRRunGroups = [];
    let g;
    let r;

    // get named ranges for NRRunGroup1, NRRunGroup2 etc
    for (g = 1; g <= runGroupCount; g += 1) {
      const columnHeaders = `NRRunGroup${g}ColumnHeaders`;
      const columnHeaderValues = this.getNamedRangeValues(columnHeaders);
      const columnHeaderRange = this.getNamedRange(columnHeaders);
      const runNames = [];
      const columnHeaderIndices = {};
      const columnHeaderColIndex = columnHeaderRange.getColumn();
      const columnHeaderRowIndex = columnHeaderRange.getRow();

      for (r = 1; r <= runGroupRunCount; r += 1) {
        const runName = this.getNamedRangeValue(`NRRunGroup${g}RunHeader${r}`);

        runNames.push(runName);
      }

      columnHeaderValues.forEach((columnHeader, i) => {
        columnHeaderIndices[columnHeader.toLowerCase()] = columnHeaderColIndex + i;
      });

      const runGroup = new GccRunGroup({
        dateFormat,
        footer: this.getNamedRangeValue(`NRRunGroup${g}Footer`),
        preRunExtras: this.getNamedRangeValue(`NRRunGroup${g}PreRunHeader`),
        postRunExtras: this.getNamedRangeValue(`NRRunGroup${g}PostRunHeader`),
        runNames,
        sheetName: columnHeaderRange.getSheet().getName(),
        columnHeaderIndices,
        columnHeaderRowIndex,
      });

      NRRunGroups.push(runGroup);
    }

    // note: results are cached by calling function
    return NRRunGroups;
  }

  /**
   * getNamedRangeValue
   *
   * @param {string} name Name
   * @returns {*} namedRangeValue
   * @memberof GccSheet
   */
  getNamedRangeValue(name) {
    return this.getNamedRangeValues(name, true);
  }

  /**
   * getNamedRangeValues
   *
   * @param {string} name Name
   * @param {boolean} onlyFirst Whether to return only the first value
   * @returns {Array} namedRangeValues
   * @memberof GccSheet
   * @see {@link GccTest#runIntegrationTests}
   */
  getNamedRangeValues(name, onlyFirst = false) {
    const namedRange = this.getNamedRange(name);

    let namedRangeValues = [];

    if (namedRange) {
      namedRangeValues = namedRange.getValues().flat(); // eslint-disable-line prefer-destructuring
      namedRangeValues = namedRangeValues.filter((rangeItem) => rangeItem !== '');
    }

    return onlyFirst ? namedRangeValues[0] : namedRangeValues;
  }

  /**
   * getRangeValues
   *
   * @summary Called by client-side JS on page load to populate the form with the values in the spreadsheet.
   * @param {string} runName Run name
   * @param {string} runDate Run date
   * @returns {Array} Range values
   * @memberof GccSheet
   * @see {@link GccTest#runIntegrationTests}
   */
  getRangeValues(runName, runDate) {
    const run = GccRun.getInstanceFromCache(runName);
    const runDatesRange = run.getColumnRange(runDate);
    const rangeValues = runDatesRange.getValues();

    const valuesArr = [];
    const f = rangeValues.flat();

    for (let r = 0; r < f.length; r += 1) {
      valuesArr.push(rangeValues[r][0]);
    }

    return valuesArr;
  }

  /**
   * getTimeZone
   *
   * @returns {string} timezone Region/City
   * @memberof GccSheet
   */
  getTimeZone() {
    const { env } = GccEnv.getInstance();
    const { spreadsheetId } = env;
    const ss = SpreadsheetApp.openById(spreadsheetId);

    // File > Settings > Time zone
    // note: master spreadsheet has no timezone set, but still returns "Pacific/Auckland"
    // this is the setting in appsscript.json, which may influence this?
    const timezone = ss.getSpreadsheetTimeZone();

    return timezone;
  }

  /**
   * handleChangedColumnValue
   *
   * @summary Update the date validation (dropdown options) when relevant fields (container & quantity) are edited
   * @param {object} e Event object
   * @param {string} columnName Column name
   * @memberof GccSheet
   * @todo Get index of last date and run if edit was to the column to the right of this (line 70)
   */
  handleChangedColumnValue(e, columnName) {
    // If the edited sheet is not the suburbs or town runSheet, then exit
    // cannot use GccSheet.getRunSheet(sheetName); here as it calls SpreadsheetApp.openById
    // which throws a permission error
    // see https://stackoverflow.com/a/55279525/6850747
    const sheetName = e.source.getSheetName();
    const runGroup = GccRunGroup.getInstanceFromCache(sheetName);

    if (runGroup === null) {
      // console.log(`Edit ignored - ${sheetName} not in runGroups`);
      return;
    }

    // If the Variables sheet is missing, then exit
    // const variablesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Variables');

    // if (variablesSheet === null) {
    //   console.log('Edit ignored - Variables sheet missing');
    //   return;
    // }

    const activeRange = e.source.getActiveRange();
    const activeColIndex = activeRange.getColumn();
    const activeRowIndex = activeRange.getRow();

    const { columnHeaderIndices } = runGroup;
    let targetColIndex = columnHeaderIndices[columnName];

    if (typeof targetColIndex === 'undefined') {
      targetColIndex = GccSheet.getColumnIndex(sheetName, columnName);
    }

    if ((activeColIndex === targetColIndex) && (activeRowIndex > 1)) {
      // const newValue = activeRange.getValue();
      // console.log('column #%s edited - new value = %s', activeColIndex, newValue);

      if ((columnName === 'Container') || (columnName === 'Quantity')) {
        GccSheet.setDateValidation(runGroup, activeRowIndex);
      }
    }
  }

  /**
   * handleEdit
   *
   * @summary Run when the spreadsheet is edited.
   * @param {object} e Event object
   * @memberof GccSheet
   * @todo Clear cache if any/specific fields edited
   */
  handleEdit(e) { // eslint-disable-line no-unused-vars
    this.handleChangedColumnValue(e, 'Container');
    this.handleChangedColumnValue(e, 'Quantity');
  }

  /**
   * handleOpen
   *
   * @summary Add custom menu when the spreadsheet is opened.
   * For each namedRangeItem there must be a matching function in gsheet-compost-collections/src/Middleware.js, see example below
   * @memberof GccSheet
   * @todo Only show App Links if user has access
   * @todo Document how to add the Named Ranges to the spreadsheet
   * @todo Add Bitly QR Codes for STABLE/DEV APP in popups
   * @example
   * // example of adding a namedRangeItem to gsheet-compost-collections/src/Middleware.js
   * function gccMiddlewareFocusNRDateFlags() {
   *   return gccMiddleware('GccSheet.focusNR', 'NRDateFlags');
   * }
   */
  handleOpen() {
    const { env } = GccEnv.getInstance();
    const { scriptTypeAbbr } = env;

    if (scriptTypeAbbr !== 'CB') {
      return;
    }

    const menu = this.getMenu();

    menu.addToUi();
  }

  /**
   * setDateValidation
   *
   * @summary Apply data validation rules to all visible date cells in one row or all rows.
   * @param {object} runGroup Run group
   * @param {number|null} [rowIndex] Row index
   * @memberof GccSheet
   */
  setDateValidation(runGroup = null, rowIndex = null) {
    GccSheet.getInstance().showNotification('Updating collection inputs');

    GccCache.clearCacheItem(''); // '' deletes '_cache' while retaining '_cache_config'

    if ((runGroup !== null) && (rowIndex !== null)) {
      // one row
      GccSheet.getInstance().setDateValidationRow(runGroup, rowIndex);
    } else {
      // all rows
      GccSheet.getInstance().setDateValidationRows();
    }
  }

  /**
   * setDateValidationRow
   *
   * @summary Apply data validation rules to all visible date cells in one row.
   * @param {object} runGroup Run group
   * @param {number|null} [rowIndex] Row index
   * @returns {string} Success message
   * @memberof GccSheet
   */
  setDateValidationRow(runGroup, rowIndex) {
    const activeSpreadsheet = GccSheet.getInstance().getActiveSpreadsheet();
    const runSheet = activeSpreadsheet.getActiveSheet();

    const {
      dateHeaderRangeA1Notation,
      sheetName,
    } = runGroup;

    const {
      type: typeColumnIndex,
      container: containerColumnIndex,
      quantity: quantityColumnIndex,
    } = runGroup.columnHeaderIndices;

    // getRange(row, column, number of rows, number of columns)
    const dateHeadersRange = runSheet.getRange(dateHeaderRangeA1Notation);
    const type = runSheet.getRange(rowIndex, typeColumnIndex, 1, 1).getValue();
    const _container = runSheet.getRange(rowIndex, containerColumnIndex, 1, 1).getValue();
    const _quantity = runSheet.getRange(rowIndex, quantityColumnIndex, 1, 1).getValue();

    if ((_container !== '') && (Number(_quantity) > 0)) {
      // TODO will the instance exist yet if the administrator is not using the app, or only if another user has used the app before they administrate?
      const container = GccContainer.getInstanceFromCache(_container.toLowerCase(), _quantity);

      // one row
      GccSheet.setDateValidationCriteria(sheetName, dateHeadersRange, rowIndex, type, container, false);

      return `Data validation rules applied to all visible date cells in row ${rowIndex}`;
    }

    return `Missing fields - Data validation rules NOT applied to all visible date cells in row ${rowIndex}`;
  }

  /**
   * setDateValidationRows
   *
   * @summary Apply data validation rules to all visible date cells in all rows. Used on handleOpen, rather than when a particular row has been updated.
   * @returns {string} Success message
   * @memberof GccSheet
   * @todo Document why preRunExtras and postRunExtras are added below rather than in getNamedRangeRunGroups, e.g. to limit what appears in Run A/B dropdown?
   */
  setDateValidationRows() {
    const {
      NRRunGroups,
    } = this.getAllNamedRangeValues();

    const appConfig = GccUtils.getAppConfig('GccSheet.setDateValidationRows');
    const runGroupInstances = [];
    let lastSheetName;
    let runGroupInstance;

    NRRunGroups.forEach((runGroup) => {
      // cache instance
      runGroupInstance = GccUtils.objectToClassInstance(runGroup, 'GccRunGroup');
      runGroupInstances.push(runGroupInstance);
    });

    runGroupInstances.forEach((runGroup) => {
      const {
        dateHeadersFormatted,
        dateHeaderRangeA1Notation,
        postRunExtras,
        preRunExtras,
        runNames,
        sheetName,
      } = runGroup;

      const runSheet = GccSheet.getRunSheet(sheetName);

      // run 1x per sheet containing 2x run groups
      if (sheetName !== lastSheetName) {
        runSheet.clearConditionalFormatRules();
        lastSheetName = sheetName;
      }

      const dateHeadersRange = runSheet.getRange(dateHeaderRangeA1Notation);

      // don't overwrite runGroup
      const runsCopy = [ ...runNames ];

      runsCopy.splice(0, 0, preRunExtras);
      runsCopy.push(postRunExtras);

      runsCopy.forEach((runName) => {
        let run = GccRun.getInstanceFromCache(runName);

        // null is expected if this function is run before the run has been selected in the app
        if (run === null) {
          const {
            abbreviations,
            collectionMapLocale,
            containerVolumeFractions,
            runBlankRowsAfter,
          } = appConfig;

          run = new GccRun({
            abbreviations,
            collectionMapLocale,
            containerVolumeFractions,
            name: runName,
            nextRunName: runGroup.getNextRunName(runName),
            runBlankRowsAfter,
          });
        }

        // all ranges except date, which is handled below
        const ranges = run.getCollectionRanges();

        const {
          runBounds,
        } = run;

        const {
          startRowIndex,
        } = runBounds;

        // create and cache GccContainer instances by querying a single date
        run.getCollections(dateHeadersFormatted[0]);

        dateHeadersFormatted.forEach((dateHeader) => {
          const runDatesRange = run.getColumnRange(dateHeader);

          runDatesRange.clearDataValidations();
        });

        // apply colour scheme
        GccSheet.setConditionalFormatting(runName);

        const {
          containerRange,
          quantityRange,
          typeRange,
        } = ranges;

        const containers = containerRange.getValues(); // top to bottom: [['Bucket'], ['Bucket']]
        const quantities = quantityRange.getValues(); // top to bottom: [[1], [1]]
        const types = typeRange.getValues();

        // apply data validation
        containers.forEach((_container, index) => {
          const _quantity = quantities[index][0];

          if ((_container[0] !== '') && (Number(_quantity) > 0)) {
            const container = GccContainer.getInstanceFromCache(_container[0].toLowerCase(), _quantity); // get cached instance of GccContainer
            const lastRow = (index === (containers.length - 1));
            const rowIndex = startRowIndex + index;
            const type = types[index][0];

            // If the instance was in the cache
            // + bypass errors like 'Container with type "" and quantity "0" is not in cache'
            if (container !== null) {
              GccSheet.setDateValidationCriteria(
                sheetName,
                dateHeadersRange,
                rowIndex,
                type,
                container,
                lastRow,
              );
            }
          }
        });
      });
    });

    return 'Data validation rules applied to all visible date cells in all rows';
  }

  /**
   * showLog
   *
   * @summary Show contents of cache in modal (container-bound script) or console (standalone script)
   * @param {string} log Cache log
   * @memberof GccSheet
   */
  showLog(log) {
    const { env } = GccEnv.getInstance();
    const { scriptTypeAbbr } = env;

    // container-bound script
    if (scriptTypeAbbr === 'CB') {
      const html = `<pre>${log}</pre>`;

      const htmlOutput = HtmlService
        .createHtmlOutput(html)
        .setWidth(800)
        .setHeight(400);

      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Cache Log');
    } else {
      console.log(log); // eslint-disable-line no-console
    }
  }

  /**
   * showNotification ('toast')
   *
   * @summary Displays a temporary notification within a spreadsheet
   * @param {string} message Message
   * @param {string} title Title
   * @param {number} duration Duration (seconds)
   * @memberof GccSheet
   * @see {@link https://spreadsheet.dev/toast-notifications-in-google-sheets}
   */
  showNotification(message, title = 'GCC', duration = 5) {
    const { env } = GccEnv.getInstance();
    const { scriptTypeAbbr } = env;

    // container-bound script
    if (scriptTypeAbbr === 'CB') {
      const activeSpreadsheet = GccSheet.getInstance().getActiveSpreadsheet();

      activeSpreadsheet.toast(message, title, duration);
    }
  }

  /**
   * showSidebar
   *
   * @summary Show the sidebar, which is used to display contextual help.
   * @param {string} section Help section
   * @memberof GccSheet
   */
  showSidebarHelp(section) {
    const widget = HtmlService.createHtmlOutputFromFile('_Help/SidebarHelpCache.html');

    widget.setTitle(`GCC Help: ${section}`);

    SpreadsheetApp.getUi().showSidebar(widget);
  }

  /**
   * showVersionHistory
   *
   * @summary Show version history in a modal
   * @memberof GccSheet
   */
  showVersionHistory() {
    const styles = `<style>
  table {
    border-collapse: collapse;
    font-family: sans-serif;
    font-size: .9rem;
    line-height: 1.35;
    margin: -4px;
  }
  thead > tr {
    border-bottom: 1px solid #ddd;
  }
  th,
  td {
    text-align: left;
    vertical-align: top;
  }
  th {
    text-transform: uppercase;
    font-size: .95em;
    padding: 0 .75rem .75rem 0;
  }
  td {
    padding: .75rem .75rem 0 0;
  }
  td:nth-child(1),
  td:nth-child(2) {
    white-space: nowrap;
  }
</style>`;

    const html = GccPage.include('Partials/VersionHistory.part');

    const htmlOutput = HtmlService
      .createHtmlOutput(styles + html)
      .setWidth(800)
      .setHeight(400);

    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Version History');
  }

  /* Static methods */

  /**
   * getCellByString
   *
   * @summary Get a reference to spreadsheet cells containing the specified text.
   * @param {string} sheetName Sheet name
   * @param {string} cellText Cell text
   * @returns {Range} Range object
   * @memberof GccSheet
   * @static
   * @see {@link GccTest#runIntegrationTests}
   */
  static getCellByString(sheetName, cellText) {
    let match = [];
    const runSheet = GccSheet.getRunSheet(sheetName);

    try {
      match = runSheet.createTextFinder(cellText).matchEntireCell(true).findNext();
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    return match;
  }

  /**
   * getColumnIndex
   *
   * @summary Get the number of the spreadsheet column containing the specified text (to find the column headers).
   *  Note: this is an expensive operation as getCellByString uses createTextFinder to search the entire sheet.
   * @param {string} sheetName Sheet name
   * @param {string} cellText Cell text
   * @returns {number} columnIndex
   * @memberof GccSheet
   * @static
   * @see {@link GccTest#runIntegrationTests}
   * @see {@link https://stackoverflow.com/a/64289303}
   * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getColumn()})
   * @todo For dates follow technique of setDateValidationCriteria - dateHeadersRange.getColumn() + offset
   */
  static getColumnIndex(sheetName, cellText) {
    const cacheKey = `column-index-${GccUtils.stringToId(sheetName)}-${GccUtils.stringToId(cellText)}`;
    let columnIndex = GccCache.getCacheItem(cacheKey);

    if (typeof columnIndex === 'number') {
      return columnIndex;
    }

    const match = GccSheet.getCellByString(sheetName, cellText);

    if (match) {
      columnIndex = match.getColumn();
      columnIndex = parseInt(columnIndex, 10);
    }

    GccCache.setCacheItem(cacheKey, columnIndex);

    return columnIndex;
  }

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccSheet} instance of class
   * @memberof GccSheet
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccSheet.getInstance');
      }

      this.instance = new GccSheet(_config);
    }

    return this.instance;
  }

  /**
   * getRowIndex
   *
   * @summary Get the number of the spreadsheet row containing the specified text, to find the runs start and end rows.
   * @param {string} sheetName Sheet name
   * @param {string} cellText Cell text
   * @returns {number} rowIndex
   * @memberof GccSheet
   * @static
   * @see {@link GccTest#runIntegrationTests}
   */
  static getRowIndex(sheetName, cellText) {
    let rowIndex = null;
    const match = GccSheet.getCellByString(sheetName, cellText);

    // match is a range so always exists even if blank
    if (match) {
      rowIndex = match.getRow();
      rowIndex = parseInt(rowIndex, 10);
    }

    return rowIndex;
  }

  /**
   * getRunSheet
   *
   * @summary Get suburbs or town spreadsheet sheet (if the user is allowed to access it).
   * @param {object} sheetName Sheet name
   * @returns {object} runSheet
   * @memberof GccSheet
   * @static
   * @see {@link GccTest#runIntegrationTests}
   */
  static getRunSheet(sheetName) {
    const { env } = GccEnv.getInstance();
    const { spreadsheetId } = env;
    let runSheet = null;

    try {
      runSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    return runSheet;
  }

  /**
   * openLink
   *
   * @summary Open a URL (from a custom menu item).
   * @param {string} linkUrl Link URL
   * @memberof GccSheet
   * @static
   * @see {@link https://stackoverflow.com/q/25980008/6850747}
   * @see {@link https://gist.github.com/tanaikech/9115c70eb83558d3af2eea656e4d9c67}
   */
  static openLink(linkUrl) {
    /* eslint-disable no-multi-str */
    /* eslint-disable no-useless-concat */
    /* eslint-disable prefer-template */
    /* eslint-disable quotes */
    const js = " \
      <" + "script> \
        window.open('" + linkUrl + "', '_blank'); \
        google.script.host.close(); \
      <" + "/script> \
    ";
    /* eslint-enable no-multi-str */
    /* eslint-enable no-useless-concat */
    /* eslint-enable prefer-template */
    /* eslint-enable quotes */

    const htmlOutput = HtmlService
      .createHtmlOutput(js)
      .setWidth(100)
      .setHeight(10);

    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Launching web page in new tab/window');
  }

  /**
   * openLinkPhoneSize
   *
   * @summary Open a URL (from a custom menu item).
   * @param {string} linkUrl Link URL
   * @memberof GccSheet
   * @static
   * @see {@link https://stackoverflow.com/q/25980008/6850747}
   * @see {@link https://gist.github.com/tanaikech/9115c70eb83558d3af2eea656e4d9c67}
   */
  static openLinkPhoneSize(linkUrl) {
    /* eslint-disable no-multi-str */
    /* eslint-disable no-useless-concat */
    /* eslint-disable prefer-template */
    /* eslint-disable quotes */
    const js = " \
      <" + "script> \
        window.open('" + linkUrl + "', '_blank', 'width=320, height=568'); \
        google.script.host.close(); \
      <" + "/script> \
    ";
    /* eslint-enable no-multi-str */
    /* eslint-enable no-useless-concat */
    /* eslint-enable prefer-template */
    /* eslint-enable quotes */

    const htmlOutput = HtmlService
      .createHtmlOutput(js)
      .setWidth(100)
      .setHeight(10);

    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Launching web page in popup');
  }

  /**
   * setConditionalFormatting
   *
   * @param {string} runName Run name
   * @memberof GccSheet
   * @static
   */
  static setConditionalFormatting(runName) {
    let run = GccRun.getInstanceFromCache(runName);

    if (run === null) {
      const runGroup = GccRun.getRunGroup(runName);

      run = new GccRun({
        name: runName,
        nextRunName: runGroup.getNextRunName(runName),
      });
    }

    const {
      runGroup,
    } = run;

    const {
      dateHeadersFormatted,
      sheetName,
    } = runGroup;

    const colors = GccColor.getInstance().getColors();
    const runSheet = GccSheet.getRunSheet(sheetName);
    const rules = runSheet.getConditionalFormatRules();

    dateHeadersFormatted.forEach((dateHeader) => {
      const runDatesRange = run.getColumnRange(dateHeader);

      colors.forEach((collectionColor) => {
        // Create a conditional formatting object
        const rule = SpreadsheetApp.newConditionalFormatRule()
          .whenTextEqualTo(collectionColor.valueRaw)
          .setBackground(collectionColor.backgroundColorHex)
          .setFontColor(collectionColor.colorHex)
          .setRanges([ runDatesRange ])
          .build();

        rules.push(rule);
      });
    });

    runSheet.setConditionalFormatRules(rules);
  }

  /**
   * setDateValidationCriteria
   *
   * @summary Apply data validation rules to all visible date cells in one row.
   *  This transforms TRUE/FALSE values to checkboxes and volume values to list dropdowns.
   * @param {string} sheetName Sheet name
   * @param {Range} dateHeadersRange Date headers range
   * @param {number} rowIndex Row index
   * @param {string} type Type (uppercase in range)
   * @param {object} container Instance of GccContainer
   * @param {boolean} lastRow Last row
   * @memberof GccSheet
   * @static
   */
  static setDateValidationCriteria(sheetName, dateHeadersRange, rowIndex, type, container, lastRow = false) {
    // because GccCollection.dateFlags is not available here
    const {
      NRDateFlags: dateFlags,
    } = GccSheet.getInstance().getAllNamedRangeValues();

    const runSheet = GccSheet.getRunSheet(sheetName);
    const dateHeadersRangeStartColIndex = dateHeadersRange.getColumn();
    const dateHeaders = dateHeadersRange.getValues().flat();

    dateHeaders.forEach((dateHeader, i) => {
      const colIndex = dateHeadersRangeStartColIndex + i;

      // getRange(row, column, number of rows, number of columns)
      const range = runSheet.getRange(rowIndex, colIndex, 1, 1); // cell

      let criteriaType;
      let criteriaValues;
      let allowInvalid;

      if (type === 'X') {
        // X = Checklist
        criteriaType = 'CHECKBOX';
        criteriaValues = [];
        allowInvalid = false;
      } else {
        // B = Business, R = Residential, NP = Non-profit
        // Get allowed options for this row, informed by the container and the quantity

        const {
          quantity,
          type: _type,
          volumes,
        } = container;

        const volumesAndDateFlags = GccCollection.getVolumesAndDateFlags(dateFlags, quantity, _type, volumes, 'spreadsheet');
        criteriaType = 'VALUE_IN_LIST';
        criteriaValues = [ volumesAndDateFlags.split(',') ];
        allowInvalid = false;
      }

      GccSheet.setRangeValidationCriteria(range, criteriaType, criteriaValues, allowInvalid);

      // if last cell in (column) row
      if (lastRow) {
        let columnIndex = range.getColumn();
        columnIndex = parseInt(columnIndex, 10);

        // resize cell to accommodate the longest selected option
        runSheet.autoResizeColumn(columnIndex);
      }
    });
  }

  /**
   * setRangeValidationCriteria
   *
   * @summary Apply validation rules to a range.
   * @param {Range} range Range to add validation to
   * @param {string} criteriaType Criteria type
   * @param {Array} criteriaValues Criteria values
   * @param {boolean} allowInvalid whether to show a warning when input fails data validation or whether to reject the input entirely
   * @memberof GccSheet
   * @static
   */
  static setRangeValidationCriteria(range, criteriaType, criteriaValues, allowInvalid = true) {
    let criteria = null;

    if (criteriaType === 'CHECKBOX') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireCheckbox()
        .build();
    } else if (criteriaType === 'NUMBER_BETWEEN') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireNumberBetween(criteriaValues[0], criteriaValues[1])
        .build();
    } else if (criteriaType === 'NUMBER_EQUAL_TO') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireNumberEqualTo(criteriaValues[0])
        .build();
    } else if (criteriaType === 'NUMBER_GREATER_THAN') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireNumberGreaterThan(criteriaValues[0])
        .build();
    } else if (criteriaType === 'NUMBER_GREATER_THAN_OR_EQUAL_TO') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireNumberGreaterThanOrEqualTo(criteriaValues[0])
        .build();
    } else if (criteriaType === 'NUMBER_LESS_THAN') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireNumberLessThan(criteriaValues[0])
        .build();
    } else if (criteriaType === 'NUMBER_LESS_THAN_OR_EQUAL_TO') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireNumberLessThanOrEqualTo(criteriaValues[0])
        .build();
    } else if (criteriaType === 'NUMBER_NOT_EQUAL_TO') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireNumberNotEqualTo(criteriaValues[0])
        .build();
    } else if (criteriaType === 'TEXT_CONTAINS') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireTextContains(criteriaValues[0])
        .build();
    } else if (criteriaType === 'TEXT_DOES_NOT_CONTAIN') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireTextDoesNotContain(criteriaValues[0])
        .build();
    } else if (criteriaType === 'TEXT_EQUAL_TO') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireTextEqualTo(criteriaValues[0])
        .build();
    } else if (criteriaType === 'TEXT_IS_VALID_EMAIL') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireTextIsEmail()
        .build();
    } else if (criteriaType === 'TEXT_IS_VALID_URL') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireTextIsUrl()
        .build();
    } else if (criteriaType === 'VALUE_IN_LIST') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireValueInList(criteriaValues[0])
        .build();
    } else if (criteriaType === 'VALUE_IN_RANGE') {
      criteria = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(allowInvalid)
        .requireValueInRange(criteriaValues[0])
        .build();
    }

    if (criteria) {
      // remove any existing criteria
      range.setDataValidation(null);

      // add new criteria
      range.setDataValidation(criteria);
    }
  }

  /**
   * validateRangeValues
   *
   * @summary Test whether the data in the range is valid according to the validation rules present.
   * @param {Range} range Range
   * @param {Array|null} replacementValues A two-dimensional array of replacement values, indexed by row, then by column. Prevents a runtime error when using range.setValue() to set a value which does not meet the range's data validation criteria. try .. catch cannot be used to mitigate this.
   * @returns {object} results Results
   * @memberof GccSheet
   * @static
   * @see {@link GccTest#runIntegrationTests}
   * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getdatavalidations}
   * @see {@link https://stackoverflow.com/a/64993041}
   * @see {@link https://issuetracker.google.com/issues/36764218}
   * @see {@link https://issuetracker.google.com/issues/36763134#comment7}
   */
  static validateRangeValues(range, replacementValues = null) {
    // Returns a two-dimensional array of values, indexed by row, then by column:
    //
    // [
    //   [ row_1_col_1_value, row_1_col_2_value, row_1_col_3_value ],
    //   [ row_2_col_1_value, row_2_col_2_value, row_2_col_3_value ],
    //   [ row_3_col_1_value, row_3_col_2_value, row_3_col_3_value ],
    // ]
    const rangeValues = replacementValues || range.getValues();

    const results = {
      invalid: [],
      valid: [],
    };

    // Returns a matching two-dimensional array, of data validation rules associated with the cells in the range.
    // Each cell position contains the following object:
    //
    // { toString: [Function],
    //   copy: [Function],
    //   getCriteriaValues: [Function],
    //   getCriteriaType: [Function],
    //   getAllowInvalid: [Function],
    //   getHelpText: [Function]
    // }
    //
    // or:
    //
    // null
    const rules = range.getDataValidations();

    for (let i = 0; i < rules.length; i += 1) { // rows
      for (let j = 0; j < rules[i].length; j += 1) { // columns
        const cellRange = range.getCell(i + 1, j + 1);
        const cellRule = rules[i][j];
        const cellValue = rangeValues[i][j];
        let criteriaType;
        let criteriaValues;

        // If data validation has not been set on a given cell,
        // null is returned for that cell's position in the array.
        if (cellRule !== null) {
          // Get the rule's criteria type as defined in the DataValidationCriteria 'enum'
          // (a set of named identifiers that behave as constants).
          // The criteria type is an object of GAS validation methods, toJSON() returns the type name
          criteriaType = cellRule.getCriteriaType().toJSON();

          // Get an array of arguments for the cellRule's criteria:
          // Text, is a valid email: []
          // Number, greater than 0: [ 0 ]
          // List of items: [ [ 'Foo', 'Bar', 'Baz' ], true ]
          criteriaValues = cellRule.getCriteriaValues();
        } else {
          criteriaType = '';
          criteriaValues = [];
        }

        const { valid, message } = GccSheet.validateValue(criteriaType, criteriaValues, cellRange, cellValue);

        if (!valid) {
          results.invalid.push(message);
        } else {
          results.valid.push(message);
        }
      }
    }

    // console.log(results);

    return results;
  }

  /**
   * validateValue
   *
   * @summary Test whether a value is valid according to the validation rules supplied.
   * @param {string} criteriaType Criteria type
   * @param {Array} criteriaValues Criteria values
   * @param {Range} cellRange Cell range
   * @param {*} cellValue Value to validate
   * @returns {object} result
   * @memberof GccSheet
   * @static
   * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/data-validation-criteria?hl=en}
   * @see {@link https://stackoverflow.com/a/64993041}
   * @see {@link https://issuetracker.google.com/issues/36764218}
   * @see {@link https://ui.dev/validate-email-address-javascript}
   * @see {@link https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/}
   */
  static validateValue(criteriaType, criteriaValues, cellRange, cellValue) {
    let valid = true;
    let validExplanation = `${criteriaType} unsupported by GccSheet.validateValue`;

    if (criteriaType === 'CHECKBOX') {
      valid = (cellValue === 'true' || cellValue === 'false' || cellValue === '' || typeof cellValue === 'boolean');
      validExplanation = `${criteriaType} is true or false/empty`;
    } else if (criteriaType === 'NUMBER_BETWEEN') {
      valid = ((cellValue >= criteriaValues[0]) && (cellValue <= criteriaValues[1])) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]} and ${criteriaValues[1]}`;
    } else if (criteriaType === 'NUMBER_EQUAL_TO') {
      valid = ((typeof cellValue === 'number') && (cellValue === criteriaValues[0])) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'NUMBER_GREATER_THAN') {
      valid = ((typeof cellValue === 'number') && (cellValue > criteriaValues[0])) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'NUMBER_GREATER_THAN_OR_EQUAL_TO') {
      valid = ((typeof cellValue === 'number') && (cellValue >= criteriaValues[0])) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'NUMBER_LESS_THAN') {
      valid = ((typeof cellValue === 'number') && (cellValue < criteriaValues[0])) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'NUMBER_LESS_THAN_OR_EQUAL_TO') {
      valid = ((typeof cellValue === 'number') && (cellValue <= criteriaValues[0])) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'NUMBER_NOT_EQUAL_TO') {
      valid = ((typeof cellValue === 'number') && (cellValue !== criteriaValues[0])) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'TEXT_CONTAINS') {
      valid = (cellValue.indexOf(criteriaValues[0]) !== -1) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'TEXT_DOES_NOT_CONTAIN') {
      valid = (cellValue.indexOf(criteriaValues[0]) === -1) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'TEXT_EQUAL_TO') {
      valid = (cellValue === criteriaValues[0]) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0]}`;
    } else if (criteriaType === 'TEXT_IS_VALID_EMAIL') {
      valid = /\S+@\S+\.\S+/.test(cellValue) || (cellValue === '');
      validExplanation = criteriaType;
    } else if (criteriaType === 'TEXT_IS_VALID_URL') {
      const urlPattern = new RegExp('^(https?:\\/\\/)?' // validate protocol
+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // validate domain name
+ '((\\d{1,3}\\.){3}\\d{1,3}))' // validate OR ip (v4) address
+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // validate port and path
+ '(\\?[;&a-z\\d%_.~+=-]*)?' // validate query string
+ '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

      valid = urlPattern.test(cellValue);
      validExplanation = criteriaType;
    } else if (criteriaType === 'VALUE_IN_LIST') {
      valid = (criteriaValues[0].includes(cellValue)) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0].join(',')}`;
    } else if (criteriaType === 'VALUE_IN_RANGE') {
      const rangeValues = criteriaValues[0].getValues().flat();
      valid = (rangeValues.includes(cellValue)) || (cellValue === '');
      validExplanation = `${criteriaType} ${criteriaValues[0].getA1Notation()} (${rangeValues.join(',')})`;
    } else if ((criteriaType === 'DATE_AFTER')
      || (criteriaType === 'DATE_BEFORE')
      || (criteriaType === 'DATE_BETWEEN')
      || (criteriaType === 'DATE_EQUAL_TO')
      || (criteriaType === 'DATE_IS_VALID_DATE')
      || (criteriaType === 'DATE_NOT_BETWEEN')
      || (criteriaType === 'DATE_ON_OR_AFTER')
      || (criteriaType === 'DATE_ON_OR_BEFORE')
      || (criteriaType === 'NUMBER_NOT_BETWEEN')
      || (criteriaType === 'CUSTOM_FORMULA')) {
      valid = true;
      validExplanation = `${criteriaType} unsupported by GccSheet.validateValue`;
    } else {
      valid = true;
      validExplanation = `${criteriaType} unsupported by GccSheet.validateValue`;
    }

    return {
      valid,
      message: `"${cellValue}" is ${valid ? '' : 'not '}a valid value for cell ${cellRange.getA1Notation()} (${validExplanation})`,
    };
  }

  /**
   * writeToSheetFromRunFormObject
   *
   * @summary When the user selects a container volume, write the app data back to the spreadsheet.
   * @param {object} formObject - Submitted form object
   * @returns {string} Success message for processing by the success handler in JavaScript.js.html
   * @memberof GccSheet
   * @static
   * @see {@link GccTest#runIntegrationTests}
   * @todo Is the key deletion used below still necessary?
   * @todo Debug JavaScript error on submit
   * @todo Reference to JavaScript.js.html is incorrect - what should it be?
   */
  static writeToSheetFromRunFormObject(formObject) {
    const successMessage = 'Changes saved';
    const {
      tplSelectedRunNameA,
      tplSelectedRunNameB,
      tplPreRunExtras,
      tplPostRunExtras,
      tplRunDate,
    } = formObject;

    // delete keys so they don't interfere when matching the number of rows
    delete formObject.tplSelectedRunNameA;
    delete formObject.tplSelectedRunNameB;
    delete formObject.tplSelectedRunExtras;
    delete formObject.tplPreRunExtras;
    delete formObject.tplPostRunExtras;
    delete formObject.tplRunDate;

    const formObjectKeys = Object.keys(formObject);

    // sort field names into alphabetical order (volume01, volume02, etc)
    // so that they match up with the spreadsheet cells
    // includes inputs from both Run A and Run B
    formObjectKeys.sort();

    let previousRowCount = 0;

    [ tplPreRunExtras, tplSelectedRunNameA, tplSelectedRunNameB, tplPostRunExtras ].forEach((runName) => {
      if (runName !== '') {
        const run = GccRun.getInstanceFromCache(runName);
        const { runBounds } = run;
        const { rowCount } = runBounds;

        const inputTypes = [
          {
            suffix: 'notes',
            rangeStart: run.getColumnRange('Notes', 1),
          },
          {
            suffix: 'volume',
            rangeStart: run.getColumnRange(tplRunDate, 1),
          },
        ];

        inputTypes.forEach((inputType) => {
          const { suffix, rangeStart } = inputType;

          // offset(rowOffset, columnOffset, numRows)
          const range = rangeStart.offset(0, 0, rowCount);
          const oldValues = range.getValues().flat();
          const newValues = [];

          // get inputs whose 'name' attribute ends in the suffix
          const inputs = formObjectKeys.filter((key) => key.split('-')[1] === suffix);
          let _inputs;

          if (previousRowCount > 0) {
            _inputs = inputs.slice(previousRowCount, (previousRowCount + rowCount)); // Next run's portion of array
          } else {
            _inputs = inputs.slice(0, rowCount); // First run's portion of array
          }

          // if unknown values present, prepare error message
          if (_inputs.length < rowCount) {
            const formObjectValues = [];

            _inputs.forEach((key) => {
              formObjectValues.push({
                key,
                value: formObject[key],
              });
            });

            console.error('Mismatch between row counts in form and spreadsheet - %s values, %s rows', _inputs.length, rowCount); // eslint-disable-line no-console
            console.error(JSON.stringify(formObjectValues)); // eslint-disable-line no-console
            console.error(JSON.stringify(range.getValues())); // eslint-disable-line no-console
            throw new Error('Fewer values than rows (unknown values)');
          }

          // populate a new array with the sorted and padded field values from the form
          // output format = an array of arrays - one column and multiple rows
          // see https://stackoverflow.com/a/58538189
          _inputs.forEach((key) => {
            newValues.push(formObject[key]);
          });

          newValues.forEach((_newValue, i) => {
            // offset(rowOffset, columnOffset, numRows)
            const oldValue = oldValues[i].toString(); // convert spreadsheet value to string for comparison
            let newValue = _newValue; // form values are always strings

            if (newValue !== oldValue) {
              // spreadsheet expects a boolean
              newValue = GccUtils.stringBooleanToBoolean(_newValue);

              const singleRowRange = rangeStart.offset(i, 0);
              const { valid, message } = GccSheet.validateRangeValues(singleRowRange, [ [ newValue ] ]);

              if (!valid) {
                throw new Error(message);
              } else {
                const { debug } = this;

                if (debug) {
                  console.log(`GccSheet.writeToSheetFromRunFormObject - a user replaced ${oldValue} - ${message}`); // eslint-disable-line no-console
                }

                singleRowRange.setValue(newValue);
              }
            }
          });
        });

        previousRowCount += rowCount;
      }
    });

    // if there's a problem a server error message will be returned instead
    return successMessage;
  }
}
