/**
 * @file GccRun.js
 */
class GccRun {
  /**
   * @class
   * @summary Properties and methods relating to the physical compost run.
   * @public
   * @param {object}      config                          - Module configuration.
   * @param {Array}       config.abbreviations            - Abbreviations and their expansions (used to accessibly expand collection types).
   * @param {string}      config.collectionMapLocale      - City and country information (passed to Google Maps along with the address).
   * @param {string}      config.containerVolumeFractions - Container volume fractions (used in spreadsheet date dropdowns and app collection volume dropdowns).
   * @param {string}      config.name                     - Run name (title).
   * @param {string|null} config.nextRunName              - Name of the next run in the sheet (below it).
   * @param {number}      config.runBlankRowsAfter        - The number of blank rows after a run (used to calculate run bounds).
   * @param {object}      config.runBounds                - Run position on the sheet: { startRowIndex, rowCount }.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      abbreviations,
      collectionMapLocale,
      containerVolumeFractions,
      name,
      nextRunName,
      runBlankRowsAfter,
    } = config;

    // named ranges
    const {
      NRContainerCapacities: containerCapacities,
      NRContainerTypes: containerTypes,
      NRDateFlags: collectionDateFlags,
      NRNonVolumes: containerNonVolumes,
    } = GccSheet.getInstance().getAllNamedRangeValues();

    Object.assign(this, {
      abbreviations,
      collectionMapLocale,
      containerVolumeFractions,
      name,
      nextRunName,
      runBlankRowsAfter,
    }, {
      containerCapacities,
      containerTypes,
      collectionDateFlags,
      containerNonVolumes,
    });

    // computed
    this.runGroup = GccRun.getRunGroup(config.name); // required by this.getBounds()

    // config.runBounds will only exist when an instance is reinstantiated from cache
    if (typeof config.runBounds !== 'undefined') {
      this.runBounds = config.runBounds;
    } else {
      this.runBounds = this.getBounds();
    }

    this.cacheInstance();
  }

  /* Getters and Setters */

  /**
   * abbreviations
   *
   * @type {Array}
   * @memberof GccRun
   */
  get abbreviations() {
    return this._abbreviations;
  }

  set abbreviations(abbreviations) {
    this._abbreviations = validate(abbreviations, 'Array', 'GccRun.abbreviations');
  }

  /**
   * collectionDateFlags
   *
   * @type {Array}
   * @memberof GccRun
   */
  get collectionDateFlags() {
    return this._collectionDateFlags;
  }

  set collectionDateFlags(collectionDateFlags) {
    this._collectionDateFlags = validate(collectionDateFlags, 'Array', 'GccRun.collectionDateFlags');
  }

  /**
   * collectionMapLocale
   *
   * @type {string}
   * @memberof GccRun
   */
  get collectionMapLocale() {
    return this._collectionMapLocale;
  }

  set collectionMapLocale(collectionMapLocale) {
    this._collectionMapLocale = validate(collectionMapLocale, 'string1', 'GccRun.collectionMapLocale');
  }

  /**
   * containerCapacities
   *
   * @type {Array}
   * @memberof GccRun
   */
  get containerCapacities() {
    return this._containerCapacities;
  }

  set containerCapacities(containerCapacities) {
    this._containerCapacities = validate(containerCapacities, 'Array', 'GccRun.containerCapacities');
  }

  /**
   * containerNonVolumes
   *
   * @type {Array}
   * @memberof GccRun
   */
  get containerNonVolumes() {
    return this._containerNonVolumes;
  }

  set containerNonVolumes(containerNonVolumes) {
    this._containerNonVolumes = validate(containerNonVolumes, 'Array', 'GccRun.containerNonVolumes');
  }

  /**
   * containerTypes
   *
   * @type {Array}
   * @memberof GccRun
   */
  get containerTypes() {
    return this._containerTypes;
  }

  set containerTypes(containerTypes) {
    this._containerTypes = validate(containerTypes, 'Array', 'GccRun.containerTypes');
  }

  /**
   * containerVolumeFractions
   *
   * @type {Array}
   * @memberof GccRun
   */
  get containerVolumeFractions() {
    return this._containerVolumeFractions;
  }

