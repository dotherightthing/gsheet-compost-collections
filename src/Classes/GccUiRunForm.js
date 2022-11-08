/**
 * @file GccUiRunForm.js
 */
class GccUiRunForm {
  /**
   * @class
   * @public
   * @param {object} config                                - App configuration.
   * @param {object} config.uiRunForm                      - Module configuration.
   * @param {string} config.uiRunForm.collectionsId        - ID selector used to target the collections container
   * @param {string} config.uiRunForm.id                   - ID selector used to target the run form
   * @param {string} config.uiRunForm.placeholderLogoClass - Class selector which applies the background logo
   * @param {string} config.uiRunForm.runId                - ID selector of the run component
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      uiRunForm: uiRunFormConfig,
    } = config;

    const {
      collectionsId,
      id,
      placeholderLogoClass,
      runId,
    } = uiRunFormConfig;

    Object.assign(this, {
      collectionsId,
      id,
      placeholderLogoClass,
      runId,
    });

    // subscribe to other module's events

    pubsub.subscribe('selectForm/runFormLoading', () => {
      pubsub.publish('runForm/loading');
    });

    pubsub.subscribe('selectForm/runFormLoadingError', (data) => {
      pubsub.publish('runForm/loaderror', [ data ]);
    });

    pubsub.subscribe('selectForm/defaultRunSelected', () => {
      this.reset();
    });

    pubsub.subscribe('selectForm/specificRunAndSpecificDateSelected', (data) => {
      this.injectTemplate(data);

      document.getElementById(collectionsId).innerHTML = this.getCollectionsHtml(data); // calls GccUiCollection

      this.populateForm(data); // calls GccUiCollection
      this.showPlaceholderLogo(false);
      this.init();

      data.id = id;
      pubsub.publish('runForm/loaded', [ data ]);
    });
  }

  /* Getters and Setters */

  /**
   * collectionsId
   *
   * @type {string}
   * @memberof GccUiRunForm
   */
  get collectionsId() {
    return this._collectionsId;
  }

  set collectionsId(collectionsId) {
    this._collectionsId = GccValidate.validate(collectionsId, 'string1', 'GccUiRunForm.collectionsId');
  }

