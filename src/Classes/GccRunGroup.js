/**
 * @file GccRunGroup.js
 */
class GccRunGroup {
  /**
   * @class
   * @summary Properties and methods relating to the group of Kaicycle compost runs present on a sheet.
   * @public
   * @param {object} config                      - Module configuration.
   * @param {object} config.columnHeaderIndices  - Index position of each column header.
   * @param {number} config.columnHeaderRowIndex - Index position of the column header row.
   * @param {string} config.dateFormat           - Used to load the next run date.
   * @param {string} config.footer               - Text in footer row (boundary row at end of runs).
   * @param {string} config.postRunExtras        - Name/title of post-run run.
   * @param {string} config.preRunExtras         - Name/title of pre-run run.
   * @param {Array}  config.runNames             - Names of the runs in this group.
   * @param {string} config.sheetName            - Name of the sheet.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      columnHeaderIndices,
      columnHeaderRowIndex,
      dateFormat,
      footer,
      postRunExtras,
      preRunExtras,
      runNames,
      sheetName,
    } = config;

    Object.assign(this, {
      columnHeaderIndices,
      columnHeaderRowIndex,
      dateFormat,
      footer,
      postRunExtras,
      preRunExtras,
      runNames,
      sheetName,
    });

    // computed
    this.dateHeaderRangeA1Notation = this.getDateHeadersRange('a1Notation');
    this.dateHeaders = this.getDateHeaders();
    this.dateHeadersFormatted = this.getDateHeaders(true);
    this.id = stringToId(config.sheetName);

    this.cacheInstance();
  }

  /* Getters and Setters */

  /**
   * columnHeaderIndices
   *
   * @type {object}
   * @memberof GccRunGroup
   */
  get columnHeaderIndices() {
    return this._columnHeaderIndices;
  }

  set columnHeaderIndices(columnHeaderIndices) {
    this._columnHeaderIndices = validate(columnHeaderIndices, 'object', 'GccRunGroup.columnHeaderIndices');
  }

  /**
   * columnHeaderRowIndex
   *
   * @type {number}
   * @memberof GccRunGroup
   */
  get columnHeaderRowIndex() {
    return this._columnHeaderRowIndex;
  }

  set columnHeaderRowIndex(columnHeaderRowIndex) {
    this._columnHeaderRowIndex = validate(columnHeaderRowIndex, 'number', 'GccRunGroup.columnHeaderRowIndex');
  }

  /**
   * dateHeaderRangeA1Notation
   *
   * @type {string}
   * @memberof GccRunGroup
   */
  get dateHeaderRangeA1Notation() {
    return this._dateHeaderRangeA1Notation;
  }

  set dateHeaderRangeA1Notation(dateHeaderRangeA1Notation) {
    this._dateHeaderRangeA1Notation = validate(dateHeaderRangeA1Notation, 'string1', 'GccRunGroup.dateHeaderRangeA1Notation');
  }

  /**
   * dateHeaders
   *
   * @type {Array}
   * @memberof GccRunGroup
   */
  get dateHeaders() {
    return this._dateHeaders;
  }

  set dateHeaders(dateHeaders) {
    this._dateHeaders = validate(dateHeaders, 'Array', 'GccRunGroup.dateHeaders');
  }

  /**
   * dateHeadersFormatted
   *
   * @type {Array}
   * @memberof GccRunGroup
   */
  get dateHeadersFormatted() {
    return this._dateHeadersFormatted;
  }

  set dateHeadersFormatted(dateHeadersFormatted) {
    this._dateHeadersFormatted = validate(dateHeadersFormatted, 'Array', 'GccRunGroup.dateHeadersFormatted');
  }

  /**
   * footer
   *
   * @type {string}
   * @memberof GccRunGroup
   */
  get footer() {
    return this._footer;
  }

  set footer(footer) {
    this._footer = validate(footer, 'string1', 'GccRunGroup.footer');
  }

