/**
 * @file GccUiSelectDisclosure.js
 */
class GccUiSelectDisclosure {
  /**
   * @class
   * @summary Expand and collapse a container, and expose the state of the select element contained within.
   * @public
   * @param {object}  config                                       - App configuration.
   * @param {object}  config.uiSelectDisclosure                    - Module configuration.
   * @param {boolean} config.uiSelectDisclosure.closeOnSelect      - Whether to automatically close the disclosure after a volume option is selected
   * @param {number}  config.uiSelectDisclosure.closeOnSelectDelay - Number of milliseconds to wait before automatically closing the disclosure
   * @param {string}  config.uiSelectDisclosure.triggerClass       - Class selector of button that opens the disclosure
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      uiSelectDisclosure: uiSelectDisclosureConfig,
    } = config;

    const {
      closeOnSelect,
      closeOnSelectDelay,
      triggerClass,
    } = uiSelectDisclosureConfig;

    Object.assign(this, {
      closeOnSelect,
      closeOnSelectDelay,
      triggerClass,
    });

    // subscribe to other module's events

    pubsub.subscribe('runForm/event/change', (event) => {
      const changedEl = event.target;

      // select and checklist elements
      const triggerId = changedEl.dataset.targetState;

      // edit checkboxes
      const triggerIdIfChecked = changedEl.dataset.targetStateIfChecked;

      let triggerEl;

      if (typeof triggerId !== 'undefined') {
        triggerEl = document.getElementById(triggerId);
        this.updateTriggerState(triggerEl);
      } else if ((typeof triggerIdIfChecked !== 'undefined') && (!changedEl.checked)) {
        // when an edit checkbox is unchecked, close the disclosure
        triggerEl = document.getElementById(triggerIdIfChecked);
      } else {
        return;
      }

      const self = this;

      if (closeOnSelect && ('isTrusted' in event)) {
        if (event.isTrusted) {
          setTimeout(() => {
            self.toggle(triggerEl);
          }, closeOnSelectDelay);
        }
      }

      // not used
      // pubsub.publish('disclosure/updateTriggerState', [ triggerEl ]);
    });

    pubsub.subscribe('runForm/event/click', (event) => {
      if (event.target.classList.contains(triggerClass)) {
        const triggerEl = event.target;

        this.toggle(triggerEl);

        // not used
        // pubsub.publish('disclosure/toggle', [ triggerEl ]);
      }
    });

    pubsub.subscribe('runForm/loaded', (data) => {
      const { id } = data;

      this.init(id);
    });
  }

  /* Getters and Setters */

  /**
   * closeOnSelect
   *
   * @type {boolean}
   * @memberof GccUiSelectDisclosure
   */
  get closeOnSelect() {
    return this._closeOnSelect;
  }

  set closeOnSelect(closeOnSelect) {
    this._closeOnSelect = GccValidate.validate(closeOnSelect, 'boolean', 'GccUiSelectDisclosure.closeOnSelect');
  }

  /**
   * closeOnSelectDelay
   *
   * @type {number}
   * @memberof GccUiSelectDisclosure
   */
  get closeOnSelectDelay() {
    return this._closeOnSelectDelay;
  }

  set closeOnSelectDelay(closeOnSelectDelay) {
    this._closeOnSelectDelay = GccValidate.validate(closeOnSelectDelay, 'number', 'GccUiSelectDisclosure.closeOnSelectDelay');
  }

  /**
   * instance
   *
   * @type {GccUiSelectDisclosure}
   * @memberof GccUiSelectDisclosure
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * triggerClass
   *
   * @type {string}
   * @memberof GccUiSelectDisclosure
   */
  get triggerClass() {
    return this._triggerClass;
  }

  set triggerClass(triggerClass) {
    this._triggerClass = GccValidate.validate(triggerClass, 'string1', 'GccUiSelectDisclosure.triggerClass');
  }

  /* Instance methods */

  /**
   * init
   *
   * @param {string} formId Form ID
   * @memberof GccUiSelectDisclosure
   * @see {@link https://www.w3.org/TR/wai-aria-practices/#disclosure}
   */
  init(formId) {
    const {
      triggerClass,
    } = this;

    const triggerEls = document.querySelectorAll(`#${formId} .${triggerClass}`);

    triggerEls.forEach((triggerEl) => {
      this.updateTriggerState(triggerEl);
    });
  }

  /**
   * toggle
   *
   * @summary Open or close the disclosure.
   * @param {HTMLElement} triggerEl The element (button) which triggered the toggle.
   * @memberof GccUiSelectDisclosure
   */
  toggle(triggerEl) {
    const disclosureId = triggerEl.getAttribute('aria-controls');
    const disclosureEl = document.getElementById(disclosureId);
    // const headerEl = document.getElementsByTagName('header')[0]; // pinned element

    const expanded = (triggerEl.getAttribute('aria-expanded') === 'true');
    const focusId = triggerEl.getAttribute('data-focuses');
    const focusEl = document.getElementById(focusId);

    triggerEl.setAttribute('aria-expanded', !expanded);
    triggerEl.setAttribute('data-is-editing', !expanded);
    disclosureEl.setAttribute('data-is-expanded', !expanded);

    if (!expanded === true) {
      focusEl.focus();
    }
  }

  /**
   * updateTriggerState
   *
   * @summary When a volume option is selected, or a checklist item is checked, change the colour of the disclosure trigger checkbox.
   * @param {HTMLElement} triggerEl The element (button) which triggered the toggle.
   * @memberof GccUiSelectDisclosure
   */
  updateTriggerState(triggerEl) {
    const triggerId = triggerEl.getAttribute('id');

    if (triggerEl.disabled) {
      return;
    }

    const inputEl = document.querySelector(`[data-target-state="${triggerId}"]`);
    const id = inputEl.getAttribute('id');
    const tag = inputEl.nodeName.toLowerCase();
    const type = inputEl.getAttribute('type');
    const val = inputEl.value;
    let optionSelected = false;

    if (val !== '') {
      if (tag === 'select') {
        const optGroupLabel = document.querySelector(`#${id} option[value="${val}"]`).parentElement.label;

        if (optGroupLabel === 'Amount') {
          optionSelected = true;
        }
      } else if (type === 'checkbox') {
        if (inputEl.checked) {
          optionSelected = true;
        }
      }
    }

    const state = optionSelected ? 'true' : 'false';

    // change the checkbox icon and colour
    triggerEl.setAttribute('data-is-complete', state);
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccUiSelectDisclosure} instance of class
   * @memberof GccUiSelectDisclosure
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccUiSelectDisclosure.getInstance');
      }

      this.instance = new GccUiSelectDisclosure(_config);
    }

    return this.instance;
  }
}
