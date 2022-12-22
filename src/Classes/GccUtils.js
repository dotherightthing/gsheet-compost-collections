/**
 * @file GccUtils.js
 */
class GccUtils {
  /**
   * @class
   * @summary Utility methods.
   * @public
   */

  /* Static methods */

  /**
   * arrayUnique
   *
   * @summary Remove duplicate values from an array
   * @param {Array} array - Array
   * @returns {Array} array
   * @memberof GccUtils
   * @static
   * @see {@link https://appdividend.com/2022/06/04/how-to-get-distinct-values-from-array-in-javascript/}
   */
  static arrayUnique(array) {
    return [ ...new Set(array) ];
  }

  /**
   * classFactory
   *
   * @summary Create a non-singleton instance of a class using the Factory Abstract pattern.
   * @param {string} className - Name of class to create an instance of
   * @param {object} config - Parameters required by class constructor
   * @returns {*} Instance of the specified class
   * @memberof GccUtils
   * @static
   * @see {@link https://stackoverflow.com/a/73945595}
   */
  static classFactory(className, config) {
    const classMap = new Map([
      [ 'GccCollection', GccCollection ],
      [ 'GccColor', GccColor ],
      [ 'GccContainer', GccContainer ],
      [ 'GccEnv', GccEnv ],
      [ 'GccPage', GccPage ],
      [ 'GccRun', GccRun ],
      [ 'GccRunGroup', GccRunGroup ],
      [ 'GccSheet', GccSheet ],
    ]);

    const Class = classMap.get(className);

    return new (Class)(config);
  }

  /**
   * classInstanceToObject
   *
   * @summary A class instance can be passed from the backend to the frontend via template parameters.
   *  However once on the frontend it appears to lose contact with its parent class.
   *  This means that its properties can't be accessed because the class setters have prefixed them with underscores.
   * @param {*} classInstance - classInstance to convert
   * @returns {object} Object
   * @memberof GccUtils
   * @static
   */
  static classInstanceToObject(classInstance) {
    const { ...objWithUnderscores } = classInstance;
    const keys = Object.keys(objWithUnderscores);
    const obj = {};

    // remove leading underscores added by the class setters
    keys.forEach((key) => {
      const objKey = key.replace('_', ''); // replaces first/leading underscore
      obj[objKey] = objWithUnderscores[key];
    });

    // return an object for use on the frontend
    return obj;
  }

  /**
   * getAppConfig
   *
   * @summary Get the app config object, from the app cache if possible, otherwise from the raw config files.
   * @param {string} dependency - Dependency, e.g. 'GccRun', 'GccPage.getInstance' etc
   * @param {boolean} allowEmpty - Whether to throw an error if the config is missing
   * @returns {object} appConfig
   * @memberof GccUtils
   * @static
   */
  static getAppConfig(dependency, allowEmpty = false) {
    const cacheKey = 'config';
    const cachedConfig = GccCache.getCacheItem(cacheKey, true);

    // if config could be cached and was cached
    if (GccValidate.isObject(cachedConfig)) {
      return cachedConfig;
    }

    // else if standalone config available
    if (GccValidate.isObject(saConfig) && GccValidate.isObject(devConfig)) {
      return { ...saConfig, ...devConfig };
    }

    // else if container-bound config available
    if (GccValidate.isObject(cbConfig) && GccValidate.isObject(devConfig)) {
      return { ...cbConfig, ...devConfig };
    }

    if (allowEmpty) {
      return null;
    }

    throw new Error(`${dependency} requires a configuration object but none was provided or cached`);
  }

  /**
   * setAppConfig
   *
   * @summary Set the app config object
   * @param {object} appConfig App config
   * @memberof GccUtils
   * @static
   */
  static setAppConfig(appConfig) {
    // store the config so that it can be accessed by instantiations in Middleware.js
    // which don't seem to be aware of prior instantiations.
    const cacheKey = 'config';

    if (GccValidate.isObject(appConfig)) {
      GccCache.setCacheItem(cacheKey, appConfig, true);
    }
  }

  /**
   * getIndefiniteArticle
   *
   * @summary Get the appropriate indefinite article for the specified string
   * @param {string} str - String
   * @returns {string} indefiniteArticle
   * @memberof GccUtils
   * @static
   */
  static getIndefiniteArticle(str) {
    const firstLetter = str.slice(0, 1).toLowerCase();
    const strLower = str.toLowerCase();

    let art = (firstLetter.match(/^(a|e|i|o|u)$/)) ? 'an' : 'a';

    if (strLower === 'null') {
      art = '';
    }

    return art;
  }

  /**
   * objectToClassInstance
   *
   * @summary Caching an instance converts it into an object. Convert it back into an instance of a class.
   * @param {object} obj - Object to convert
   * @param {string} className - Name of class to create an instance of
   * @returns {*} Instance of the specified class
   * @memberof GccUtils
   * @static
   */
  static objectToClassInstance(obj, className) {
    const keys = Object.keys(obj);
    const config = {};

    // remove leading underscores added by the class setters
    keys.forEach((key) => {
      const configKey = key.replace('_', ''); // replaces first/leading underscore
      config[configKey] = obj[key];
    });

    const instance = GccUtils.classFactory(className, config);

    // return a new instance that has access to class methods and properties
    return instance;
  }

  /**
   * stringBooleanToBoolean
   *
   * @summary Convert a string to a boolean value
   * @param {string} str - String to convert
   * @returns {boolean|string} output
   * @memberof GccUtils
   * @static
   */
  static stringBooleanToBoolean(str) {
    let output = str;

    // spreadsheet expects a boolean
    if (str.toLowerCase() === 'true') {
      output = true;
    } else if (str.toLowerCase() === 'false') {
      output = false;
    }

    return output;
  }

  /**
   * stringToCapitalised
   *
   * @summary Capitalise a string
   * @param {string} str - String to convert
   * @returns {string} capitalisedStr
   * @memberof GccUtils
   * @static
   * @see {@link GccTest#runUnitTests}
   */
  static stringToCapitalised(str) {
    if (typeof str !== 'string') {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * stringToId
   *
   * @summary Convert a string into a form safe for use as an HTML id attribute.
   * @param {string} str - String to convert
   * @returns {string} safeStr
   * @memberof GccUtils
   * @static
   * @see {@link GccTest#runUnitTests}
   */
  static stringToId(str) {
    if (typeof str !== 'string') {
      return '';
    }

    // Note: "/" is a valid ID character in HTML5, but fails in querySelector.
    let safeStr = str
      .trim()
      .toLowerCase()
      .replaceAll(/([ /.,'"!()])+/g, '-')
      .replaceAll(/[-]{2,}/g, '-'); // --

    if (safeStr[safeStr.length - 1] === '-') {
      safeStr = safeStr.slice(0, -1);
    }

    return safeStr;
  }
}
