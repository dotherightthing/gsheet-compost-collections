/**
 * @file GccPage.js
 */
class GccPage {
  /**
   * @class
   * @summary Properties and methods relating to the HTML templating.
   * @public
   * @param {object}  config                                      - Module configuration.
   * @param {string}  config.appName                              - App name (used in the feedback email).
   * @param {boolean} config.debug                                - Output debugging messages.
   * @param {Array}   config.developerUserEmails                  - Email address of developers who manage this project (used to display UI elements and specify recipients for feedback emails).
   * @param {string}  config.extraCollectionsLabel                - Label for the optional pre/post run checkbox.
   * @param {string}  config.feedbackEmailBody                    - Message body for the feedback email.
   * @param {string}  config.helpLinks                            - Help links (used by Quick Start guide link and help dialog links; note that spreadsheet and Feedback links are appended in code; Quick Start guide link must come first.)
   * @param {string}  config.imageFavicon                         - Image displayed when the page is bookmarked.
   * @param {string}  config.imageLogo                            - Image displayed at the bottom of the page and in the background
   * @param {Array}   config.namedRangeValues                     - Values of the various named ranges.
   * @param {Array}   config.namedRangeValues.runGroups           - Information about each group of runs.
   * @param {string}  config.organisationName                     - Used in web browser page title.
   * @param {string}  config.pageTemplate                         - HTML template file.
   * @param {string}  config.pageTitle                            - Web browser page title.
   * @todo Use this style of config.namedRangeValues documentation in other classes.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      appName,
      debug,
      developerUserEmails,
      extraCollectionsLabel,
      feedbackEmailBody,
      helpLinks,
      imageFavicon,
      imageLogo,
      organisationName,
      pageTemplate,
      pageTitle,
    } = config;

    const {
      NRRunGroups,
    } = GccSheet.getInstance().getAllNamedRangeValues();

    const namedRangeValues = {
      runGroups: NRRunGroups,
    };

    // Note: entire config is passed through to the frontend
    // as many properties are used by the GccUi classes
    // and we can't instantiate the GccUi classes from the backend.
    Object.assign(this, {
      appName,
      config,
      debug,
      developerUserEmails,
      extraCollectionsLabel,
      feedbackEmailBody,
      helpLinks,
      imageFavicon,
      imageLogo,
      organisationName,
      pageTemplate,
      pageTitle,
    }, namedRangeValues);
  }

  /* Getters and Setters */

  /**
   * appName
   *
   * @type {string}
   * @memberof GccPage
   */
  get appName() {
    return this._appName;
  }

  set appName(appName) {
    this._appName = validate(appName, 'string1', 'GccPage.appName');
  }

  /**
   * config
   *
   * @type {object}
   * @memberof GccPage
   */
  get config() {
    return this._config;
  }

  set config(config) {
    this._config = validate(config, 'object', 'GccPage.config');
  }

  /**
   * debug
   *
   * @type {boolean}
   * @memberof GccPage
   */
  get debug() {
    return this._debug;
  }

  set debug(debug) {
    this._debug = validate(debug, 'boolean', 'GccPage.debug');
  }

  /**
   * developerUserEmails
   *
   * @type {Array}
   * @memberof GccPage
   */
  get developerUserEmails() {
    return this._developerUserEmails;
  }

  set developerUserEmails(developerUserEmails) {
    this._developerUserEmails = validate(developerUserEmails, 'Array', 'GccPage.developerUserEmails');
  }

  /**
   * extraCollectionsLabel
   *
   * @type {string}
   * @memberof GccPage
   */
  get extraCollectionsLabel() {
    return this._extraCollectionsLabel;
  }

  set extraCollectionsLabel(extraCollectionsLabel) {
    this._extraCollectionsLabel = validate(extraCollectionsLabel, 'string1', 'GccPage.extraCollectionsLabel');
  }

