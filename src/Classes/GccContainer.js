/**
 * @file GccContainer.js
 */
class GccContainer {
  /**
   * @class
   * @summary Properties and methods relating to the containers used on a compost run.
   * @public
   * @param {object}        config                       - Module configuration.
   * @param {Array}         config.capacities            - All available container capacities.
   * @param {Array}         config.nonVolumes            - All non-volume statuses available in the volume dropdown, e.g. 'No access'
   * @param {number|string} config.quantity              - Quantity of containers to collect; can be '' if collection.type === 'X'.
   * @param {string}        config.type                  - Type of container to collect; can be '' if collection.type === 'X'.
   * @param {Array}         config.types                 - All available container types.
   * @param {Array}         config.volumeFractions       - All volume fractions available in the volume dropdown, e.g. '3/4'
   * @todo Resolve duplication of capacities/types/nonVolumes/volumeFractions across instances
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      capacities,
      nonVolumes,
      quantity,
      type,
      types,
      volumeFractions,
    } = config;

    Object.assign(this, {
      capacities,
      nonVolumes,
      quantity,
      type,
      types,
      volumeFractions,
    });

    // computed
    this.volumes = this.getVolumes();

    this.cacheInstance();
  }

  /* Getters and Setters */

  /**
   * capacities
   *
   * @type {Array}
   * @memberof GccContainer
   */
  get capacities() {
    return this._capacities;
  }

  set capacities(capacities) {
    this._capacities = GccValidate.validate(capacities, 'Array', 'GccContainer.capacities');
  }

  /**
   * nonVolumes
   *
   * @type {Array}
   * @memberof GccContainer
   */
  get nonVolumes() {
    return this._nonVolumes;
  }

  set nonVolumes(nonVolumes) {
    this._nonVolumes = GccValidate.validate(nonVolumes, 'Array', 'GccContainer.nonVolumes');
  }

  /**
   * quantity
   *
   * @type {number|string}
   * @memberof GccContainer
   */
  get quantity() {
    return this._quantity;
  }

  set quantity(quantity) {
    this._quantity = GccValidate.validate(quantity, 'number|string', 'GccContainer.quantity');
  }

  /**
   * type
   *
   * @type {string}
   * @memberof GccContainer
   */
  get type() {
    return this._type;
  }

  set type(type) {
    this._type = GccValidate.validate(type, 'string1|string', 'GccContainer.type');
  }

  /**
   * types
   *
   * @type {Array}
   * @memberof GccContainer
   */
  get types() {
    return this._types;
  }

  set types(types) {
    this._types = GccValidate.validate(types, 'Array', 'GccContainer.types');
  }

  /**
   * volumeFractions
   *
   * @type {Array}
   * @memberof GccContainer
   */
  get volumeFractions() {
    return this._volumeFractions;
  }

  set volumeFractions(volumeFractions) {
    this._volumeFractions = GccValidate.validate(volumeFractions, 'Array', 'GccContainer.volumeFractions');
  }

  /**
   * volumes
   *
   * @type {Array}
   * @memberof GccContainer
   */
  get volumes() {
    return this._volumes;
  }

  set volumes(volumes) {
    this._volumes = GccValidate.validate(volumes, 'Array', 'GccContainer.volumes');
  }

  /* Instance methods */

  /**
   * cacheInstance
   *
   * @summary Cache an instance of GccContainer.
   * @memberof GccContainer
   * @todo This will repeatedly cache identical content, but on the other hand we do need to be able to update the cache.
   */
  cacheInstance() {
    const {
      quantity,
      type,
    } = this;

    const cacheKey = `container-${type}-${quantity}`; // -${format}`;
    const obj = GccValidate.validate(this, 'object', 'GccContainer.cacheInstance');

    GccCache.setCacheItem(cacheKey, obj);
  }

  /**
   * fractionToValue
   *
   * @summary Convert a fraction into a number (2dp)
   * @param {string} fraction - Fraction
   * @param {number} containerIndex - Container index
   * @param {number} capacity - Container capacity
   * @returns {string} value
   * @memberof GccContainer
   * @see {@link GccTest#runUnitTests}
   */
  fractionToValue(fraction, containerIndex, capacity) {
    const [ numerator, denominator ] = fraction.split('/');
    const fractionNumber = (numerator / denominator);
    let value = ((containerIndex + fractionNumber) * capacity).toFixed(2);
    const decimalPlaces = value.toString().split('.')[1];

    if (typeof decimalPlaces !== 'undefined') {
      if (decimalPlaces === '00') {
        value = Math.round(value).toString();
      } else if (decimalPlaces.slice(-1) === '0') {
        value = value.toString().slice(0, -1);
      } else {
        value = value.toString();
      }
    }

    return value;
  }

  /**
   * getCapacity
   *
   * @summary Get the capacity of a container.
   * @returns {number} capacity
   * @memberof GccContainer
   */
  getCapacity() {
    const {
      capacities,
      type,
      types,
    } = this;

    const typeArray = types.map((item) => item.toLowerCase());
    const capacityIndex = typeArray.indexOf(type.toLowerCase());
    const capacity = capacities[capacityIndex];

    return capacity;
  }