  /**
   * id
   *
   * @type {string}
   * @memberof GccRunGroup
   */
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = validate(id, 'string1', 'GccRunGroup.id');
  }

  /**
   * preRunExtras
   *
   * @type {string}
   * @memberof GccRunGroup
   */
  get preRunExtras() {
    return this._preRunExtras;
  }

  set preRunExtras(preRunExtras) {
    this._preRunExtras = validate(preRunExtras, 'string1', 'GccRunGroup.preRunExtras');
  }

  /**
   * postRunExtras
   *
   * @type {string}
   * @memberof GccRunGroup
   */
  get postRunExtras() {
    return this._postRunExtras;
  }

  set postRunExtras(postRunExtras) {
    this._postRunExtras = validate(postRunExtras, 'string1', 'GccRunGroup.postRunExtras');
  }

  /**
   * runNames
   *
   * @type {Array}
   * @memberof GccRunGroup
   */
  get runNames() {
    return this._runNames;
  }

  set runNames(runNames) {
    this._runNames = validate(runNames, 'Array', 'GccRunGroup.runNames');
  }

  /**
   * sheetName
   *
   * @type {string}
   * @memberof GccRunGroup
   */
  get sheetName() {
    return this._sheetName;
  }

  set sheetName(sheetName) {
    this._sheetName = validate(sheetName, 'string1', 'GccRunGroup.sheetName');
  }

  /* Instance methods */

  /**
   * cacheInstance
   *
   * @summary Cache an instance of GccRunGroup.
   * @memberof GccRunGroup
   */
  cacheInstance() {
    const obj = validate(this, 'object', 'GccRunGroup.cacheInstance');
    const cacheKey = `run-group-${stringToId(this.sheetName)}`;

    GccCache.setCacheItem(cacheKey, obj);
  }

  /**
   * getDates
   *
   * @summary Gets all run dates header strings from a run sheet (not the column indices).
   * @returns {Array} runDates
   * @memberof GccRunGroup
   * @see {@link GccTest#runIntegrationTests}
   * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#createTextFinder(String)}
   * @see {@link https://developers.google.com/apps-script/reference/utilities/utilities#formatDate(Date,String,String)}
   * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en#getLastColumn()}
   * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en#getRange(Integer,Integer,Integer,Integer)}
   */
  getDates() {
    const {
      dateFormat,
    } = this;

    const currentFullYear = new Date().getFullYear();
    const dateHeaders = this.getDateHeaders(false);
    const timezone = GccSheet.getInstance().getTimeZone();

    // create a new array containing formatted date strings
    let runDates = dateHeaders.map((dateHeader) => {
      const dateHeaderDate = new Date(dateHeader);
      let dateHeaderFormatted = '';

      if (dateHeaderDate !== 'NaN') { // filter out 'Invalid Date' conversions, e.g. ''
        if (dateHeaderDate.getFullYear() >= currentFullYear) { // filter dates before this year
          dateHeaderFormatted = Utilities.formatDate(dateHeaderDate, timezone, dateFormat); // Jan 01
        }
      }

      return {
        dateHeaderFormatted,
        dateHeaderDate,
      };
    });

    // filter out empty cells
    runDates = runDates.filter((dateHeader) => (dateHeader.dateHeaderFormatted !== ''));

    // latest first
    runDates = runDates.reverse();

    return runDates;
  }

  /**
   * getDateHeaders
   *
   * @param {boolean} getDisplayValue Get formatted display value rather than underlying value
   * @returns {Array} dateHeaders
   * @memberof GccRunGroup
   */
  getDateHeaders(getDisplayValue) {
    let dateHeaderRange;
    let dateHeaders;

    try {
      dateHeaderRange = this.getDateHeadersRange();
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    if (getDisplayValue) {
      dateHeaders = dateHeaderRange.getDisplayValues().flat();
    } else {
      dateHeaders = dateHeaderRange.getValues().flat();
    }

    // filter out blank date headers (empty columns)
    dateHeaders = dateHeaders.filter((dateHeader) => (dateHeader !== ''));

    return dateHeaders;
  }

  /**
   * getDateHeadersRange
   *
   * @summary Gets a range of all date column headers for a specific run group
   * @param {string} format - Format (range|a1Notation)
   * @returns {Range|string} dateHeadersRange
   * @memberof GccRunGroup
   */
  getDateHeadersRange(format = 'range') {
    const {
      columnHeaderIndices,
      columnHeaderRowIndex,
      sheetName,
    } = this;

    const runSheet = GccSheet.getRunSheet(sheetName);
    const columnHeaderKeys = Object.keys(columnHeaderIndices);
    const columnHeaderKeyLast = columnHeaderKeys[columnHeaderKeys.length - 1];
    const columnHeaderIndexLast = columnHeaderIndices[columnHeaderKeyLast];
    const startColumnIndex = columnHeaderIndexLast + 1;
    const columnCount = runSheet.getLastColumn() - columnHeaderIndexLast;
    let startColumnIndexVisible = startColumnIndex;

    let dateHeadersRange;

    // filter out hidden and empty date columns
    for (let i = 0; i < columnCount; i += 1) {
      // if start column is hidden by user
      if (runSheet.isColumnHiddenByUser(i + startColumnIndex)) {
        // move the start column to the next column
        // for checking on the next loop
        startColumnIndexVisible = i + startColumnIndex + 1;
      } else {
        // if column is visible but empty
        const singleDateRangeStartColumnIndex = i + startColumnIndex;
        const singleDateRange = runSheet.getRange(columnHeaderRowIndex, singleDateRangeStartColumnIndex, 1, 1);
        const singleDateHeader = singleDateRange.getDisplayValue();

        if (singleDateHeader === '') {
          // move the start column to the next column
          // for checking on the next loop
          startColumnIndexVisible = i + startColumnIndex + 1;
        } else {
          // stop looping
          break;
        }
      }
    }

    try {
      // getRange(row, column, number of rows, number of columns)
      dateHeadersRange = runSheet.getRange(columnHeaderRowIndex, startColumnIndexVisible, 1, columnCount);

      let dateHeaders = dateHeadersRange.getDisplayValues().flat();

      // filter out any remaining blank date headers (empty columns)
      // the intention is to remove any trailing blank columns
      // but note this assumes that there are no blanks inbetween dates
      dateHeaders = dateHeaders.filter((dateHeader) => (dateHeader !== ''));

      const columnCountContent = dateHeaders.length;

      if (columnCount !== columnCountContent) {
        dateHeadersRange = runSheet.getRange(columnHeaderRowIndex, startColumnIndexVisible, 1, columnCountContent);
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    if (format === 'a1Notation') {
      return dateHeadersRange.getA1Notation();
    }

    return dateHeadersRange;
  }

  /**
   * getNextRunDate
   *
   * @summary Gets the next run date (today or a future run date)
   * @returns {string} nextRunDate
   * @memberof GccRunGroup
   */
  getNextRunDate() {
    let tplRunDates = this.getDates();
    let nextRunDate = '';

    // get today's date else get next date after today

    const todayDate = new Date();

    // oldest first
    tplRunDates = tplRunDates.reverse();

    tplRunDates.every((runDate) => {
      const {
        dateHeaderFormatted,
        dateHeaderDate,
      } = runDate;

      const runDateDate = new Date(`${dateHeaderFormatted} ${dateHeaderDate.getFullYear()}`); // MMM DD YYYY

      // compare dates, ignoring the time difference
      // toDateString = DDD MMM DD YYY
      const dateIsToday = todayDate.toDateString() === runDateDate.toDateString();

      // compare dates, respecting the time difference
      // getTime = milliseconds since 01.01.1970
      // runDateDate = milliseconds to runDate at 00:00:00
      // today = milliseconds to today at the current time
      const dateIsAfterToday = runDateDate.getTime() > todayDate.getTime();

      if (dateIsToday || dateIsAfterToday) {
        nextRunDate = dateHeaderFormatted;
        // stop looping
        return false;
      }

      // continue looping
      return true;
    });

    return nextRunDate;
  }

  /**
   * getNextRunName
   *
   * @summary Gets the name (title) of the next run in the group
   * @param {string} runName Preceding run name
   * @returns {string|null} nextRunName
   * @memberof GccRunGroup
   */
  getNextRunName(runName) {
    const { runNames, preRunExtras, postRunExtras } = this;
    let nextRunName = null;
    const runNameIndex = runNames.indexOf(runName);

    if (preRunExtras === runName) {
      nextRunName = postRunExtras;
    } else if (postRunExtras === runName) {
      nextRunName = runNames[0]; // eslint-disable-line prefer-destructuring
    } else if ((runNameIndex !== -1) && ((runNameIndex + 1) in runNames)) {
      nextRunName = runNames[runNameIndex + 1];
    }

    return nextRunName;
  }

  /* Static methods */

  /**
   * getInstanceFromCache
   *
   * @summary Get a cached instance of GccRunGroup.
   * @param {string} runGroupName Run group name (sheet name)
   * @returns {GccRunGroup} Reinstantiated run group instance
   * @memberof GccRunGroup
   * @static
   */
  static getInstanceFromCache(runGroupName) {
    const cacheKey = `run-group-${stringToId(runGroupName)}`;
    const cachedObj = GccCache.getCacheItem(cacheKey);

    if (cachedObj === null) {
      return null;
    }

    const instance = GccUtils.objectToClassInstance(cachedObj, 'GccRunGroup');

    return instance;
  }
}