  /**
   * feedbackEmailBody
   *
   * @type {string}
   * @memberof GccPage
   */
  get feedbackEmailBody() {
    return this._feedbackEmailBody;
  }

  set feedbackEmailBody(feedbackEmailBody) {
    this._feedbackEmailBody = validate(feedbackEmailBody, 'string1', 'GccPage.feedbackEmailBody');
  }

  /**
   * helpLinks
   *
   * @type {Array}
   * @memberof GccPage
   */
  get helpLinks() {
    return this._helpLinks;
  }

  set helpLinks(helpLinks) {
    this._helpLinks = validate(helpLinks, 'Array', 'GccPage.helpLinks');
  }

  /**
   * imageFavicon
   *
   * @type {string}
   * @memberof GccPage
   */
  get imageFavicon() {
    return this._imageFavicon;
  }

  set imageFavicon(imageFavicon) {
    this._imageFavicon = validate(imageFavicon, 'string1', 'GccPage.imageFavicon');
  }

  /**
   * imageLogo
   *
   * @type {string}
   * @memberof GccPage
   */
  get imageLogo() {
    return this._imageLogo;
  }

  set imageLogo(imageLogo) {
    this._imageLogo = validate(imageLogo, 'string1', 'GccPage.imageLogo');
  }

  /**
   * instance
   *
   * @type {GccPage}
   * @memberof GccPage
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * organisationName
   *
   * @type {string}
   * @memberof GccPage
   */
  get organisationName() {
    return this._organisationName;
  }

  set organisationName(organisationName) {
    this._organisationName = validate(organisationName, 'string1', 'GccPage.organisationName');
  }

  /**
   * pageTemplate
   *
   * @type {string}
   * @memberof GccPage
   */
  get pageTemplate() {
    return this._pageTemplate;
  }

  set pageTemplate(fileName) {
    const str = fileName.trim();

    if (str === '') {
      throw new Error('GccPage.pageTemplate cannot be empty');
    }

    this._pageTemplate = fileName;
  }

  /**
   * pageTitle
   *
   * @type {string}
   * @memberof GccPage
   */
  get pageTitle() {
    return this._pageTitle;
  }

  set pageTitle(pageTitle) {
    this._pageTitle = validate(pageTitle, 'string1', 'GccPage.pageTitle');
  }

  /**
   * runGroups
   *
   * @type {object}
   * @memberof GccPage
   */
  get runGroups() {
    return this._runGroups;
  }

  set runGroups(runGroups) {
    this._runGroups = validate(runGroups, 'Array', 'GccPage.runGroups');
  }

  /* Instance methods */

  /**
   * addMetaTags
   *
   * @summary The app runs within a nested iframe. Add meta tags to the parent page.
   * @param {object} tpl HtmlTemplate object
   * @returns {object} tpl - HtmlTemplate object
   * @memberof GccPage
   * @see {@link https://developers.google.com/web/fundamentals/native-hardware/fullscreen/}
   * @see {@link https://appcropolis.com/apple-mobile-web-app-capable/}
   * @see {@link https://issuetracker.google.com/issues/176760976|Add to Home Screen icon for iphone}
   * @see {@link https://issuetracker.google.com/issues/213486384|htmlOutput - Add support for language attribute}
   * @see {@link https://yagisanatode.com/2021/08/18/how-to-isValidUser-specific-users-on-a-web-app-in-google-apps-scripts/}
   */
  addMetaTags(tpl) {
    const {
      imageFavicon,
      organisationName,
      pageTitle,
    } = this;

    const { env } = GccEnv.getInstance();

    const {
      deploymentAbbr,
      scriptTypeAbbr,
    } = env;

    // allow the web app to be embedded in a page using an iframe (optional)
    tpl.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    // <meta name="viewport" content="width=device-width, initial-scale=1">
    tpl.addMetaTag('viewport', 'width=device-width, initial-scale=1');

    // automatically open the app in fullscreen when it is launched from the iOS home screen (after 'Add to Home Screen')
    // <meta name="apple-mobile-web-app-capable" content="yes">
    tpl.addMetaTag('apple-mobile-web-app-capable', 'yes');

    tpl.setTitle(`[${scriptTypeAbbr}-${deploymentAbbr}] ${pageTitle} | ${organisationName}`);

    tpl.setFaviconUrl(imageFavicon);

    return tpl;
  }

