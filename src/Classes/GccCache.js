/**
 * @file GccCache.js
 */
class GccCache { // eslint-disable-line no-unused-vars
  /**
   * @class
   * @summary Temporarily cache results that take time to fetch/compute (memoization).
   *  Current limitations - value size: 9 KB, property store: 500 KB
   * @description
   *  The PropertiesService is used for caching as it provides better access for debugging.
   *  If the app is hosted as a library (container-bound), data is cached in Document Properties.
   *  If the app is hosted standalone, data is cached in Script Properties.
   *  Only Script Properties are exposed in Apps Script > Project Settings.
   * @see {@link https://developers.google.com/apps-script/guides/services/quotas}
   * @public
   */

  /* Static methods */

  /**
   * clearCache
   *
   * @summary Removes all keys and values from the script cache.
   * @param {string} propertyKey Single property key to remove (rather than all keys)
   * @returns {string} output Success message
   * @memberof GccCache
   * @static
   */
  static clearCache(propertyKey) {
    let properties = PropertiesService.getDocumentProperties();

    if (properties === null) {
      properties = PropertiesService.getScriptProperties();
    }

    const deletedKeys = [];
    let output = '';
    let propertyKeys;

    if (typeof propertyKey !== 'undefined') {
      propertyKeys = [ `_cache${propertyKey}` ];
    } else {
      propertyKeys = properties.getKeys();
    }

    propertyKeys.forEach((propKey) => {
      if (propKey.startsWith('_cache')) {
        properties.deleteProperty(propKey);
        deletedKeys.push(propKey);
      }
    });

    if (propertyKeys.length) {
      const suffix = (propertyKeys.length > 1) ? 's' : '';

      output = `Deleted cache${suffix} "${deletedKeys.sort().join('" and "')}"`;
    } else {
      output = 'No caches to delete';
    }

    const appConfig = GccUtils.getAppConfig('GccCache.clearCache', true);

    if (appConfig !== null) {
      GccSheet.getInstance().showNotification('Cache cleared');
    }

    return output;
  }

  /**
   * clearCacheItem
   *
   * @summary Removes a single key and value from the script cache.
   * @param {string} propertyKey Single property key to remove
   * @returns {*} Function call
   * @memberof GccCache
   * @static
   */
  static clearCacheItem(propertyKey) {
    return GccCache.clearCache(propertyKey);
  }

  /**
   * getCacheItem
   *
   * @summary Get the value of an item in the script cache.
   * @param {string} key Unique cache key
   * @param {boolean} hasOwnCache Cache separately from the main cache in order to stay within the size limit
   * @returns {object|null} cacheItemValue
   * @memberof GccCache
   * @static
   */
  static getCacheItem(key, hasOwnCache = false) {
    if (typeof PropertiesService === 'undefined') {
      return null;
    }

    let properties = PropertiesService.getDocumentProperties();

    if (properties === null) {
      properties = PropertiesService.getScriptProperties();
    }

    // get existing cache
    const parentKey = hasOwnCache ? `_cache_${key}` : '_cache';
    const cached = properties.getProperty(parentKey);
    let cacheItemValue = null;

    if (cached !== null) {
      const cache = JSON.parse(cached);

      cacheItemValue = cache[key];

      // if the key doesn't exist
      if (typeof cacheItemValue === 'undefined') {
        cacheItemValue = null;
      }
    }

    return cacheItemValue;
  }

  /**
   * logCache
   *
   * @summary Outputs the contents of the script cache to the console.
   * @returns {object} Cache contents, sorted alphabetically.
   * @memberof GccCache
   * @static
   * @see {@link https://spreadsheet.dev/array-method-sort-in-apps-script}
   */
  static logCache() {
    let properties = PropertiesService.getDocumentProperties();

    if (properties === null) {
      properties = PropertiesService.getScriptProperties();
    }

    const parentObj = properties.getProperties(); // _cache, _cache_foo etc
    const parentKeys = Object.keys(parentObj).sort();
    const parentObjSorted = {};

    parentKeys.forEach((parentKey) => {
      const childObj = JSON.parse(parentObj[parentKey]); // appName etc
      const childKeys = Object.keys(childObj).sort();
      const childObjSorted = {};

      childKeys.forEach((childKey) => {
        childObjSorted[childKey] = childObj[childKey];
      });

      parentObjSorted[parentKey] = childObjSorted;
    });

    return parentObjSorted;
  }

  /**
   * setCacheItem
   *
   * @summary Set the value of an item in the script cache.
   * @param {string} key Unique cache key
   * @param {object} value Cache value
   * @param {boolean} hasOwnCache Cache separately from the main cache in order to stay within the size limit
   * @memberof GccCache
   * @static
   */
  static setCacheItem(key, value, hasOwnCache = false) {
    if (typeof PropertiesService === 'undefined') {
      return;
    }

    let properties = PropertiesService.getDocumentProperties();

    if (properties === null) {
      properties = PropertiesService.getScriptProperties();
    }

    // get existing cache
    const parentKey = hasOwnCache ? `_cache_${key}` : '_cache';
    const cached = properties.getProperty(parentKey);
    let cache = {};

    if (cached !== null) {
      cache = JSON.parse(cached);
    }

    // add new item
    cache[key] = value;

    // update cache
    properties.setProperty(parentKey, JSON.stringify(cache));
  }
}
