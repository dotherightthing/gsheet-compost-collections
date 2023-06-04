/**
 * @file GccUiDialog.js
 */
class GccUiDialog {
  /**
   * @class
   * @summary Show a different screen, without triggering a page reload (which would lose the fullscreen effect)
   *  or otherwise affecting the underlying page state.
   * @public
   * @param {object} config                                - App configuration.
   * @param {object} config.uiDialog                       - Module configuration.
   * @param {string} config.uiDialogCacheClearButtonId     - ID selector used to target the Clear Cache button
   * @param {string} config.uiDialogCacheLogButtonId       - ID selector used to target the Log Cache button
   * @param {string} config.uiDialogCloseClass             - Class selector of button that hides the component
   * @param {string} config.uiDialogComponentClass         - Class selector of component
   * @param {string} config.uiDialogConsoleContainerId     - ID selector of console container
   * @param {string} config.uiDialogErudaScriptId          - ID selector of eruda script element
   * @param {string} config.uiDialogParentDataAttr         - Data attribute used to manage state of parent element
   * @param {string} config.uiDialogTriggerClass           - Class selector of button that shows the component
   * @param {string} config.uiDialogUpdateDateValidationId - ID selector used to target the Refresh collection inputs button
   * @param {Array}  config.uiFocusableSelectors           - UI elements which can be focussed by the user.
   * @see {@link https://www.w3.org/TR/wai-aria-practices/#dialog_modal}
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      uiDialog: uiDialogConfig,
      uiFocusableSelectors,
    } = config;

    this.focusableSelector = uiFocusableSelectors.join(', ');

    const {
      cacheClearButtonId,
      cacheLogButtonId,
      closeClass,
      componentClass,
      consoleContainerId,
      endClass,
      erudaScriptId,
      parentDataAttr,
      startClass,
      triggerClass,
      updateDateValidationId,
    } = uiDialogConfig;

    Object.assign(this, {
      cacheClearButtonId,
      cacheLogButtonId,
      closeClass,
      componentClass,
      consoleContainerId,
      endClass,
      erudaScriptId,
      parentDataAttr,
      startClass,
      triggerClass,
      updateDateValidationId,
    });

    // subscribe to other module's events

    pubsub.subscribe('domready', () => {
      this.init();
    });
  }

  /* Getters and Setters */

  /**
   * cacheClearButtonId
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get cacheClearButtonId() {
    return this._cacheClearButtonId;
  }

  set cacheClearButtonId(cacheClearButtonId) {
    this._cacheClearButtonId = validate(cacheClearButtonId, 'string1', 'GccUiDialog.cacheClearButtonId');
  }

  /**
   * cacheLogButtonId
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get cacheLogButtonId() {
    return this._cacheLogButtonId;
  }

  set cacheLogButtonId(cacheLogButtonId) {
    this._cacheLogButtonId = validate(cacheLogButtonId, 'string1', 'GccUiDialog.cacheLogButtonId');
  }

  /**
   * closeClass
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get closeClass() {
    return this._closeClass;
  }

  set closeClass(closeClass) {
    this._closeClass = validate(closeClass, 'string1', 'GccUiDialog.closeClass');
  }

  /**
   * componentClass
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get componentClass() {
    return this._componentClass;
  }

  set componentClass(componentClass) {
    this._componentClass = validate(componentClass, 'string1', 'GccUiDialog.componentClass');
  }

  /**
   * consoleContainerId
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get consoleContainerId() {
    return this._consoleContainerId;
  }

  set consoleContainerId(consoleContainerId) {
    this._consoleContainerId = validate(consoleContainerId, 'string1', 'GccUiDialog.consoleContainerId');
  }

  /**
   * endClass
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get endClass() {
    return this._endClass;
  }

  set endClass(endClass) {
    this._endClass = validate(endClass, 'string1', 'GccUiDialog.endClass');
  }

  /**
   * erudaScriptId
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get erudaScriptId() {
    return this._erudaScriptId;
  }

  set erudaScriptId(erudaScriptId) {
    this._erudaScriptId = validate(erudaScriptId, 'string1', 'GccUiDialog.erudaScriptId');
  }

  /**
   * focusableSelector
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get focusableSelector() {
    return this._focusableSelector;
  }

  set focusableSelector(focusableSelector) {
    this._focusableSelector = validate(focusableSelector, 'string1', 'GccUiDialog.focusableSelector');
  }

  /**
   * instance
   *
   * @type {GccUiDialog}
   * @memberof GccUiDialog
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * parentDataAttr
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get parentDataAttr() {
    return this._parentDataAttr;
  }

  set parentDataAttr(parentDataAttr) {
    this._parentDataAttr = validate(parentDataAttr, 'string1', 'GccUiDialog.parentDataAttr');
  }

  /**
   * startClass
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get startClass() {
    return this._startClass;
  }

  set startClass(startClass) {
    this._startClass = validate(startClass, 'string1', 'GccUiDialog.startClass');
  }

  /**
   * triggerClass
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get triggerClass() {
    return this._triggerClass;
  }

  set triggerClass(triggerClass) {
    this._triggerClass = validate(triggerClass, 'string1', 'GccUiDialog.triggerClass');
  }

  /**
   * updateDateValidationId
   *
   * @type {string}
   * @memberof GccUiDialog
   */
  get updateDateValidationId() {
    return this._updateDateValidationId;
  }

