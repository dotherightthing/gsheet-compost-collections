/**
 * @file GccCollection.js
 */
class GccCollection {
  /**
   * @class
   * @summary Properties and methods related to a collection point on a compost run.
   *  Instances of GccCollection (backend) are converted to objects
   *  and passed to the frontend where they are processed by GccUiCollection (frontend).
   *  Note that GccContainer (backend) has no frontend equivalent
   *  so its instance object is remapped to properties when it reaches GccUiCollection (frontend).
   * @public
   * @param {object}                config                     - Module configuration.
   * @param {Array}                 config.abbreviations       - Abbreviations and their expansions (used to accessibly expand collection types).
   * @param {string}                config.address             - Street address of collection.
   * @param {string}                config.collectionMapLocale - Map locale to append to Google Maps lookups.
   * @param {object}                config.container           - Instance of GccContainer.
   * @param {string}                config.dateFlag            - Any special instructions for the collection on a particular collection date (Skip, Drop, etc).
   * @param {Array}                 config.dateFlags           - All available date flags.
   * @param {number|string|boolean} config.dateValue           - Recorded collection amount or status or checkbox state for a particular collection date.
   * @param {string}                config.name                - The name of the customer.
   * @param {string}                config.notes               - General notes about this collection, such as where to find the container or how to contact the customer.
   * @param {string}                config.runDate             - The date of the collection.
   * @param {string}                config.runName             - The name of the parent run.
   * @param {string}                config.type                - The type of customer.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      abbreviations,
      address,
      collectionMapLocale,
      container,
      dateFlag,
      dateFlags,
      dateValue,
      name,
      notes,
      runDate,
      runName,
      type,
    } = config;

    Object.assign(this, {
      abbreviations,
      address,
      collectionMapLocale,
      container,
      dateFlag,
      dateFlags,
      dateValue,
      name,
      notes,
      runDate,
      runName,
      type,
    });

    // computed

    const {
      quantity,
      type: containerType,
      volumes,
    } = this.container;

    // volumesAndDateFlags aren't unique so are cached
    this.volumesAndDateFlags = GccCollection.getVolumesAndDateFlags(dateFlags, quantity, containerType, volumes, 'html');

    // computed
    this.cancelled = this.dateValue === 'Cancelled';
    this.onHold = this.dateValue === 'Skip';
    this.pending = this.dateValue === 'Pending';
    this.collect = !(this.cancelled || this.onHold || this.pending);

    // Note: collections are unique so aren't cached
  }

  /* Getters and Setters */

  /**
   * abbreviations
   *
   * @type {Array}
   * @memberof GccCollection
   */
  get abbreviations() {
    return this._abbreviations;
  }

  set abbreviations(abbreviations) {
    this._abbreviations = GccValidate.validate(abbreviations, 'Array', 'GccCollection.abbreviations');
  }

  /**
   * address
   *
   * @type {string}
   * @memberof GccCollection
   */
  get address() {
    return this._address;
  }

  set address(address) {
    this._address = GccValidate.validate(address, 'string1', 'GccCollection.address');
  }

  /**
   * cancelled
   *
   * @type {boolean}
   * @memberof GccCollection
   */
  get cancelled() {
    return this._cancelled;
  }

  set cancelled(cancelled) {
    this._cancelled = GccValidate.validate(cancelled, 'boolean', 'GccCollection.cancelled');
  }

  /**
   * collect
   *
   * @type {boolean}
   * @memberof GccCollection
   */
  get collect() {
    return this._collect;
  }

  set collect(collect) {
    this._collect = GccValidate.validate(collect, 'boolean', 'GccCollection.collect');
  }

  /**
   * container
   *
   * @type {object}
   * @memberof GccCollection
   */
  get container() {
    return this._container;
  }

  set container(container) {
    this._container = GccValidate.validate(container, 'object', 'GccCollection.container');
  }

  /**
   * dateFlag
   *
   * @type {string}
   * @memberof GccCollection
   */
  get dateFlag() {
    return this._dateFlag;
  }

  set dateFlag(dateFlag) {
    this._dateFlag = GccValidate.validate(dateFlag, 'string', 'GccCollection.dateFlag');
  }

  /**
   * dateFlags
   *
   * @type {Array}
   * @memberof GccCollection
   */
  get dateFlags() {
    return this._dateFlags;
  }

  set dateFlags(dateFlags) {
    this._dateFlags = GccValidate.validate(dateFlags, 'Array', 'GccCollection.dateFlags');
  }

  /**
   * dateValue
   *
   * @type {number|string|boolean}
   * @memberof GccCollection
   */
  get dateValue() {
    return this._dateValue;
  }

  set dateValue(dateValue) {
    // must be a number (compost amount) or a string (status) or a boolean (checkbox)
    this._dateValue = GccValidate.validate(dateValue, 'number|string|boolean', 'GccCollection.dateValue');
  }

