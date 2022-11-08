/**
 * @file GccUiCss.js
 */
class GccUiCss {
  /**
   * @class
   * @summary Manage dynamic CSS
   * @public
   * @param {object} config                        - App configuration.
   * @param {object} config.uiCss                  - Module configuration.
   * @param {Array}  config.uiCss.fixedPositionIds - IDs of elements that use fixed positioning, used to generate CSS variables.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      uiCss: uiCssConfig,
    } = config;

    const {
      fixedPositionIds,
    } = uiCssConfig;

    Object.assign(this, {
      fixedPositionIds,
    });

    // subscribe to other module's events

    pubsub.subscribe([ 'domready', 'runForm/loaded' ], (data) => {
      if (typeof data === 'undefined') {
        console.warn('no data sent'); // eslint-disable-line no-console
        return;
      }

      this.injectHeightVariables(); // handles new elements added with the run form
    });

    pubsub.subscribe('windowLoad', () => {
      this.injectHeightVariables();
    });
  }

  /* Getters and Setters */

  /**
   * fixedPositionIds
   *
   * @type {Array}
   * @memberof GccUiCss
   */
  get fixedPositionIds() {
    return this._fixedPositionIds;
  }

  set fixedPositionIds(fixedPositionIds) {
    this._fixedPositionIds = GccValidate.validate(fixedPositionIds, 'Array', 'GccUiCss.fixedPositionIds');
  }

  /**
   * instance
   *
   * @type {GccUiCss}
   * @memberof GccUiCss
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /* Instance methods */

  /**
   * injectHeightVariables
   *
   * @summary Store heights of fixed position elements
   * @memberof GccUiCss
   */
  injectHeightVariables() {
    const {
      fixedPositionIds,
    } = this;

    const styleEl = document.getElementById('heights'); // <style></style>
    let cssVariables = '';

    fixedPositionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el !== null) {
        cssVariables += `
--height-fixed-${id}: ${el.offsetHeight / 16}rem;`;
      }
    });

    const styles = `

:root {
  ${cssVariables}
}
`;

    styleEl.innerHTML = styles;
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccUiCss} instance of class
   * @memberof GccUiCss
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccUiCss.getInstance');
      }

      this.instance = new GccUiCss(_config);
    }

    return this.instance;
  }
}
