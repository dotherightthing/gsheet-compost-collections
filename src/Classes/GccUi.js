/**
 * @file GccUi.js
 */
class GccUi {
  /**
   * @class
   * @summary UI helpers.
   * @public
   * @param {object} config                      - App configuration.
   * @param {Array}  config.uiFocusableSelectors - UI elements which can be focussed by the user.
   */
  constructor(config = {}) {
    const {
      uiFocusableSelectors,
    } = config;

    this.focusableSelector = uiFocusableSelectors.join(', ');

    // subscribe to other module's events

    pubsub.subscribe([ 'domready', 'runForm/loaded' ], () => {
      this.enableActiveStates('body');
    });
  }

  /* Getters and Setters */

  /**
   * focusableSelector
   *
   * @type {string}
   * @memberof GccUi
   */
  get focusableSelector() {
    return this._focusableSelector;
  }

  set focusableSelector(focusableSelector) {
    this._focusableSelector = validate(focusableSelector, 'string1', 'GccUi.focusableSelector');
  }

  /**
   * instance
   *
   * @type {GccUi}
   * @memberof GccUi
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /* Instance methods */

  /**
   * enableActiveStates
   *
   * @summary Fix for iOS which does not apply the active state by default, applied per-element for better performance
   * @param {string} parentSelector Parent selector
   * @memberof GccUi
   * @see {@link https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#enabling_active_state_support_on_ios}
   * @see {@link http://stackoverflow.com/a/28771425}
   * @see {@link https://codepen.io/dotherightthingnz/pen/bGwaGmM}
   */
  enableActiveStates(parentSelector) {
    const {
      focusableSelector,
    } = this;

    if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
      // focus event does not bubble
      const focusableSelectorElements = document.querySelectorAll(`${parentSelector} ${focusableSelector}`);
      const emptyFunction = () => { };

      focusableSelectorElements.forEach((focusableSelectorElement) => {
        focusableSelectorElement.addEventListener('touchstart', emptyFunction, false);
      });
    }
  }

  /* Static methods */

  /**
   * createCustomEvent
   *
   * @summary Create a synthetic event which can be triggered and which will then invoke the element's matching event listener
   * @param {string} eventName Event name
   * @returns {*} CustomEvent
   * @memberof GccUi
   * @static
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events}
   */
  static createCustomEvent(eventName) {
    return new CustomEvent(eventName, { bubbles: true, cancelable: true });
  }

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccUi} instance of class
   * @memberof GccUi
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccUi.getInstance');
      }

      this.instance = new GccUi(_config);
    }

    return this.instance;
  }

  /**
   * log
   *
   * @summary Log a string to the console
   * @param {string} str String to log
   * @memberof GccUi
   * @static
   */
  static log(str) {
    console.log(str); // eslint-disable-line no-console
  }
}