  set updateDateValidationId(updateDateValidationId) {
    this._updateDateValidationId = validate(updateDateValidationId, 'string1', 'GccUiDialog.updateDateValidationId');
  }

  /* Instance methods */

  /**
   * init
   *
   * @memberof GccUiDialog
   */
  init() {
    document.addEventListener('click', this.handleClick.bind(this), false);
  }

  /**
   * cacheClear
   *
   * @summary Clear the contents of the cache
   * @memberof GccUiDialog
   */
  cacheClear() {
    const { cacheClearButtonId } = this;

    document.getElementById(cacheClearButtonId).dataset.isLoading = true;

    google.script.run
      .withSuccessHandler(((output) => {
        document.getElementById(cacheClearButtonId).dataset.isLoading = false;
        GccUi.log(output);
      }))
      .withFailureHandler(((output) => {
        document.getElementById(cacheClearButtonId).dataset.isLoading = false;
        GccUi.log(output);
      }))
      .gccMiddleware('GccCache.clearCache');
  }

  /**
   * logCache
   *
   * @summary Log the contents of the cache
   * @memberof GccUiDialog
   */
  logCache() {
    const { cacheLogButtonId } = this;

    document.getElementById(cacheLogButtonId).dataset.isLoading = true;

    google.script.run
      .withSuccessHandler(((output) => {
        document.getElementById(cacheLogButtonId).dataset.isLoading = false;
        GccUi.log(output);
      }))
      .withFailureHandler(((output) => {
        document.getElementById(cacheLogButtonId).dataset.isLoading = false;
        GccUi.log(output);
      }))
      .gccMiddleware('GccCache.logCache');
  }

  /**
   * handleClick
   *
   * @summary Handle clicks/touches
   * @param {object} event Event object
   * @memberof GccUiDialog
   */
  handleClick(event) {
    const {
      closeClass,
      triggerClass,
      cacheClearButtonId,
      cacheLogButtonId,
      updateDateValidationId,
    } = this;

    if (event.target.classList.contains(triggerClass)) {
      this.show(event.target);
    } else if (event.target.classList.contains(closeClass)) {
      this.hide();
    } else if (event.target.getAttribute('id') === cacheLogButtonId) {
      this.logCache();
    } else if (event.target.getAttribute('id') === cacheClearButtonId) {
      this.cacheClear();
    } else if (event.target.getAttribute('id') === updateDateValidationId) {
      this.setDateValidation(); // note: this differs from GccSheet.setDateValidation
    }
  }

  /**
   * handleFocusTrap
   *
   * @summary Prevent user from tabbing outside the dialog
   * @param {object} event Event object
   * @memberof GccUiDialog
   */
  handleFocusTrap(event) {
    const {
      startClass, endClass, current,
    } = this;

    // workaround for event listener not being removed
    if (typeof current === 'undefined') {
      return;
    }

    const { focusableEls } = current;
    const focussedEl = event.target;

    if (focussedEl.classList.contains(startClass)) {
      let indexLastFocusable = focusableEls.length - 1;

      // exclude hidden elements (eruda hides focussable elements behind tabs)
      // see https://davidwalsh.name/offsetheight-visibility
      while (focusableEls[indexLastFocusable].offsetHeight === 0) {
        indexLastFocusable -= 1;
      }

      focusableEls[indexLastFocusable].focus();
    } else if (focussedEl.classList.contains(endClass)) {
      focusableEls[0].focus();
    }
  }

