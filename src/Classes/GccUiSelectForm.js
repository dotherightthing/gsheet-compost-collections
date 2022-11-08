/**
 * @file GccUiSelectForm.js
 */
class GccUiSelectForm {
  /**
   * @class
   * @public
   * @param {object} config                 - App configuration.
   * @param {object} config.uiSelectForm    - Module configuration.
   * @param {string} config.uiSelectForm.id - ID selector of the form element.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      uiSelectForm: uiSelectFormConfig,
    } = config;

    const {
      id,
    } = uiSelectFormConfig;

    Object.assign(this, {
      id,
    });

    // subscribe to other module's events

    pubsub.subscribe('domready', () => {
      this.init();
    });
  }

  /* Getters and Setters */
  /**
   * id
   *
   * @type {string}
   * @memberof GccUiSelectForm
   */
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = GccValidate.validate(id, 'string1', 'GccUiSelectForm.id');
  }

  /**
   * instance
   *
   * @type {GccUiSelectForm}
   * @memberof GccUiSelectForm
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /* Instance methods */

  /**
   * handleChange
   *
   * @param {object} event Event object
   * @memberof GccUiSelectForm
   */
  handleChange(event) {
    const _this = event.target;

    this.toggleOptgroups(_this);
  }

  /**
   * handleFormData
   *
   * @param {object} event Event object
   * @memberof GccUiSelectForm
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects}
   */
  handleFormData(event) {
    const { formData } = event;

    pubsub.publish('selectForm/runFormLoading');

    // workaround for error when attempting to send formData to middleware function with
    // `.gccMiddleware('GccPageInstance.getHtmlAndVariablesFromRunDateFormObject', formData);`
    // => Uncaught TypeError: Failed due to illegal value in property: 1
    // (property 1 is the formData argument)
    const formObj = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [ name, value ] of formData.entries()) {
      formObj[name] = value;
    }

    google.script.run
      .withSuccessHandler(this.handleSubmitSuccessCb)
      .withFailureHandler(this.handleSubmitFailCb)
      .gccMiddleware('GccPageInstance.getHtmlAndVariablesFromRunDateFormObject', formObj);
  }

  /**
   * handleSubmit
   *
   * @param {object} event Event object
   * @returns {*} handleFormData
   * @memberof GccUiSelectForm
   * @see {@link https://developers.google.com/apps-script/guides/html/communication#index.html_4}
   */
  handleSubmit(event) {
    event.preventDefault();
    const formEl = event.target;

    const { tplSelectedRunNameA, tplSelectedRunNameB } = formEl.elements;

    if (tplSelectedRunNameA.value !== tplSelectedRunNameB.value) {
      return new FormData(formEl);
    }

    return false;
  }

  /**
   * handleSubmitFailCb
   *
   * @summary Message is returned from serverside function
   * @param {string} serverResponse - Server error message
   * @memberof GccUiSelectForm
   */
  handleSubmitFailCb(serverResponse) {
    // 'this' is undefined
    pubsub.publish('selectForm/runFormLoadingError', [ serverResponse ]);
  }

  /**
   * handleSubmitSuccessCb
   *
   * @summary Callback after the form containing the run and date selects is submitted to the server.
   * @param {object} serverResponseObj Server response object
   * @memberof GccUiSelectForm
   */
  handleSubmitSuccessCb(serverResponseObj) {
    // 'this' is undefined
    GccUiSelectForm.getInstance().processSelections(serverResponseObj);
  }

  /**
   * init
   *
   * @memberof GccUiSelectForm
   */
  init() {
    const {
      id,
    } = this;

    const selectForm = document.getElementById(id);

    if (selectForm === null) {
      return;
    }

    selectForm.addEventListener('change', this.handleChange.bind(this), false);
    selectForm.addEventListener('submit', this.handleSubmit.bind(this), false);
    selectForm.addEventListener('formdata', this.handleFormData.bind(this), false);

    // publish events for other modules to subscribe to
  }

  /**
   * processSelections
   *
   * @param {object} serverResponseObj Server response object
   * @memberof GccUiSelectForm
   */
  processSelections(serverResponseObj) {
    const {
      tplCollectionsA,
      tplCollectionsB,
      tplCollectionsPre,
      tplCollectionsPost,
      tplHtml,
      tplPreRunExtras,
      tplPostRunExtras,
      tplRangeValuesA,
      tplRangeValuesB,
      tplRangeValuesPre,
      tplRangeValuesPost,
      tplRunDate,
      tplSelectedRunNameA,
      tplSelectedRunNameB,
    } = serverResponseObj;

    // Run A is required
    if (tplSelectedRunNameA === '') {
      pubsub.publish('selectForm/defaultRunSelected');
    } else {
      pubsub.publish('selectForm/specificRunAndSpecificDateSelected', [ {
        tplRunDate,
        tplSelectedRunNameA,
        tplSelectedRunNameB,
        tplPreRunExtras,
        tplPostRunExtras,
        tplCollectionsA: JSON.parse(tplCollectionsA),
        tplCollectionsB: JSON.parse(tplCollectionsB),
        tplCollectionsPre: JSON.parse(tplCollectionsPre),
        tplCollectionsPost: JSON.parse(tplCollectionsPost),
        tplHtml,
        tplRangeValuesA,
        tplRangeValuesB,
        tplRangeValuesPre,
        tplRangeValuesPost,
      } ]);
    }

    // scroll to the top of the page
    window.scrollTo(0, 0);
  }

  /**
   * toggleOptgroups
   *
   * @summary When an option is selected from an optgroup, limit other selects to choosing from the same optgroup.
   *  This is to prevent runs being chosen from different run sheets / days.
   * @param {HTMLElement} element Select element
   * @memberof GccUiSelectForm
   */
  toggleOptgroups(element) {
    const selectId = element.getAttribute('id');
    const selectValue = element.value;

    if (element.hasAttribute('aria-controls')) {
      const masterOption = document.querySelector(`#${selectId} option[value="${selectValue}"]`);
      const masterOptgroup = masterOption.parentNode;
      const masterOptgroupLabel = masterOptgroup.getAttribute('label');
      const slaveSelectIds = element.getAttribute('aria-controls').split(' ');

      slaveSelectIds.forEach((slaveSelectId) => {
        const slaveSelect = document.getElementById(slaveSelectId);

        // reset select to prevent a combination of Town + Suburbs, e.g.
        // 1. Run A = Mt Vic
        // 2. Run B = Mt Cook
        // 3. Go
        // 4. Run A = North A
        slaveSelect.value = '';

        const slaveOptgroups = document.querySelectorAll(`#${slaveSelectId} optgroup`);

        slaveOptgroups.forEach((slaveOptgroup) => {
          if (slaveOptgroup.getAttribute('label') === masterOptgroupLabel) {
            slaveOptgroup.children.forEach((child) => {
              child.removeAttribute('disabled');
            });
          } else {
            slaveOptgroup.children.forEach((child) => {
              child.setAttribute('disabled', true);
            });
          }
        });
      });
    }
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccUiSelectForm} instance of class
   * @memberof GccUiSelectForm
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccUiSelectForm.getInstance');
      }

      this.instance = new GccUiSelectForm(_config);
    }

    return this.instance;
  }
}