  /**
   * createHtmlTemplate
   *
   * @summary Generates an HtmlTemplate object from the HTML file and the supplied template variables
   * @returns {object} page Page
   * @memberof GccPage
   * @see {@link https://developers.google.com/apps-script/guides/html/templates#code.gs_3}
   * @see {@link https://developers.google.com/apps-script/reference/html/html-template}
   * @see {@link https://www.youtube.com/watch?v=VyNJtjH84Aw}
   */
  createHtmlTemplate() {
    const {
      pageTemplate,
    } = this;

    // HtmlTemplate object
    let tpl = HtmlService.createTemplateFromFile(pageTemplate);

    if (pageTemplate === 'Templates/App') {
      const {
        config,
        developerUserEmails,
        imageLogo,
        organisationName,
        extraCollectionsLabel,
        runGroups,
      } = this;

      // create variables object
      const tplVariables = {
        tplAppConfig: JSON.stringify(config), // pass entire config to the frontend
        tplColorStyles: GccColor.getInstance().getColorStyles(),
        tplCompanyLogo: imageLogo,
        tplCompanyName: organisationName,
        tplDeveloperUserEmails: developerUserEmails,
        tplRunExtrasLabel: extraCollectionsLabel,
        tplRunGroups: runGroups,
      };

      // merge variables object into the template object
      // tpl = { ...tpl, ...tplVariables };
      tpl = Object.assign(tpl, tplVariables);
    }

    tpl = tpl.evaluate();
    tpl = this.addMetaTags(tpl);

    return tpl;
  }

  /**
   * createUnitTestHtmlTemplate
   *
   * @summary Generates an HtmlTemplate object from the HTML file
   * @returns {object} page Page
   * @memberof GccPage
   */
  createUnitTestHtmlTemplate() {
    const {
      config,
    } = this;

    // HtmlTemplate object
    let tpl = HtmlService.createTemplateFromFile('Templates/UnitTests');

    const tplVariables = {
      tplAppConfig: JSON.stringify(config), // pass config to the frontend
    };

    // merge variables object into the template object
    // tpl = { ...tpl, ...tplVariables };
    tpl = Object.assign(tpl, tplVariables);

    tpl = tpl.evaluate();

    return tpl;
  }

  /**
   * getHelpLinks
   *
   * @summary Get links used in Help dialog.
   * @returns {Array} helpLinks
   * @memberof GccPage
   */
  getHelpLinks() {
    const {
      developerUserEmails,
      helpLinks,
    } = this;

    const { env } = GccEnv.getInstance();
    const { spreadsheetId } = env;
    const recipientSuffix = (developerUserEmails.length > 1) ? 's' : '';

    helpLinks.push(
      {
        label: 'Spreadsheet (Google Sheets)',
        url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
      },
      {
        label: `Email Feedback to the app developer${recipientSuffix}`,
        url: GccPage.getInstance().getFeedbackMailtoLink(),
      },
    );

    return helpLinks;
  }

  /**
   * getFeedbackMailtoLink
   *
   * @summary Get the URL for the Feedback link in the page footer.
   * @returns {string} feedbackMailtoLink
   * @memberof GccPage
   * @see {@link GccTest#runUnitTests}
   */
  getFeedbackMailtoLink() {
    const {
      appName,
      developerUserEmails,
      feedbackEmailBody,
    } = this;

    const { env } = GccEnv.getInstance();
    const { deploymentAbbr } = env;

    const recipient = developerUserEmails.toString();
    const subject = `${appName} - Feedback (${deploymentAbbr})`;
    const newLine = '%0D%0A';
    const feedbackMailtoLink = `mailto:${recipient}?subject=${encodeURI(subject)}&amp;body=${encodeURI(feedbackEmailBody)}${newLine}${newLine}`;

    return feedbackMailtoLink;
  }