  /**
   * handleKeyDown
   *
   * @summary Handle key presses
   * @param {object} event Event object
   * @memberof GccUiDialog
   */
  handleKeyDown(event) {
    const { key } = event;

    if (key === 'Escape') {
      this.hide();
    }
  }

  /**
   * hide
   *
   * @summary Hide the dialog.
   * @memberof GccUiDialog
   */
  hide() {
    const { current, parentDataAttr } = this;

    // workaround for event listener not being removed
    if (typeof current === 'undefined') {
      return;
    }

    const { dialogEl, openerEl } = current;

    dialogEl.setAttribute('hidden', true);
    dialogEl.parentElement.removeAttribute(parentDataAttr);

    document.removeEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.removeEventListener('focusin', this.handleFocusTrap.bind(this), false);
    delete this.current;

    openerEl.focus();

    pubsub.publish('dialog/hide');
  }

  /**
   * Inject console
   *
   * @memberof GccUiDialog
   */
  injectConsole() {
    const {
      consoleContainerId,
      erudaScriptId,
      current,
      focusableSelector,
    } = this;
    const { dialogEl } = current;
    const parentEl = document.getElementById(consoleContainerId);

    if ((parentEl === null) || (document.getElementById(erudaScriptId) !== null)) {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('id', erudaScriptId);
    script.setAttribute('src', '//cdn.jsdelivr.net/npm/eruda');

    script.onload = () => {
      eruda.init({
        container: parentEl,
        tool: [ 'console' ], // 'elements' shows DOM
        useShadowDom: false, // include in focusableEls
        autoScale: false,
        defaults: {
          displaySize: 45, // %
          transparency: 0.9,
          theme: 'Monokai Pro',
        },
      });

      setTimeout(() => {
        eruda.show();
      }, 500);

      this.current.focusableEls = dialogEl.querySelectorAll(focusableSelector);
    };

    document.body.appendChild(script);
  }

  /**
   * setDateValidation
   *
   * @summary Apply data validation rules to all visible date cells in all rows.
   * @memberof GccUiDialog
   */
  setDateValidation() {
    const { updateDateValidationId } = this;

    document.getElementById(updateDateValidationId).dataset.isLoading = true;

    google.script.run
      .withSuccessHandler(((output) => {
        document.getElementById(updateDateValidationId).dataset.isLoading = false;
        GccUi.log(output);
      }))
      .withFailureHandler(((output) => {
        document.getElementById(updateDateValidationId).dataset.isLoading = false;
        GccUi.log(output);
      }))
      .gccMiddleware('GccSheet.setDateValidation');
  }

  /**
   * show
   *
   * @summary Show the dialog.
   * @param {HTMLElement} triggerEl The element (button) which triggered the show.
   * @memberof GccUiDialog
   */
  show(triggerEl) {
    const { focusableSelector, parentDataAttr } = this;
    const componentId = triggerEl.getAttribute('data-dialog');
    const componentEl = document.getElementById(componentId);

    this.current = {
      dialogEl: componentEl,
      openerEl: triggerEl,
    };

    document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    document.addEventListener('focusin', this.handleFocusTrap.bind(this), false); // focus doesn't bubble

    this.injectConsole(componentEl);

    componentEl.removeAttribute('hidden');
    componentEl.parentElement.setAttribute(parentDataAttr, true);

    this.current.focusableEls = componentEl.querySelectorAll(focusableSelector);
    this.current.focusableEls[0].focus();

    pubsub.publish('dialog/show', [ triggerEl ]);
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccUiDialog} instance of class
   * @memberof GccUiDialog
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccUiDialog.getInstance');
      }

      this.instance = new GccUiDialog(_config);
    }

    return this.instance;
  }
}