  /**
   * getVolumeLabel
   *
   * @summary Generate a human-readable label/option to display in the volme dropdown.
   *  Note: fractions > 1 are filtered out by getVolumes before they reach getVolumeLabel
   *  and given a label of 'Overfull' for the 'last' bucket (1st bucket if 1 bucket, 2nd bucket if 2 buckets, etc)
   *  otherwise ignored.
   * @param {number} containerIndex - Container index
   * @param {string} fraction       - Volume fraction.
   * @param {number} fractionNumber - Volume fraction as a number.
   * @returns {string} containerVolumeLabel
   * @memberof GccContainer
   * @see {@link GccTest#runUnitTests}
   */
  getVolumeLabel(containerIndex, fraction, fractionNumber) {
    const {
      quantity,
    } = this;

    let containerVolumeLabel = '';

    if (quantity === 1) {
      if (Number.isInteger(fractionNumber)) {
        // 1 CONTAINER: [] FULL
        containerVolumeLabel = 'Full';
      } else {
        // 1 CONTAINER: [1/4] FULL
        containerVolumeLabel = `${fraction} full`;
      }
    } else if (containerIndex === 0) {
      if (Number.isInteger(fractionNumber)) {
        // 2 CONTAINERS: [1 CONTAINER] FULL
        containerVolumeLabel = `${containerIndex + 1} full`;
      } else {
        // 2 CONTAINERS: [1/4 CONTAINER] FULL
        containerVolumeLabel = `${fraction} full`;
      }
    } else {
      if (Number.isInteger(fractionNumber)) { // eslint-disable-line no-lonely-if
        // 2 CONTAINERS: [1 CONTAINER] FULL
        containerVolumeLabel = `${containerIndex + 1} full`;
      } else { // this should always be true - integers and fractions
        // 2 CONTAINERS: [1 1/4 CONTAINER] FULL
        containerVolumeLabel = `${containerIndex} ${fraction} full`;
      }
    }

    return containerVolumeLabel;
  }

  /**
   * getVolumes
   *
   * @summary Generate a series of human-readable labels/options to display in the volume dropdown.
   * @returns {Array} options
   * @memberof GccContainer
   * @see {@link GccTest#runUnitTests}
   * @todo Also cache this with the container
   */
  getVolumes() {
    const {
      nonVolumes,
      quantity,
      volumeFractions,
    } = this;

    const countNum = Number(quantity);
    const capacity = this.getCapacity();

    const options = [
      {
        label: 'Select compost amount',
        value: '',
      },
    ];

    options.push(
      {
        label: 'Empty',
        value: 0,
      },
      {
        label: 'Almost empty',
        value: 1,
      },
    );

    for (let containerIndex = 0; containerIndex < countNum; containerIndex += 1) {
      volumeFractions.forEach((volumeFraction) => {
        const [ numerator, denominator ] = volumeFraction.split('/');
        const volumeFractionNum = (numerator / denominator);

        // volumeFractionNum is <= 1, except for a single 'overfull' volumeFraction
        // value also factors in the container quantity, so can create top-heavy fractions
        const value = this.fractionToValue(volumeFraction, containerIndex, capacity);

        let label = '';

        if (volumeFractionNum <= 1) {
          // if underfull
          const volumeLabel = this.getVolumeLabel(containerIndex, volumeFraction, volumeFractionNum);
          label = `${volumeLabel} (${value}L)`;
        } else {
          // if overfull
          if (containerIndex + 1 === countNum) { // eslint-disable-line no-lonely-if
            // if this is client's last bucket (1st bucket if 1 bucket, 2nd bucket if 2 buckets, etc)
            // and client is overfilling this bucket
            // then flag this to provider so they can encourage subscription upgrade to an additional bucket
            label = 'Overfull';
          } else {
            label = '';
          }
        }

        if (label !== '') {
          options.push(
            {
              label,
              value,
            },
          );
        }
      });
    }

    nonVolumes.forEach((nonVolume) => {
      options.push(
        {
          label: nonVolume,
          value: nonVolume,
        },
      );
    });

    return options;
  }

  /* Static methods */

  /**
   * getInstanceFromCache
   *
   * @summary Get a cached instance of GccContainer.
   * @param {string} type - Type of container to collect.
   * @param {number} quantity - Quantity of containers to collect.
   * @returns {GccContainer|null} Reinstantiated container instance
   * @memberof GccContainer
   * @static
   * @todo Consider storing quantities as nested objects so there's just one cache per type
   */
  static getInstanceFromCache(type, quantity) {
    const cacheKey = `container-${type}-${quantity}`; // -${format}`;
    const cachedObj = GccCache.getCacheItem(cacheKey);
    let instance;

    const sheet = GccSheet.getInstance();

    if (cachedObj !== null) {
      instance = GccUtils.objectToClassInstance(cachedObj, 'GccContainer');
    } else {
      // if a cell is edited, a new combination of container type-quantity may need to be generated

      // named ranges
      const {
        NRContainerCapacities,
        NRContainerTypes,
        NRNonVolumes,
      } = sheet.getAllNamedRangeValues();

      // instantiate new container (this will then be automatically cached)
      instance = new GccContainer({
        capacities: NRContainerCapacities,
        nonVolumes: NRNonVolumes,
        quantity,
        type,
        types: NRContainerTypes,
        volumeFractions: sheet.containerVolumeFractions,
      });
    }

    return instance;
  }
}