  set containerVolumeFractions(containerVolumeFractions) {
    this._containerVolumeFractions = validate(containerVolumeFractions, 'Array', 'GccRun.containerVolumeFractions');
  }

  /**
   * name
   *
   * @type {string}
   * @memberof GccRun
   */
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = validate(name, 'string1', 'GccRun.name');
  }

  /**
   * nextRunName
   *
   * @type {string|null}
   * @memberof GccRun
   */
  get nextRunName() {
    return this._nextRunName;
  }

  set nextRunName(nextRunName) {
    this._nextRunName = validate(nextRunName, 'string1|null', 'GccRun.nextRunName');
  }

  /**
   * runBlankRowsAfter
   *
   * @type {number}
   * @memberof GccRun
   */
  get runBlankRowsAfter() {
    return this._runBlankRowsAfter;
  }

  set runBlankRowsAfter(runBlankRowsAfter) {
    this._runBlankRowsAfter = validate(runBlankRowsAfter, 'number', 'GccRun.runBlankRowsAfter');
  }

  /**
   * runBounds
   *
   * @type {object}
   * @memberof GccRun
   */
  get runBounds() {
    return this._runBounds;
  }

  set runBounds(runBounds) {
    const runBoundsValid = validate(runBounds, 'object', 'GccRun.runBounds');

    this._runBounds = { ...runBoundsValid };
  }

  /**
   * runGroup
   *
   * @type {object}
   * @memberof GccRun
   */
  get runGroup() {
    return this._runGroup;
  }

  set runGroup(runGroup) {
    this._runGroup = validate(runGroup, 'object', 'GccRun.runGroup');
  }

  /* Instance methods */

  /**
   * cacheInstance
   *
   * @summary Cache an instance of GccRun.
   * @memberof GccRun
   */
  cacheInstance() {
    const obj = validate(this, 'object', 'GccRun.cacheInstance');
    const cacheKey = `run-${stringToId(this.name)}`;

    GccCache.setCacheItem(cacheKey, obj);
  }

  /**
   * getBounds
   *
   * @summary Multiple runs are stored in the same spreadsheet. Get the cell range used for one run.
   * @returns {object} runBounds Run bounds
   * @memberof GccRun
   * @see {@link GccTest#runUnitTests}
   */
  getBounds() {
    const {
      runBlankRowsAfter,
      name,
      nextRunName,
      runGroup,
    } = this;

    const {
      footer,
      sheetName,
    } = runGroup;

    const runNameRowIndex = GccSheet.getRowIndex(sheetName, name);
    const rowAfterRunNameRowIndex = runNameRowIndex + 1;
    const lastRowSelf = 1;
    let runRowCount;
    let rowIndexBeforeNextRunNameRowIndex;
    let lastRowIndex = null;

    if (nextRunName !== null) {
      const nextRunNameRowIndex = GccSheet.getRowIndex(sheetName, nextRunName);
      rowIndexBeforeNextRunNameRowIndex = nextRunNameRowIndex - runBlankRowsAfter;
      runRowCount = rowIndexBeforeNextRunNameRowIndex - rowAfterRunNameRowIndex;
    } else {
      lastRowIndex = GccSheet.getInstance().getLastRowIndex(sheetName, footer);
      runRowCount = lastRowIndex - rowAfterRunNameRowIndex + lastRowSelf;
    }

    // rowCount includes blank/hijacked rows
    // these are filtered out by getCollections
    return {
      startRowIndex: rowAfterRunNameRowIndex,
      rowCount: runRowCount,
    };
  }

  /**
   * getCollections
   *
   * @summary Create collection points on the run.
   * @param {string} runDate Run date
   * @returns {Array} collections
   * @memberof GccRun
   * @see {@link GccTest#runIntegrationTests}
   * @todo Store runName collection ranges (except date) with run
   * @todo Row 19 on "Town Run (FRI)" is still not being processed
   */
  getCollections(runDate) {
    const {
      abbreviations,
      collectionDateFlags,
      collectionMapLocale,
      containerCapacities,
      containerNonVolumes,
      containerTypes,
      containerVolumeFractions,
      name: runName,
      runGroup,
    } = this;

    const {
      columnHeaderIndices,
    } = runGroup;

    const collections = [];

    // rowCount includes blank/hijacked rows
    // these are filtered out below
    const ranges = this.getCollectionRanges(runDate);

    const {
      addressRange,
      containerRange,
      customerRange,
      dateRange,
      notesRange,
      quantityRange,
      typeRange,
    } = ranges;

    // e.g. "customer"
    const firstColumnHeader = Object.entries(columnHeaderIndices)[0][0];
    const firstRange = ranges[`${firstColumnHeader}Range`];

    const addresses = addressRange.getValues();
    const containers = containerRange.getValues();
    const customers = customerRange.getValues();
    const dateValues = dateRange.getValues();
    const firsts = firstRange.getValues();
    const notes = notesRange.getValues();
    const quantities = quantityRange.getValues();
    const types = typeRange.getValues();

    // store run stops

    for (let i = 0; i < addresses.length; i += 1) {
      const address = addresses[i][0];
      const collectionType = types[i][0];
      const container = containers[i][0];
      const containerType = container.replace(/\s/g, '').toLowerCase();
      const customer = customers[i][0];
      const dateValue = dateValues[i][0];
      const first = firsts[i][0];
      const note = notes[i][0];
      const quantity = quantities[i][0];

      // if the first cell is blank
      // consider this to be the first empty row after the run
      if (first === '') {
        break;
      }

      // else if the first cell is not blank
      // but only one cell in the row is filled
      // then consider the row to have been hijacked for some other purpose

      // arrayUnique removes the item which 'first' refers to
      const cellsContent = GccUtils.arrayUnique([
        address,
        collectionType,
        container,
        customer,
        first,
        note,
        quantity,
      ]);

      // remove empty cells
      const filledCells = cellsContent.filter((item) => item !== '');

      if (filledCells.length > 1) {
        let containerInstance = GccContainer.getInstanceFromCache(containerType, quantity);

        if (containerInstance === null) {
          containerInstance = new GccContainer({
            capacities: containerCapacities,
            nonVolumes: containerNonVolumes,
            quantity,
            type: containerType, // remove spaces (TODO?)
            types: containerTypes,
            volumeFractions: containerVolumeFractions,
          });
        }

        // an array of objects
        // as getters, setters and methods of serverside class instances are not exposed to frontend
        const collection = new GccCollection({
          abbreviations,
          address,
          collectionMapLocale,
          container: containerInstance,
          dateFlag: (collectionDateFlags.indexOf(dateValues[i][0]) !== -1) ? dateValues[i][0] : '',
          dateFlags: collectionDateFlags,
          dateValue,
          name: customer, // customerName
          notes: note,
          runDate,
          runName,
          type: collectionType,
        });

        // tpl requires an object rather than a class instance
        // as the parent class can't be accessed from the frontend
        collection.container = GccUtils.classInstanceToObject(containerInstance);
        const tplCollection = GccUtils.classInstanceToObject(collection);

        collections.push(tplCollection);
      }
    }

    // Note: this is passed to frontend, so getters cannot be used
    return collections;
  }

  /**
   * getCollectionRanges
   *
   * @summary Get row and column range for each element of a run collection.
   * @param {string} runDate Run date
   * @returns {object} ranges
   * @memberof GccRun
   * @todo Add caching once tested
   */
  getCollectionRanges(runDate = '') {
    const {
      runBounds,
      runGroup,
    } = this;

    // rowCount includes blank/hijacked rows
    // these are filtered out by getCollections
    const {
      startRowIndex,
      rowCount,
    } = runBounds;

    const {
      sheetName,
    } = runGroup;

    const runSheet = GccSheet.getRunSheet(sheetName);
    const ranges = {};

    const {
      customer: customerColumnIndex,
      type: typeColumnIndex,
      container: containerColumnIndex,
      quantity: quantityColumnIndex,
      address: addressColumnIndex,
      notes: notesColumnIndex,
    } = runGroup.columnHeaderIndices;

    // getRange(row, column, number of rows, number of columns)
    try {
      ranges.addressRange = runSheet.getRange(startRowIndex, addressColumnIndex, rowCount, 1);
      ranges.containerRange = runSheet.getRange(startRowIndex, containerColumnIndex, rowCount, 1);
      ranges.customerRange = runSheet.getRange(startRowIndex, customerColumnIndex, rowCount, 1);

      if (runDate !== '') {
        const dateColumnIndex = GccSheet.getColumnIndex(sheetName, runDate);

        if (dateColumnIndex === null) {
          throw new Error(`GccRun.getCollectionRanges: "${runDate}" is not present in "${sheetName}"`);
        }

        ranges.dateRange = runSheet.getRange(startRowIndex, dateColumnIndex, rowCount, 1);
      } else {
        ranges.dateRange = [];
      }

      ranges.notesRange = runSheet.getRange(startRowIndex, notesColumnIndex, rowCount, 1);
      ranges.quantityRange = runSheet.getRange(startRowIndex, quantityColumnIndex, rowCount, 1);
      ranges.typeRange = runSheet.getRange(startRowIndex, typeColumnIndex, rowCount, 1);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    return ranges;
  }

  /**
   * getColumnRange
   *
   * @summary Gets a range of all rows in a specific column of a specific run
   * @param {string} columnHeader Column header
   * @param {number} rowCountOverride Override for run.rowCount
   * @returns {Range} columnRange
   * @memberof GccRun
   * @see {@link GccTest#runIntegrationTests}
   * @todo This appears to be a partial duplicate of GccRun.getCollectionRanges
   * @todo getColumnIndex caches each (date) result individually - better to update the cached runGroup
   */
  getColumnRange(columnHeader, rowCountOverride) {
    const { runBounds, runGroup } = this;
    const { rowCount, startRowIndex } = runBounds;
    const { columnHeaderIndices, sheetName } = runGroup;
    const runSheet = GccSheet.getRunSheet(sheetName);
    let columnIndex = columnHeaderIndices[columnHeader];

    // date
    if (typeof columnIndex === 'undefined') {
      columnIndex = GccSheet.getColumnIndex(sheetName, columnHeader);
    }

    let columnRange = null;

    const rowCountActual = (typeof rowCountOverride !== 'undefined') ? rowCountOverride : rowCount;

    try {
      // getRange(row, column, number of rows, number of columns)
      columnRange = runSheet.getRange(startRowIndex, columnIndex, rowCountActual, 1);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    return columnRange;
  }

  /* Static methods */

  /**
   * getInstanceFromCache
   *
   * @summary Get a cached instance of GccRun.
   * @param {string} runName Run name
   * @returns {GccRun|null} Reinstantiated run instance
   * @memberof GccRun
   * @static
   */
  static getInstanceFromCache(runName) {
    const cacheKey = `run-${stringToId(runName)}`;
    const cachedObj = GccCache.getCacheItem(cacheKey);

    if (cachedObj === null) {
      return null;
    }

    const instance = GccUtils.objectToClassInstance(cachedObj, 'GccRun');

    return instance;
  }

  /**
   * getRunGroup
   *
   * @summary Each run belongs to a group (sheet) - retrieve that group
   * @param {string} runName Run name
   * @returns {object} Run group
   * @memberof GccRun
   * @static
   * @see {@link GccTest#runIntegrationTests}
   * @todo Investigate adding preRunExtras, postRunExtras to runs object (getRun)
   * @todo Get from cached GccRunGroup instance
   */
  static getRunGroup(runName) {
    const {
      NRRunGroups,
    } = GccSheet.getInstance().getAllNamedRangeValues();

    let runGroup = null;

    // loop over run groups
    NRRunGroups.every((runGroupObj) => {
      const runGroupInstance = GccUtils.objectToClassInstance(runGroupObj, 'GccRunGroup');

      const { runNames, preRunExtras, postRunExtras } = runGroupInstance;

      if (runNames.includes(runName) || (preRunExtras === runName) || (postRunExtras === runName)) {
        runGroup = runGroupInstance;

        // stop looping
        return false;
      }

      // continue looping
      return true;
    });

    if (runGroup === null) {
      // #287
      throw new Error(`No runGroup for run "${runName}"`);
    }

    return runGroup;
  }
}
