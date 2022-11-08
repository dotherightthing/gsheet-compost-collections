/**
 * @file GccUiRun.js
 * @summary A single run.
 */
class GccUiRun {
  /**
   * @class
   * @public
   * @param {object} config             - Module configuration.
   * @param {Array}  config.collections - Collection points on the run.
   * @param {string} config.date        - Date of the run
   * @param {string} config.name        - Name of the run
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      collections,
      date,
      name,
    } = config;

    Object.assign(this, {
      collections,
      date,
      name,
    });

    // computed
    const collectionsActiveTotal = this.getTotalActiveCollections();
    const bucketsTotal = this.getTotalBuckets();
    const tubsTotal = this.getTotalTubs();

    Object.assign(this, {
      collectionsActiveTotal,
      bucketsTotal,
      tubsTotal,
    });

    // subscribe to other module's events
  }

  /* Getters and Setters */

  /**
   * bucketsTotal
   *
   * @type {number|string}
   * @memberof GccUiRun
   */
  get bucketsTotal() {
    return this._bucketsTotal;
  }

  set bucketsTotal(bucketsTotal) {
    this._bucketsTotal = GccValidate.validate(bucketsTotal, 'number|stringE', 'GccUiRun.bucketsTotal');
  }

  /**
   * collections
   *
   * @type {Array}
   * @memberof GccUiRun
   */
  get collections() {
    return this._collections;
  }

  set collections(collections) {
    this._collections = GccValidate.validate(collections, 'Array', 'GccUiRun.collections');
  }

  /**
   * collectionsActiveTotal
   *
   * @type {number}
   * @memberof GccUiRun
   */
  get collectionsActiveTotal() {
    return this._collectionsActiveTotal;
  }

  set collectionsActiveTotal(collectionsActiveTotal) {
    this._collectionsActiveTotal = GccValidate.validate(collectionsActiveTotal, 'number', 'GccUiRun.collectionsActiveTotal');
  }

  /**
   * date
   *
   * @type {string}
   * @memberof GccUiRun
   */
  get date() {
    return this._date;
  }

  set date(date) {
    this._date = GccValidate.validate(date, 'string1', 'GccUiRun.date');
  }

  /**
   * name
   *
   * @type {string}
   * @memberof GccUiRun
   */
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = GccValidate.validate(name, 'string1', 'GccUiRun.name');
  }

  /**
   * tubsTotal
   *
   * @type {number}
   * @memberof GccUiRun
   */
  get tubsTotal() {
    return this._tubsTotal;
  }

  set tubsTotal(tubsTotal) {
    this._tubsTotal = GccValidate.validate(tubsTotal, 'number', 'GccUiRun.tubsTotal');
  }

  /* Instance methods */

  /**
   * getTotalActiveCollections
   *
   * @returns {number} collectionsActiveTotal
   * @memberof GccUiRun
   */
  getTotalActiveCollections() {
    const {
      collections,
    } = this;

    const collectionsActive = collections.filter((collection) => collection.collect);
    const collectionsActiveTotal = collectionsActive.length;

    return collectionsActiveTotal;
  }

  /**
   * getTotalBuckets
   *
   * @returns {number|string} bucketsTotal
   * @memberof GccUiRun
   */
  getTotalBuckets() {
    const {
      collections,
    } = this;

    const buckets = collections.map((collection) => ((collection.collect) && (collection.container.type === 'bucket')) ? collection.container.quantity : 0); // eslint-disable-line no-confusing-arrow
    let bucketsTotal = buckets.reduce((a, b) => a + b);

    if (typeof bucketsTotal === 'string') { // #REF! error
      console.error('GccUiRun.bucketsTotal could not be retrieved (status code E)'); // eslint-disable-line no-console
      bucketsTotal = 'E'; // E = Error
    }

    return bucketsTotal;
  }

  /**
   * getTotalTubs
   *
   * @returns {number} tubsTotal
   * @memberof GccUiRun
   */
  getTotalTubs() {
    const {
      collections,
    } = this;

    const tubs = collections.map((collection) => ((collection.collect) && (collection.container.type === 'tub')) ? collection.container.quantity : 0); // eslint-disable-line no-confusing-arrow
    const tubsTotal = tubs.reduce((a, b) => a + b);

    return tubsTotal;
  }

  /**
   * getRunHeaderHtml
   *
   * @summary Generate the HTML for the run header.
   * @returns {string} html
   * @memberof GccUiRun
   */
  getRunHeaderHtml() {
    const {
      bucketsTotal,
      collectionsActiveTotal,
      date,
      name,
      tubsTotal,
    } = this;

    const html = `<legend class="run-header">
      <div class="grid grid-run-header">
        <div class="run-header-label small" id="run-header-label">
          <strong>${name.replace(' RUN', '')}</strong> &middot;
          <span class="run-header-label-date">${date}</span>
        </div>
        <div class="run-header-item grid grid-run-header-item">
          <span class="small" aria-label="${collectionsActiveTotal} active collection locations">${collectionsActiveTotal}</span>
          <svg aria-hidden="true" class="icon icon-compass"><use xlink:href="#compass"></svg>
        </div>
        <div class="run-header-item grid grid-run-header-item">
          <span class="small" aria-label="${bucketsTotal} buckets to collect">${bucketsTotal}</span>
          <svg aria-hidden="true" class="icon icon-bucket"><use xlink:href="#bucket"></svg>
        </div>
        <div class="run-header-item grid grid-run-header-item">
          <span class="small" aria-label="${tubsTotal} tubs to collect">${tubsTotal}</span>
          <svg aria-hidden="true" class="icon icon-tub"><use xlink:href="#tub"></svg>
        </div>
      </div>
    </legend>`;

    return html;
  }

  /* Static methods */
}
