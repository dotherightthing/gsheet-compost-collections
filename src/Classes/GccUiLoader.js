/**
 * @file GccUiLoader.js
 */
class GccUiLoader {
  /**
   * @class
   * @summary Toggle a loading animation
   * @public
   * @param {object} config                           - App configuration.
   * @param {object} config.uiLoader                  - Module configuration.
   * @param {string} config.uiLoader.componentClass   - Class selector of the loader element
   * @param {string} config.uiLoader.dataAttr         - Data attribute used to manage state
   * @param {string} config.uiLoader.descriptionClass - Class selector of the loader description
   * @param {number} config.uiLoader.hideDelay        - Number of milliseconds to wait before hiding the loader
   * @param {string} config.uiLoader.parentDataAttr   - Data attribute used to manage state of parent element
   * @param {string} config.uiLoader.runLoaderId      - ID selector of the loader component that appears in the overlay
   * @param {string} config.uiLoader.runSaverId       - ID selector of the loader component that appears save status bar
   * @param {string} config.uiLoader.titleClass       - Class selector of the loader title
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      uiLoader: uiLoaderConfig,
    } = config;

    const {
      componentClass,
      dataAttr,
      descriptionClass,
      hideDelay,
      parentDataAttr,
      runLoaderId,
      runSaverId,
      titleClass,
    } = uiLoaderConfig;

    Object.assign(this, {
      componentClass,
      dataAttr,
      descriptionClass,
      hideDelay,
      parentDataAttr,
      runLoaderId,
      runSaverId,
      titleClass,
    });

    // publish events for other modules to subscribe to

    // subscribe to other module's events

    // Run form

    pubsub.subscribe('selectForm/defaultRunSelected', () => {
      this.show(runLoaderId, false);
    });

    pubsub.subscribe('runForm/loading', () => {
      this.show(runLoaderId, true, 'Loading runs...');
    });

    pubsub.subscribe('runForm/loaded', () => {
      this.show(runLoaderId, 'complete', 'Runs loaded.');
    });

    pubsub.subscribe('runForm/loaderror', (data) => {
      this.show(runLoaderId, 'error', 'Runs could not be loaded.', data);
    });

    // Run form

    pubsub.subscribe('runForm/saving', () => {
      this.show(runSaverId, true, 'Saving changes...');
    });

    pubsub.subscribe('runForm/saved', () => {
      this.show(runSaverId, 'complete', 'Saved changes.');
    });

    pubsub.subscribe('runForm/saveerror', (data) => {
      this.show(runSaverId, false, 'Changes could not be saved.', data);
    });
  }

  /* Getters and Setters */

  /**
   * instance
   *
   * @type {GccUiLoader}
   * @memberof GccUiLoader
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * componentClass
   *
   * @type {string}
   * @memberof GccUiLoader
   */
  get componentClass() {
    return this._componentClass;
  }

  set componentClass(componentClass) {
    this._componentClass = GccValidate.validate(componentClass, 'string1', 'GccUiLoader.componentClass');
  }

  /**
   * dataAttr
   *
   * @type {string}
   * @memberof GccUiLoader
   */
  get dataAttr() {
    return this._dataAttr;
  }

  set dataAttr(dataAttr) {
    this._dataAttr = GccValidate.validate(dataAttr, 'string1', 'GccUiLoader.dataAttr');
  }

  /**
   * descriptionClass
   *
   * @type {string}
   * @memberof GccUiLoader
   */
  get descriptionClass() {
    return this._descriptionClass;
  }

  set descriptionClass(descriptionClass) {
    this._descriptionClass = GccValidate.validate(descriptionClass, 'string1', 'GccUiLoader.descriptionClass');
  }

  /**
   * hideDelay
   *
   * @type {number}
   * @memberof GccUiLoader
   */
  get hideDelay() {
    return this._hideDelay;
  }

  set hideDelay(hideDelay) {
    this._hideDelay = GccValidate.validate(hideDelay, 'number', 'GccUiLoader.hideDelay');
  }

  /**
   * parentDataAttr
   *
   * @type {string}
   * @memberof GccUiLoader
   */
  get parentDataAttr() {
    return this._parentDataAttr;
  }

  set parentDataAttr(parentDataAttr) {
    this._parentDataAttr = GccValidate.validate(parentDataAttr, 'string1', 'GccUiLoader.parentDataAttr');
  }

  /**
   * runLoaderId
   *
   * @type {string}
   * @memberof GccUiLoader
   */
  get runLoaderId() {
    return this._runLoaderId;
  }

  set runLoaderId(runLoaderId) {
    this._runLoaderId = GccValidate.validate(runLoaderId, 'string1', 'GccUiLoader.runLoaderId');
  }

  /**
   * runSaverId
   *
   * @type {string}
   * @memberof GccUiLoader
   */
  get runSaverId() {
    return this._runSaverId;
  }

  set runSaverId(runSaverId) {
    this._runSaverId = GccValidate.validate(runSaverId, 'string1', 'GccUiLoader.runSaverId');
  }

  /**
   * titleClass
   *
   * @type {string}
   * @memberof GccUiLoader
   */
  get titleClass() {
    return this._titleClass;
  }

  set titleClass(titleClass) {
    this._titleClass = GccValidate.validate(titleClass, 'string1', 'GccUiLoader.titleClass');
  }

  /* Instance methods */

  /**
   * show
   *
   * Hide or show the loader (icon visibility is set in CSS).
   *
   * @param {string} loaderId Loader ID (runLoaderId or runSaverId depending on context)
   * @param {string} isLoading Loading state (true|false|error)
   * @param {string} [title] Visible title
   * @param {string} [description] Visible description
   * @memberof GccUiLoader
   * @see {@link https://loading.io/css/}
   */
  show(loaderId, isLoading, title = null, description = null) {
    const {
      componentClass,
      dataAttr,
      descriptionClass,
      hideDelay = 0,
      parentDataAttr,
      titleClass,
    } = this;

    // <div id="ID" data-is-loading="false" class="loader">
    //   <div class="loader-icon">
    //     <div class="is-loading"></div>
    //     <div class="is-loading-error"></div>
    //   </div>
    //   <div class="loader-title"></div>
    //   <div class="loader-description small"></div>
    // </div>

    const loaderEl = document.getElementById(loaderId);
    const showEl = loaderEl.classList.contains(componentClass) ? loaderEl : document.querySelector(`#${loaderId} .${componentClass}`);
    const titleEl = document.querySelector(`#${loaderId} .${titleClass}`);
    const descriptionEl = document.querySelector(`#${loaderId} .${descriptionClass}`);
    const titleText = (title !== null) ? title : '';
    const descriptionText = (description !== null) ? description : '';

    titleEl.innerText = titleText;
    descriptionEl.innerText = descriptionText;

    loaderEl.setAttribute(dataAttr, isLoading);
    loaderEl.parentElement.setAttribute(parentDataAttr, isLoading);

    if ((isLoading === true) || (isLoading === 'error')) {
      // show
      showEl.removeAttribute('hidden');

      if (loaderId === 'dates-loader') {
        loaderEl.previousElementSibling.setAttribute('hidden', true);
      }
    } else { // false || complete
      // hide
      setTimeout(() => {
        showEl.setAttribute('hidden', true);

        if (loaderId === 'dates-loader') {
          loaderEl.previousElementSibling.removeAttribute('hidden');
        }
      }, hideDelay);
    }
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccUiLoader} instance of class
   * @memberof GccUiLoader
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccUiLoader.getInstance');
      }

      this.instance = new GccUiLoader(_config);
    }

    return this.instance;
  }
}
