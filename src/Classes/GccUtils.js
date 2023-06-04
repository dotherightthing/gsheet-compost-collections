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
   * @summary Get the app config object, from the app cache if possible, otherwise from the container-bound config.
   * @description The container-bound global cbConfig is not available in all GAS contexts. Caching (via the Properties Service) makes it available.
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
    if (isObject(cachedConfig)) {
      return cachedConfig;
    }

    // else if container-bound config available
    if (typeof cbConfig !== 'undefined') {
      if (isObject(cbConfig) && isObject(devConfig)) {
        return { ...cbConfig, ...devConfig };
      }
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
   * @returns {object} appConfig
   * @memberof GccUtils
   * @static
   */
  static setAppConfig(appConfig) {
    // store the config so that it can be accessed by instantiations in Middleware.js
    // which don't seem to be aware of prior instantiations.
    const cacheKey = 'config';

    if (isObject(appConfig)) {
      GccCache.setCacheItem(cacheKey, appConfig, true);
    }

    return appConfig;
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
}
