/**
 * @file GccColor.js
 */
class GccColor {
  /**
   * @class
   * @summary Properties and methods relating to the colours used in the app and spreadsheet.
   * @public
   * @param {object} config                      - Module configuration.
   * @param {Array}  config.colorNamedRangeNames - Named range names (rather than values, as we use the cell colors)
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const { colorNamedRangeNames } = config;

    // before getColors
    this.colorNamedRangeNames = colorNamedRangeNames;

    this.colors = this.getColors();
  }

  /* Getters and Setters */

  /**
   * colors
   *
   * @type {Array}
   * @memberof GccColor
   */
  get colors() {
    return this._colors;
  }

  set colors(colors) {
    this._colors = GccValidate.validate(colors, 'Array', 'GccColor.colors');
  }

  /**
   * instance
   *
   * @type {GccColor}
   * @memberof GccColor
   */
  get instance() {
    return this._instance;
  }

  set instance(instance) {
    this._instance = instance;
  }

  /**
   * colorNamedRangeNames
   *
   * @type {Array}
   * @memberof GccColor
   */
  get colorNamedRangeNames() {
    return this._colorNamedRangeNames;
  }

  set colorNamedRangeNames(colorNamedRangeNames) {
    this._colorNamedRangeNames = GccValidate.validate(colorNamedRangeNames, 'Array', 'GccColor.colorNamedRangeNames');
  }

  /* Instance methods */

  /**
   * getColors
   *
   * @summary Get a structured list of code colours from the GCC Variables sheet.
   * @returns {Array} Colors
   * @memberof GccColor
   */
  getColors() {
    const { colorNamedRangeNames } = this;
    const _colors = [];

    colorNamedRangeNames.forEach((namedRangeName) => {
      const backgroundColors = GccSheet.getInstance().getNamedRangeBackgrounds(namedRangeName);
      const colors = GccSheet.getInstance().getNamedRangeFontColors(namedRangeName);
      const values = GccSheet.getInstance().getNamedRangeValues(namedRangeName);

      values.forEach((value, i) => {
        _colors.push({
          valueRaw: value,
          value: GccUtils.stringToId(value),
          backgroundColorHex: backgroundColors[i][0].trim(),
          backgroundColorRgb: GccColor.hexToRgb(backgroundColors[i][0].trim()),
          colorHex: colors[i][0].trim(),
          colorRgb: GccColor.hexToRgb(colors[i][0].trim()),
        });
      });
    });

    return _colors;
  }

  /**
   * getColorStyles
   *
   * @summary Create color variables and class attributes using RGBA variations.
   * @returns {string} styleHtml
   * @memberof GccColor
   */
  getColorStyles() {
    const { colors } = this;

    let styles = '';
    let cssVariables = '';
    let cssSelectors = '';

    colors.forEach((color) => {
      const { value } = color;

      [ 'backgroundColor', 'color' ].forEach((style) => {
        const { r, g, b } = color[`${style}Rgb`];

        if (style === 'backgroundColor') {
          cssVariables += `
--color-${value}-bg-rgb: ${r}, ${g}, ${b};
--color-${value}-bg-100: rgba(var(--color-${value}-bg-rgb), 1);`;

          cssSelectors += `.color-${value}-bg {
  background-color: rgba(var(--color-${value}-bg-rgb), 1);
}
.color-${value}-bg-light {
  background-color: rgba(var(--color-${value}-bg-rgb), .05);
}
.color-${value}-border {
  border-color: rgba(var(--color-${value}-bg-rgb), .5);
}`;
        } else if (style === 'color') {
          cssVariables += `
--color-${value}-fg-rgb: ${r}, ${g}, ${b};
--color-${value}-fg-100: rgba(var(--color-${value}-fg-rgb), 1);`;

          cssSelectors += `.color-${value}-fg {
  color: rgba(var(--color-${value}-fg-rgb), 1);
}`;
        }
      });
    });

    styles = `

:root {
  ${cssVariables}
}
${cssSelectors}`;

    const styleHtml = `<style id="colors">${styles}</style>`;

    return styleHtml;
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GccColor} instance of class
   * @memberof GccColor
   * @static
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        _config = GccUtils.getAppConfig('GccColor.getInstance');
      }

      this.instance = new GccColor(_config);
    }

    return this.instance;
  }

  /**
   * hexToRgb
   *
   * @summary Convert hexidecimal colour notation to RGB for use with the CSS Custom Properties (variables) system.
   * @param {string} hex Hexidecimal notation
   * @returns {object} rgb
   * @memberof GccColor
   * @static
   * @see {@link GccTest#runUnitTests}
   * @see {@link https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#comment107651282_14101452}
   */
  static hexToRgb(hex) {
    return {
      r: `0x${hex[1]}${hex[2]}` | 0, // eslint-disable-line no-bitwise
      g: `0x${hex[3]}${hex[4]}` | 0, // eslint-disable-line no-bitwise
      b: `0x${hex[5]}${hex[6]}` | 0, // eslint-disable-line no-bitwise
    };
  }
}