  /**
   * getHtmlAndVariablesFromRunDateFormObject
   *
   * @summary Respond when the user selects a run name or date from the top of the page.
   * @param {object} formObj - Submitted form data as a simple object
   * @returns {object} output Object for processing by GccUiSelectForm.processSelections
   * @memberof GccPage
   */
  getHtmlAndVariablesFromRunDateFormObject(formObj) {
    const { debug } = this;

    const {
      tplSelectedRunNameA,
      tplSelectedRunNameB,
      tplSelectedRunExtras,
    } = formObj;

    let output;

    if (debug) {
      console.log(`GccPage.getHtmlAndVariablesFromRunDateFormObject - a user loaded runs: '${tplSelectedRunNameA}', '${tplSelectedRunNameB}', '${tplSelectedRunExtras === 'on' ? 'SO' : ''}'`); // eslint-disable-line no-console
    }

    // run A is required
    if (tplSelectedRunNameA === '') {
      // Run select: the default option was selected ('')

      output = {
        tplHtml: '',
        tplSelectedRunNameA, // ''
        tplSelectedRunNameB: '',
      };
    } else {
      const appConfig = GccUtils.getAppConfig('GccPage.getHtmlAndVariablesFromRunDateFormObject');
      const {
        abbreviations,
        collectionMapLocale,
        containerVolumeFractions,
        runBlankRowsAfter,
      } = appConfig;

      // Run select: A run was selected ('Run name')

      // Note: runs must be from same suburb|town group - see #276
      let collectionsPre = [];
      let collectionsA = [];
      let collectionsB = [];
      let collectionsPost = [];

      const runGroup = GccRun.getRunGroup(tplSelectedRunNameA);
      const tplRunDate = runGroup.getNextRunDate();

      const {
        preRunExtras,
        postRunExtras,
      } = runGroup;

      if (tplRunDate === '') {
        throw new Error('No matching run dates on or after today');
      }

      let runA = GccRun.getInstanceFromCache(tplSelectedRunNameA);

      if (runA === null) {
        runA = new GccRun({
          abbreviations,
          collectionMapLocale,
          containerVolumeFractions,
          name: tplSelectedRunNameA,
          nextRunName: runGroup.getNextRunName(tplSelectedRunNameA),
          runBlankRowsAfter,
        });
      }

      collectionsA = runA.getCollections(tplRunDate);

      if (!collectionsA.length) {
        throw new Error('No collections for Run A');
      }

      // run B is optional
      if (tplSelectedRunNameB !== '') {
        let runB = GccRun.getInstanceFromCache(tplSelectedRunNameB);

        if (runB === null) {
          runB = new GccRun({
            abbreviations,
            collectionMapLocale,
            containerVolumeFractions,
            name: tplSelectedRunNameB,
            nextRunName: runGroup.getNextRunName(tplSelectedRunNameB),
            runBlankRowsAfter,
          });
        }

        collectionsB = runB.getCollections(tplRunDate);

        if (!collectionsB.length) {
          throw new Error('No collections for Run B');
        }
      }

      // tplSelectedRunExtras will only exist if checkbox was checked
      if (tplSelectedRunExtras && (tplSelectedRunNameA !== '')) {
        let runPre = GccRun.getInstanceFromCache(preRunExtras);

        if (runPre === null) {
          runPre = new GccRun({
            abbreviations,
            collectionMapLocale,
            containerVolumeFractions,
            name: preRunExtras,
            nextRunName: runGroup.getNextRunName(preRunExtras),
            runBlankRowsAfter,
          });
        }

        let runPost = GccRun.getInstanceFromCache(postRunExtras);

        if (runPost === null) {
          runPost = new GccRun({
            abbreviations,
            collectionMapLocale,
            containerVolumeFractions,
            name: postRunExtras,
            nextRunName: runGroup.getNextRunName(postRunExtras),
            runBlankRowsAfter,
          });
        }

        // runs A and B must both be suburbs or town
        collectionsPre = runPre.getCollections(tplRunDate);
        collectionsPost = runPost.getCollections(tplRunDate);
      }

      // create variables object
      const tplVariables = {
        tplCollectionsA: {
          collectionsA, // []
        },
        tplCollectionsB: {
          collectionsB, // []
        },
        tplCollectionsPre: {
          collectionsPre, // []
        },
        tplCollectionsPost: {
          collectionsPost, // []
        },
        tplRunDate, // 'Apr 1'
        tplSelectedRunNameA, // 'Run name'
        tplSelectedRunNameB, // 'Run name'
        tplPreRunExtras: (tplSelectedRunExtras && (tplSelectedRunNameA !== '')) ? preRunExtras : '',
        tplPostRunExtras: (tplSelectedRunExtras && (tplSelectedRunNameA !== '')) ? postRunExtras : '',
      };

      let tpl;

      // HtmlTemplate object
      try {
        tpl = HtmlService.createTemplateFromFile('Partials/Run.part');
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        throw (error);
      }

      // merge variables object into the template object
      // Note: using the spread here breaks access to tpl.evaluate
      tpl = Object.assign(tpl, tplVariables);
      tpl = tpl.evaluate();

      // return the run HTML, run name and run dates
      output = {
        tplCollectionsA: JSON.stringify(collectionsA),
        tplCollectionsB: JSON.stringify(collectionsB),
        tplCollectionsPre: JSON.stringify(collectionsPre),
        tplCollectionsPost: JSON.stringify(collectionsPost),
        tplHtml: tpl.getContent(),
        tplRangeValuesA: GccSheet.getInstance().getRangeValues(tplSelectedRunNameA, tplRunDate),
        tplRangeValuesB: (tplSelectedRunNameB !== '') ? GccSheet.getInstance().getRangeValues(tplSelectedRunNameB, tplRunDate) : [],
        tplRangeValuesPre: tplSelectedRunExtras ? GccSheet.getInstance().getRangeValues(preRunExtras, tplRunDate) : [],
        tplRangeValuesPost:
          tplSelectedRunExtras ? GccSheet.getInstance().getRangeValues(postRunExtras, tplRunDate) : [],
        tplRunDate,
        tplSelectedRunNameA,
        tplSelectedRunNameB,
        tplPreRunExtras: (tplSelectedRunExtras && (tplSelectedRunNameA !== '')) ? preRunExtras : '',
        tplPostRunExtras: (tplSelectedRunExtras && (tplSelectedRunNameA !== '')) ? postRunExtras : '',
      };
    }

    return output;
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccPage} instance of class
   * @memberof GccPage
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccPage.getInstance');
      }

      this.instance = new GccPage(_config);
    }

    return this.instance;
  }

  /**
   * include
   *
   * @summary Import the specified file content into the current file, evaluating any variables that are passed in. Note: nested includes are not supported.
   * @param {string} filename - File name
   * @param {object} [tplVariables=null] Template variables
   * @returns {string} HTML file contents
   * @memberof GccPage
   * @static
   * @see {@link https://developers.google.com/apps-script/guides/html/best-practices#code.gs}
   */
  static include(filename, tplVariables = null) {
    let tpl;

    if (tplVariables !== null) {
      tpl = HtmlService.createTemplateFromFile(filename);

      // merge variables object into the template object
      tpl = Object.assign(tpl, tplVariables);

      // replace placeholders with values
      tpl = tpl.evaluate();
    } else {
      tpl = HtmlService.createHtmlOutputFromFile(filename);
    }

    return tpl.getContent().trim();
  }
}