  /**
   * collectionMapLocale
   *
   * @type {string}
   * @memberof GccCollection
   */
  get collectionMapLocale() {
    return this._collectionMapLocale;
  }

  set collectionMapLocale(collectionMapLocale) {
    this._collectionMapLocale = GccValidate.validate(collectionMapLocale, 'string1', 'GccCollection.collectionMapLocale');
  }

  /**
   * name
   *
   * @type {string}
   * @memberof GccCollection
   */
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = GccValidate.validate(name, 'string1', 'GccCollection.name');
  }

  /**
   * onHold
   *
   * @type {boolean}
   * @memberof GccCollection
   */
  get onHold() {
    return this._onHold;
  }

  set onHold(onHold) {
    this._onHold = GccValidate.validate(onHold, 'boolean', 'GccCollection.onHold');
  }

  /**
   * notes
   *
   * @type {string}
   * @memberof GccCollection
   */
  get notes() {
    return this._notes;
  }

  set notes(notes) {
    this._notes = GccValidate.validate(notes, 'string1', 'GccCollection.notes');
  }

  /**
   * pending
   *
   * @type {boolean}
   * @memberof GccCollection
   */
  get pending() {
    return this._pending;
  }

  set pending(pending) {
    this._pending = GccValidate.validate(pending, 'boolean', 'GccCollection.pending');
  }

  /**
   * runDate
   *
   * @type {string}
   * @memberof GccCollection
   */
  get runDate() {
    return this._runDate;
  }

  set runDate(runDate) {
    this._runDate = GccValidate.validate(runDate, 'string1', 'GccCollection.runDate');
  }

  /**
   * runName
   *
   * @type {string}
   * @memberof GccCollection
   */
  get runName() {
    return this._runName;
  }

  set runName(runName) {
    this._runName = GccValidate.validate(runName, 'string1', 'GccCollection.runName');
  }

  /**
   * type
   *
   * @type {string}
   * @memberof GccCollection
   */
  get type() {
    return this._type;
  }

  set type(type) {
    this._type = GccValidate.validate(type, 'string1', 'GccCollection.type');
  }

  /**
   * typeDefinition
   *
   * @type {string}
   * @memberof GccCollection
   */
  get typeDefinition() {
    return this._typeDefinition;
  }

  set typeDefinition(typeDefinition) {
    this._typeDefinition = GccValidate.validate(typeDefinition, 'string1', 'GccCollection.typeDefinition');
  }

  /**
   * volumesAndDateFlags
   *
   * @type {Array}
   * @memberof GccCollection
   */
  get volumesAndDateFlags() {
    return this._volumesAndDateFlags;
  }

  set volumesAndDateFlags(volumesAndDateFlags) {
    this._volumesAndDateFlags = GccValidate.validate(volumesAndDateFlags, 'Array', 'GccCollection.volumesAndDateFlags');
  }

  /* Instance methods */

  /* Static methods */

  /**
   * getVolumesAndDateFlags
   *
   * @summary Generate a series of human-readable labels/options to display in the volumes/date-flags dropdown.
   * @param {Array}         dateFlags - All available date flags.
   * @param {number|string} quantity  - Quantity of containers to collect; can be '' if collection.type === 'X'.
   * @param {string}        type      - Type of container to collect; can be '' if collection.type === 'X'.
   * @param {Array}         volumes   - All available date flags.
   * @param {string}        format    - Format (html or spreadsheet)
   * @returns {Array|string} volumesAndDateFlags (html: Array | spreadsheet: string)
   * @memberof GccCollection
   * @static
   */
  static getVolumesAndDateFlags(dateFlags, quantity, type, volumes, format) {
    const cacheKey = `collection-volumes-and-date-flags-${type}-${quantity}-${format}`;
    let volumesAndDateFlags = GccCache.getCacheItem(cacheKey);

    if (
      ((format === 'html') && Array.isArray(volumesAndDateFlags))
      || ((format === 'spreadsheet') && (typeof volumesAndDateFlags === 'string'))
    ) {
      return volumesAndDateFlags;
    }

    volumesAndDateFlags = [];

    if (format === 'html') {
      volumesAndDateFlags = [
        {
          optgroup: 'Amount',
          options: volumes,
        },
        {
          optgroup: 'Date flags',
          options: dateFlags,
        },
      ];
    } else {
      // Create a comma separated list to be used for data validation
      // (Data > Data validation > Criteria > List of items)
      const volumesValues = volumes.slice(1).map((volume) => volume.value);

      // sorting is in code order
      // but frontend may shows different sorting to 'help' user (5, 50, 55)
      volumesAndDateFlags = [ ...volumesValues, '------', ...dateFlags ].join();
    }

    GccCache.setCacheItem(cacheKey, volumesAndDateFlags);

    return volumesAndDateFlags;
  }
}
