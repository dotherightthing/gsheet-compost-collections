/**
 * @file GccEnv.js
 */
class GccEnv {
  /**
   * @class
   * @summary Environment methods.
   * @public
   * @param {object} config                               - Module configuration.
   * @param {Array}  config.developerUserEmails           - Email address of developers who manage this project (used to display UI elements and specify recipients for feedback emails).
   * @param {object} config.env                           - Environment settings
   * @param {object} config.env.containerBoundAppScriptId - Script ID of the container-bound (spreadsheet-linked) project
   *                                                        sheets.google.com > (open spreadsheet) > Extensions > Apps Script > Project Settings (cog icon) > Script ID > Copy
   * @param {object} config.env.headDeploymentId          - Head Deployment ID from the container-bound or standalone project, depending on which one you are testing
   *                                                        script.google.com > (open relevant project) > Deploy > Test deployments > Select type > Web app > Head Deployment ID > Copy
   * @param {object} config.env.pubDeploymentId           - Deployment ID from the container-bound or standalone project, depending on which one you are testing
   *                                                        script.google.com > (open relevant project) > Deploy > Manage deployments > Initial deployment > Deployment ID > Copy
   * @param {object} config.env.spreadsheetId             - SPREADSHEET_ID from the spreadsheet URL:
   *                                                        https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0
   * @param {object} config.env.standaloneAppScriptId     - Script ID of the standalone (library) project
   *                                                        script.google.com > (open standalone project) > Project Settings (cog icon) > Script ID > Copy
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      developerUserEmails,
      env,
    } = config;

    const {
      containerBoundAppScriptId,
      headDeploymentId,
      pubDeploymentId,
      spreadsheetId,
      standaloneAppScriptId,
    } = env;

    Object.assign(this, {
      containerBoundAppScriptId,
      developerUserEmails,
      headDeploymentId,
      pubDeploymentId,
      spreadsheetId,
      standaloneAppScriptId,
    });

    this.env = this.getEnv();
  }

  /* Getters and Setters */

  /**
   * containerBoundAppScriptId
   *
   * @type {string}
   * @memberof GccEnv
   */
  get containerBoundAppScriptId() {
    return this._containerBoundAppScriptId;
  }

  set containerBoundAppScriptId(containerBoundAppScriptId) {
    this._containerBoundAppScriptId = GccValidate.validate(containerBoundAppScriptId, 'string1', 'GccEnv.containerBoundAppScriptId');
  }

  /**
   * developerUserEmails
   *
   * @type {Array}
   * @memberof GccEnv
   */
  get developerUserEmails() {
    return this._developerUserEmails;
  }

  set developerUserEmails(developerUserEmails) {
    this._developerUserEmails = GccValidate.validate(developerUserEmails, 'Array', 'GccEnv.developerUserEmails');
  }

  /**
   * env
   *
   * @summary Object containing environment properties, set by getEnv();
   * @type {object}
   * @memberof GccEnv
   */
  get env() {
    return this._env;
  }

  set env(env) {
    this._env = GccValidate.validate(env, 'object', 'GccEnv.env');
  }

  /**
   * headDeploymentId
   *
   * @type {string}
   * @memberof GccEnv
   */
  get headDeploymentId() {
    return this._headDeploymentId;
  }

  set headDeploymentId(headDeploymentId) {
    this._headDeploymentId = GccValidate.validate(headDeploymentId, 'string1', 'GccEnv.headDeploymentId');
  }

  /**
   * instance
   *
   * @type {GccEnv}
   * @memberof GccEnv
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * pubDeploymentId
   *
   * @type {string}
   * @memberof GccEnv
   */
  get pubDeploymentId() {
    return this._pubDeploymentId;
  }

  set pubDeploymentId(pubDeploymentId) {
    this._pubDeploymentId = GccValidate.validate(pubDeploymentId, 'string1', 'GccEnv.pubDeploymentId');
  }

  /**
   * spreadsheetId
   *
   * @type {string}
   * @memberof GccEnv
   */
  get spreadsheetId() {
    return this._spreadsheetId;
  }

  set spreadsheetId(spreadsheetId) {
    this._spreadsheetId = GccValidate.validate(spreadsheetId, 'string1', 'GccEnv.spreadsheetId');
  }

  /**
   * standaloneAppScriptId
   *
   * @type {string}
   * @memberof GccEnv
   */
  get standaloneAppScriptId() {
    return this._standaloneAppScriptId;
  }

  set standaloneAppScriptId(standaloneAppScriptId) {
    this._standaloneAppScriptId = GccValidate.validate(standaloneAppScriptId, 'string1', 'GccEnv.standaloneAppScriptId');
  }

  /* Instance methods */

  /**
   * getEnv
   *
   * @summary Get environment variables.
   * @returns {object} env
   * @memberof GccEnv
   */
  getEnv() {
    const {
      containerBoundAppScriptId,
      headDeploymentId,
      pubDeploymentId,
      spreadsheetId,
      standaloneAppScriptId,
    } = this;

    const env = {};
    let scriptId = '';
    let scriptUrl = '';

    try {
      scriptId = ScriptApp.getScriptId();
      scriptUrl = ScriptApp.getService().getUrl();
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    if (scriptId === containerBoundAppScriptId) {
      env.scriptTypeAbbr = 'CB';
    } else if (scriptId === standaloneAppScriptId) {
      env.scriptTypeAbbr = 'SA';
    }

    // standalone scripts
    if (scriptUrl.indexOf(pubDeploymentId) !== -1) {
      env.deployment = 'STABLE Build';
      env.deploymentAbbr = 'STABLE';
      env.deploymenttId = pubDeploymentId;
    } else {
      env.deployment = 'TEST Build';
      env.deploymentAbbr = 'DEV';
      env.deploymenttId = headDeploymentId;
    }

    env.spreadsheetId = spreadsheetId;

    return env;
  }

  /**
   * isDev
   *
   * @summary Determine whether the app is displaying the DEV build.
   * @returns {boolean} isDev
   * @memberof GccEnv
   */
  isDev() {
    const { env } = this;
    const { deploymentAbbr } = env;

    return deploymentAbbr === 'DEV';
  }

  /**
   * isDeveloper
   *
   * @summary Test whether the current user is a developer of the standalone project.
   * @returns {boolean} isDeveloper
   * @memberof GccEnv
   */
  isDeveloper() {
    const {
      developerUserEmails,
      env,
    } = this;

    const { scriptTypeAbbr } = env;
    let isDeveloper = false;

    if (scriptTypeAbbr === 'SA') {
      const userEmail = Session.getActiveUser().getEmail();

      isDeveloper = developerUserEmails.includes(userEmail);
    }

    return isDeveloper;
  }

  /**
   * isStable
   *
   * @summary Is the app displaying the STABLE build
   * @returns {boolean} isStable
   * @memberof GccEnv
   */
  isStable() {
    return this.env.deploymentAbbr === 'STABLE';
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccEnv} instance of class
   * @memberof GccEnv
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccEnv.getInstance');
      }

      this.instance = new GccEnv(_config);
    }

    return this.instance;
  }
}