  /**
   * id
   *
   * @type {string}
   * @memberof GccUiRunForm
   */
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = GccValidate.validate(id, 'string1', 'GccUiRunForm.id');
  }

  /**
   * instance
   *
   * @type {GccUiRunForm}
   * @memberof GccUiRunForm
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * placeholderLogoClass
   *
   * @type {string}
   * @memberof GccUiRunForm
   */
  get placeholderLogoClass() {
    return this._placeholderLogoClass;
  }

  set placeholderLogoClass(placeholderLogoClass) {
    this._placeholderLogoClass = GccValidate.validate(placeholderLogoClass, 'string1', 'GccUiRunForm.placeholderLogoClass');
  }

  /**
   * runId
   *
   * @type {string}
   * @memberof GccUiRunForm
   */
  get runId() {
    return this._runId;
  }

  set runId(runId) {
    this._runId = GccValidate.validate(runId, 'string1', 'GccUiRunForm.runId');
  }

  /* Instance methods */

  /**
   * getCollectionsHtml
   *
   * @summary Instances of GccCollection (backend) are converted to objects
   *  and passed to the frontend where they are processed by GccUiCollection (frontend)
   * @param {object} data Pubsub data
   * @returns {string} html
   * @memberof GccUiRunForm
   */
  getCollectionsHtml(data) {
    const {
      tplCollectionsA,
      tplCollectionsB,
      tplCollectionsPre,
      tplCollectionsPost,
      tplRunDate,
      tplSelectedRunNameA,
      tplSelectedRunNameB,
      tplPreRunExtras,
      tplPostRunExtras,
    } = data;

    const runs = [
      {
        collections: tplCollectionsPre,
        date: tplRunDate,
        name: tplPreRunExtras,
      },
      {
        collections: tplCollectionsA,
        date: tplRunDate,
        name: tplSelectedRunNameA,
      },
      {
        collections: tplCollectionsB,
        date: tplRunDate,
        name: tplSelectedRunNameB,
      },
      {
        collections: tplCollectionsPost,
        date: tplRunDate,
        name: tplPostRunExtras,
      },
    ];

    let html = '';
    let indexOffset = 0;

    runs.forEach((run) => {
      if (run.collections.length) {
        const {
          collections,
          date,
          name,
        } = run;

        const gccUiRunInstance = new GccUiRun({
          collections,
          date,
          name,
        });

        html += '<fieldset>';
        html += gccUiRunInstance.getRunHeaderHtml();

        run.collections.forEach((collection, i) => {
          // remap GccCollection.container to GccUiCollection.containerQuantity and GccUiCollection.containerType
          // as there's no frontend equivalent for GccContainer
          collection.containerQuantity = collection.container.quantity;
          collection.containerType = collection.container.type;

          collection.editableToggleClass = 'editable-toggle';
          collection.groupActiveIndex = i + 1; // used for IDs and X/Y counter
          collection.groupTotal = run.collections.length;
          collection.loopIndex = i + indexOffset;

          delete collection.container;

          const gccUiCollectionInstance = new GccUiCollection(collection);

          html += gccUiCollectionInstance.getCollectionHtml();
        });

        indexOffset += run.collections.length;

        html += '</fieldset>';
      }
    });

    return html;
  }

  /**
   * init
   *
   * @summary Runs every time a new run form is selected/loaded.
   * @memberof GccUiRunForm
   */
  init() {
    const {
      id,
    } = this;

    const formEl = document.getElementById(id);

    if (formEl === null) {
      return;
    }

    if (typeof this.runFormSubmit === 'undefined') {
      this.runFormSubmit = GccUi.createCustomEvent('submit');
    }

    formEl.addEventListener('submit', this.handleSubmit.bind(this), false);
    formEl.addEventListener('change', this.handleChange.bind(this));
    formEl.addEventListener('click', this.handleClick.bind(this));

    // subscribe to other module's events
    this.submitTrigger = pubsub.subscribe('runForm/trigger/submit', () => {
      formEl.dispatchEvent(this.runFormSubmit);
    });
  }

  /**
   * handleChange
   *
   * @param {object} event - Event object
   * @memberof GccUiRunForm
   */
  handleChange(event) {
    // this in turn triggers runForm/trigger/submit
    pubsub.publish('runForm/event/change', [ event ]);
  }

  /**
   * handleClick
   *
   * @param {object} event - Event object
   * @memberof GccUiRunForm
   */
  handleClick(event) {
    pubsub.publish('runForm/event/click', [ event ]);
  }

  /**
   * handleSubmit
   *
   * @param {object} event - Event object
   * @memberof GccUiRunForm
   * @see {@link https://developers.google.com/apps-script/guides/html/communication#index.html_4}
   */
  handleSubmit(event) {
    event.preventDefault(); // prevents the page from redirecting to an inaccurate URL in the event of an exception

    const formObject = event.currentTarget;

    // prevent DOM-detached ghost forms from accumulating after selecting different runs
    if (formObject.parentElement === null) {
      return;
    }

    // gccUi used as 'this' is the form element

    // publish events for other modules to subscribe to
    pubsub.publish('runForm/saving');

    google.script.run
      .withSuccessHandler(this.handleSubmitSuccessCb)
      .withFailureHandler(this.handleSubmitFailCb)
      .gccMiddleware('GccSheet.writeToSheetFromRunFormObject', formObject);
  }

  /**
   * handleSubmitFailCb
   *
   * @summary Message is returned from serverside function
   * @param {string} serverResponse - Server error message
   * @memberof GccUiRunForm
   */
  handleSubmitFailCb(serverResponse) {
    // 'this' is undefined
    pubsub.publish('runForm/saveerror', [ serverResponse ]);
  }

  /**
   * handleSubmitSuccessCb
   *
   * @summary Message is returned from serverside function
   * @memberof GccUiRunForm
   */
  handleSubmitSuccessCb() {
    pubsub.publish('runForm/saved');
  }

  /**
   * injectTemplate
   *
   * @param {object} data Pubsub data
   * @memberof GccUiRunForm
   */
  injectTemplate(data) {
    const { tplHtml } = data;
    const { runId } = this;
    const runEl = document.getElementById(runId);

    this.reset();

    runEl.innerHTML = tplHtml;
  }

  /**
   * populateForm
   *
   * @summary Apply spreadsheet values to the templated form elements
   * @param {object} data Pubsub data
   * @memberof GccUiRunForm
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox}
   */
  populateForm(data) {
    const {
      tplRangeValuesA,
      tplRangeValuesB,
      tplRangeValuesPre,
      tplRangeValuesPost,
    } = data;
    let count = 0;

    [ tplRangeValuesPre, tplRangeValuesA, tplRangeValuesB, tplRangeValuesPost ].forEach((runFormValues) => {
      runFormValues.forEach((rangeValue) => {
        const fieldId = `collection${count.toString().padStart(2, '0')}-volume`;
        const fieldEl = document.getElementById(fieldId);
        count += 1;

        if (fieldEl !== null) {
          fieldEl.value = rangeValue;

          // hidden input - get linked visible input
          // see also GccUiCollection.updateCheckedState
          const sourceInput = GccUiCollection.getSourceInput(fieldEl);

          if (sourceInput !== null) {
            if (GccUiCollection.isCheckbox(sourceInput)) {
              if (rangeValue === true) {
                sourceInput.setAttribute('checked', true);
              } else if (rangeValue === false) {
                sourceInput.removeAttribute('checked');
              }
            }
          }
        }
      });
    });
  }

  /**
   * reset
   *
   * @memberof GccUiRunForm
   */
  reset() {
    const { id } = this;

    let formEl = document.getElementById(id);

    if (formEl !== null) {
      formEl.removeEventListener('submit', this.handleSubmit.bind(this), false);
      formEl.removeEventListener('change', this.handleChange.bind(this));
      formEl.removeEventListener('click', this.handleClick.bind(this));

      pubsub.unsubscribe(this.submitTrigger);

      formEl.parentElement.removeChild(formEl);

      formEl = null;
    }

    this.showPlaceholderLogo(true);
  }

  /**
   * showPlaceholderLogo
   *
   * @summary Show the placeholder logo when the run form is not present.
   * @param {boolean} show Whether to show the placeholder
   * @memberof GccUiRunForm
   */
  showPlaceholderLogo(show) {
    const { placeholderLogoClass } = this;

    if (show) {
      document.body.classList.add(placeholderLogoClass);
    } else {
      document.body.classList.remove(placeholderLogoClass);
    }
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccUiRunForm} instance of class
   * @memberof GccUiRunForm
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccUiRunForm.getInstance');
      }

      this.instance = new GccUiRunForm(_config);
    }

    return this.instance;
  }
}
