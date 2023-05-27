/**
 * @file GccTest.js
 */
class GccTest {
  /**
   * @class
   * @summary Properties and methods relating to testing of the codebase.
   * @param {object} config - App configuration.
   */
  constructor(config) {
    this.config = config;
    this.stubbedMap = new Map();

    // GccRun.getBounds
    this.expectations = {
      runs: [
        {
          testId: 'SWITCHED ON PICK-UP (SUBURBS)',
          startRowIndex: 13,
          rowCount: 1, // including blank/hijacked rows
        },
        {
          testId: 'SWITCHED ON DROP-OFF (SUBURBS)',
          startRowIndex: 17,
          rowCount: 4, // including blank/hijacked rows
        },
        {
          testId: 'MT VIC RUN',
          startRowIndex: 24,
          rowCount: 17, // including blank/hijacked rows
        },
        {
          testId: 'MT COOK RUN',
          startRowIndex: 44,
          rowCount: 15, // including blank/hijacked rows
        },
        {
          testId: 'BERHAMPORE/NEWTOWN RUN',
          startRowIndex: 62,
          rowCount: 16, // including blank/hijacked rows
        },
        {
          testId: 'NEWTOWN CENTRAL RUN',
          startRowIndex: 81,
          rowCount: 20, // including blank/hijacked rows
        },
        {
          testId: 'SWITCHED ON PICK-UP (TOWN)',
          startRowIndex: 12,
          rowCount: 4, // including blank/hijacked rows
        },
        {
          testId: 'SWITCHED ON DROP-OFF (TOWN)',
          startRowIndex: 19,
          rowCount: 2, // including blank/hijacked rows
        },
        {
          testId: 'NORTH A RUN',
          startRowIndex: 24,
          rowCount: 26, // including blank/hijacked rows
        },
        {
          testId: 'NORTH B RUN',
          startRowIndex: 53,
          rowCount: 13, // including blank/hijacked rows
        },
        {
          testId: 'SOUTH A RUN',
          startRowIndex: 69,
          rowCount: 19, // including blank/hijacked rows
        },
        {
          testId: 'SOUTH B RUN',
          startRowIndex: 91,
          rowCount: 19, // including blank/hijacked rows
        },
      ],
    };
  }

  /* Getters and setters */

  /**
   * config
   *
   * @type {object}
   * @memberof GccTest
   */
  get config() {
    return this._config;
  }

  set config(config) {
    this._config = GccValidate.validate(config, 'object', 'GccTest.config');
  }

  /**
   * expectations
   *
   * @type {object}
   * @memberof GccTest
   */
  get expectations() {
    return this._expectations;
  }

  set expectations(expectations) {
    this._expectations = GccValidate.validate(expectations, 'object', 'GccTest.expectations');
  }

  /**
   * stubbedMap
   *
   * @type {Map}
   * @memberof GccTest
   */
  get stubbedMap() {
    return this._stubbedMap;
  }

  set stubbedMap(stubbedMap) {
    this._stubbedMap = stubbedMap;
  }

  /* Instance methods */

  /**
   * getCollectionInstances
   *
   * @returns {Array} instances of GccCollection
   * @memberof GccTest
   */
  getCollectionInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    const {
      NRDateFlags: collectionDateFlags,
    } = GccSheet.getInstance(appConfig).getAllNamedRangeValues();

    const {
      abbreviations,
    } = appConfig;

    const containerInstances = this.getContainerInstances();

    const testConfigs = [
      {
        abbreviations,
        address: '58/60 Oriental Pde',
        collectionMapLocale: 'Wellington, New Zealand',
        container: containerInstances.bucket1,
        dateFlag: '',
        dateFlags: collectionDateFlags,
        dateValue: '',
        name: 'GSL Promotus',
        notes: 'First floor in the kitchen on the right when you enter the building. Receptionist will unlock door, otherwise knock for access. ',
        runDate: 'Dec 14',
        runName: 'MT VIC RUN',
        type: 'B',
      },
    ];

    testConfigs.forEach((testConfig) => {
      instances.push(new GccCollection(testConfig));
    });

    return instances;
  }

  /**
   * getColorInstances
   *
   * @returns {Array} instances of GccColor
   * @memberof GccTest
   */
  getColorInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    instances.push(new GccColor(appConfig));

    return instances;
  }

  /**
   * getContainerInstances
   *
   * @returns {Array} instances of GccContainer
   * @memberof GccTest
   */
  getContainerInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    const testConfigs = [
      {
        type: 'bucket',
        quantity: 1,
      },
      {
        type: 'bucket',
        quantity: 2,
      },
      {
        type: 'bucket',
        quantity: 3,
      },
      {
        type: 'tub',
        quantity: 1,
      },
      {
        type: 'tub',
        quantity: 2,
      },
      {
        type: 'cookietime',
        quantity: 1,
      },
      {
        type: 'wheeliebin',
        quantity: 1,
      },
    ];

    testConfigs.forEach((testConfig) => {
      const {
        containerVolumeFractions: volumeFractions,
      } = appConfig;

      const {
        type,
        quantity,
      } = testConfig;

      const {
        NRContainerCapacities: capacities,
        NRContainerTypes: types,
        NRNonVolumes: nonVolumes,
      } = GccSheet.getInstance(appConfig).getAllNamedRangeValues();

      const config = {
        capacities,
        nonVolumes,
        quantity,
        type,
        types,
        volumeFractions,
      };

      instances[type + quantity] = new GccContainer(config);
    });

    return instances;
  }

  /**
   * getEnvInstances
   *
   * @returns {Array} instances of GccEnv
   * @memberof GccTest
   */
  getEnvInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    instances.push(new GccEnv(appConfig));

    return instances;
  }

  /**
   * getPageInstances
   *
   * @returns {Array} instances of GccPage
   * @memberof GccTest
   */
  getPageInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    instances.push(new GccPage(appConfig));

    return instances;
  }

  /**
   * getRunInstances
   *
   * @returns {Array} instances of GccRun
   * @memberof GccTest
   */
  getRunInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    const testConfigs = [
      { // A - 0
        name: 'SWITCHED ON PICK-UP (SUBURBS)',
        nextRunName: 'SWITCHED ON DROP-OFF (SUBURBS)',
      },
      { // A - 1
        name: 'SWITCHED ON DROP-OFF (SUBURBS)',
        nextRunName: 'MT VIC RUN',
      },
      { // A - 2
        name: 'MT VIC RUN',
        nextRunName: 'MT COOK RUN',
      },
      { // A - 3
        name: 'MT COOK RUN',
        nextRunName: 'BERHAMPORE/NEWTOWN RUN',
      },
      { // A - 4
        name: 'BERHAMPORE/NEWTOWN RUN',
        nextRunName: 'NEWTOWN CENTRAL RUN',
      },
      { // A - 5
        name: 'NEWTOWN CENTRAL RUN',
        nextRunName: null,
      },
      { // B - 6
        name: 'SWITCHED ON PICK-UP (TOWN)',
        nextRunName: 'SWITCHED ON DROP-OFF (TOWN)',
      },
      { // B - 7
        name: 'SWITCHED ON DROP-OFF (TOWN)',
        nextRunName: 'NORTH A RUN',
      },
      { // B - 8
        name: 'NORTH A RUN',
        nextRunName: 'NORTH B RUN',
      },
      { // B - 9
        name: 'NORTH B RUN',
        nextRunName: 'SOUTH A RUN',
      },
      { // B - 10
        name: 'SOUTH A RUN',
        nextRunName: 'SOUTH B RUN',
      },
      { // B - 11
        name: 'SOUTH B RUN',
        nextRunName: null,
      },
    ];

    testConfigs.forEach((testConfig) => {
      const {
        abbreviations,
        collectionMapLocale,
        containerVolumeFractions,
        runBlankRowsAfter,
      } = appConfig;

      const {
        name,
        nextRunName,
      } = testConfig;

      const config = {
        abbreviations,
        collectionMapLocale,
        containerVolumeFractions,
        name,
        nextRunName,
        runBlankRowsAfter,
      };

      instances.push(new GccRun(config));
    });

    return instances;
  }

  /**
   * getRunGroupInstances
   *
   * @returns {Array} instances of GccRunGroup
   * @memberof GccTest
   */
  getRunGroupInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    const testConfigs = [
      {
        columnHeaderIndices: {
          customer: 1,
          type: 2,
          quantity: 3,
          container: 4,
          address: 5,
          notes: 6,
        },
        columnHeaderRowIndex: 10,
        footer: GccSheet.getInstance().getNamedRangeValue('NRRunGroup1Footer'),
        postRunExtras: GccSheet.getInstance().getNamedRangeValue('NRRunGroup1PostRunHeader'),
        preRunExtras: GccSheet.getInstance().getNamedRangeValue('NRRunGroup1PreRunHeader'),
        runNames: [
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup1RunHeader1'),
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup1RunHeader2'),
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup1RunHeader3'),
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup1RunHeader4'),
        ],
        sheetName: 'Suburbs Run (WED)',
      },
      {
        columnHeaderIndices: {
          customer: 1,
          type: 2,
          quantity: 3,
          container: 4,
          address: 5,
          notes: 6,
        },
        columnHeaderRowIndex: 10,
        footer: GccSheet.getInstance().getNamedRangeValue('NRRunGroup2Footer'),
        postRunExtras: GccSheet.getInstance().getNamedRangeValue('NRRunGroup2PostRunHeader'),
        preRunExtras: GccSheet.getInstance().getNamedRangeValue('NRRunGroup2PreRunHeader'),
        runNames: [
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup2RunHeader1'),
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup2RunHeader2'),
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup2RunHeader3'),
          GccSheet.getInstance().getNamedRangeValue('NRRunGroup2RunHeader4'),
        ],
        sheetName: 'Town Run (FRI)',
      },
    ];

    testConfigs.forEach((testConfig) => {
      const {
        columnHeaderIndices,
        columnHeaderRowIndex,
        footer,
        postRunExtras,
        preRunExtras,
        runNames,
        sheetName,
      } = testConfig;

      const {
        dateFormat,
      } = appConfig;

      const config = {
        columnHeaderIndices,
        columnHeaderRowIndex,
        dateFormat,
        footer,
        postRunExtras,
        preRunExtras,
        runNames,
        sheetName,
      };

      instances.push(new GccRunGroup(config));
    });

    return instances;
  }

  /**
   * getSheetInstances
   *
   * @returns {Array} instances of GccSheet
   * @memberof GccTest
   */
  getSheetInstances() {
    const {
      config: appConfig,
    } = this;

    const instances = [];

    instances.push(new GccSheet(appConfig));

    return instances;
  }

  /**
   * getUtilsInstances
   *
   * @returns {Array} instances of GccUtils
   * @memberof GccTest
   */
  getUtilsInstances() {
    const instances = [];

    instances.push(GccUtils);

    return instances;
  }

  /**
   * runIntegrationTests
   *
   * @summary Run integration tests
   * @param {object} QUnit - QUnit
   * @memberof GccTest
   */
  runIntegrationTests(QUnit) {
    const {
      config: appConfig,
    } = this;

    GccCache.clearCache();
    GccUtils.setAppConfig(appConfig);

    QUnit.module('Test data', {
      before: () => {
        this.runs = this.getRunInstances();
        this.sheets = this.getSheetInstances();
        this.runGroups = this.getRunGroupInstances();

        this.columnHeaders = [
          'Customer',
          'Type',
          'Quantity',
          'Container',
          'Address',
          'Notes',
        ];

        // this.driveIds = {
        //   customerBucketSpotPics: '1bOcRhEnsm65vdqzRpkIhMgE8gNlkfATd',
        // };

        this.runGroup0 = {
          _columnHeaderIndices: {
            address: 5,
            container: 4,
            customer: 1,
            notes: 6,
            quantity: 3,
            type: 2,
          },
          _columnHeaderRowIndex: 10,
          _dateHeaderRangeA1Notation: 'J10:P10',
          _dateHeaders: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          _dateHeadersFormatted: [
            'Nov 23',
            'Nov 30',
            'Dec 7',
            'Dec 14',
            'Dec 21',
            'Jan 6',
            'Jan 13',
          ],
          _footer: 'End of collections. Do not edit this row.',
          _id: 'suburbs-run-wed',
          _postRunExtras: 'SWITCHED ON DROP-OFF (SUBURBS)',
          _preRunExtras: 'SWITCHED ON PICK-UP (SUBURBS)',
          _runNames: [
            'MT VIC RUN',
            'MT COOK RUN',
            'BERHAMPORE/NEWTOWN RUN',
            'NEWTOWN CENTRAL RUN',
          ],
          _sheetName: 'Suburbs Run (WED)',
          dateFormat: 'MMM d',
        };

        this.runGroup0Collections = [
          this.runs[2].getCollections('Dec 14'), // MT VIC
          this.runs[3].getCollections('Dec 14'), // MT COOK
          this.runs[4].getCollections('Dec 14'), // BERHAMPORE/NEWTOWN RUN
          this.runs[5].getCollections('Dec 14'), // NEWTOWN CENTRAL
        ];

        this.runGroup0RunDate = 'Nov 2'; // note: must be a non-hidden date column

        this.runGroup0RunSheet = GccSheet.getRunSheet(this.runGroup0._sheetName);

        this.runGroup1 = {
          _columnHeaderIndices: {
            address: 5,
            container: 4,
            customer: 1,
            notes: 6,
            quantity: 3,
            type: 2,
          },
          _columnHeaderRowIndex: 10,
          _dateHeaderRangeA1Notation: 'J10:Q10',
          _dateHeaders: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          _dateHeadersFormatted: [
            'Nov 4',
            'Nov 11',
            'Nov 18',
            'Nov 25',
            'Dec 2',
            'Dec 9',
          ],
          _footer: 'End of collections. Do not edit this row.',
          _id: 'town-run-fri',
          _postRunExtras: 'SWITCHED ON DROP-OFF (TOWN)',
          _preRunExtras: 'SWITCHED ON PICK-UP (TOWN)',
          _runNames: [
            'NORTH A RUN',
            'NORTH B RUN',
            'SOUTH A RUN',
            'SOUTH B RUN',
          ],
          _sheetName: 'Town Run (FRI)',
          dateFormat: 'MMM d',
        };

        this.runGroup1Collections = [
          this.runs[8].getCollections('Dec 9'), // NORTH A
          this.runs[9].getCollections('Dec 9'), // NORTH B
          this.runs[10].getCollections('Dec 9'), // SOUTH A
          this.runs[11].getCollections('Dec 9'), // SOUTH B
        ];

        this.runGroup1RunDate = 'Nov 4'; // note: must be a non-hidden date column
      },
    });

    QUnit.test('setup', (assert) => {
      assert.equal(
        this.runGroup0RunDate,
        'Nov 2',
        'Test data is accessible',
      );
    });

    // QUnit.test('getMatchingAddressPhotos', (assert) => {
    //   assert.propEqual(
    //     // method, address
    //     collections[0].getMatchingAddressPhotos(),
    //     [
    //       'https://drive.google.com/uc?export=view&id=1NJNRT6buI3fZ0jwRtlSUUd6s1G2NS41c',
    //     ],
    //     'Array of matching photo URLs',
    //   );

    // TODO: dotherightthing/kaicycle-run-mobile/#206

    // QUnit.module.todo('GccDrive');

    // QUnit.test('getAddressPhotos', (assert) => {
    //   assert.propEqual(
    //     // method
    //     GccDrive.getAddressPhotos(),
    //     {
    //       '7/46 Hiropi St.png': 'https://drive.google.com/uc?export=view&id=1NJNRT6buI3fZ0jwRtlSUUd6s1G2NS41c',
    //       '7/76 Brougham St_2.HEIC': 'https://drive.google.com/uc?export=view&id=1TNSTqO7EvaDE34kwRlxGY8BcTFBi1UHf',
    //       '11 Newtown Ave.PNG': 'https://drive.google.com/uc?export=view&id=1yCOBsthA-9U7vWBQISviNsr4U4ZLij5I',
    //       '121A Brougham St.png': 'https://drive.google.com/uc?export=view&id=1JdZpV13emJU_SyjjBXBobhmsaEi4N4ZW',
    //       '71 webb access.jpg': 'https://drive.google.com/uc?export=view&id=11wlvD1igtk6D_aWyBDL0IyVDBos4yZ2M',
    //       'Wellington Free Ambulance.jpg': 'https://drive.google.com/uc?export=view&id=14YaOJklDiu_FWgMot2carBSQEHDDUkHk',
    //       '5-60 Owen St.jpg': 'https://drive.google.com/uc?export=view&id=1lXtss5Txp4Lv110kAl4CEsHmcmbWbuIY',
    //       '103-41 Hopper Street 1.png': 'https://drive.google.com/uc?export=view&id=1O8Po2sJg6iFNTDtj9leA4c42Crr_5saR',
    //       '103-41 Hopper Street 3.png': 'https://drive.google.com/uc?export=view&id=19599R2QaY5BjVzSqcsY8Xwr24zQ6tWsv',
    //       '103-41 Hopper Street 2.jpg': 'https://drive.google.com/uc?export=view&id=1X_c7wXFx9MxNIWSK1nRgjE-NHqoad2Dz',
    //       '290 Adelaide Rd.PNG': 'https://drive.google.com/uc?export=view&id=1yJmVOcmsXZD4xpSzxGzBweqH5DNkCKLi'
    //     },
    //     'Object containing filenames and URLs',
    //   );

    //   assert.propEqual(
    //     // method, id
    //     GccDrive.getFolderContents(this.driveIds.customerBucketSpotPics),
    //     {
    //       '7/46 Hiropi St.png': 'https://drive.google.com/uc?export=view&id=1NJNRT6buI3fZ0jwRtlSUUd6s1G2NS41c',
    //       '7/76 Brougham St_2.HEIC': 'https://drive.google.com/uc?export=view&id=1TNSTqO7EvaDE34kwRlxGY8BcTFBi1UHf',
    //       '11 Newtown Ave.PNG': 'https://drive.google.com/uc?export=view&id=1yCOBsthA-9U7vWBQISviNsr4U4ZLij5I',
    //       '121A Brougham St.png': 'https://drive.google.com/uc?export=view&id=1JdZpV13emJU_SyjjBXBobhmsaEi4N4ZW',
    //       '71 webb access.jpg': 'https://drive.google.com/uc?export=view&id=11wlvD1igtk6D_aWyBDL0IyVDBos4yZ2M',
    //       'Wellington Free Ambulance.jpg': 'https://drive.google.com/uc?export=view&id=14YaOJklDiu_FWgMot2carBSQEHDDUkHk',
    //       '5-60 Owen St.jpg': 'https://drive.google.com/uc?export=view&id=1lXtss5Txp4Lv110kAl4CEsHmcmbWbuIY',
    //       '103-41 Hopper Street 1.png': 'https://drive.google.com/uc?export=view&id=1O8Po2sJg6iFNTDtj9leA4c42Crr_5saR',
    //       '103-41 Hopper Street 3.png': 'https://drive.google.com/uc?export=view&id=19599R2QaY5BjVzSqcsY8Xwr24zQ6tWsv',
    //       '103-41 Hopper Street 2.jpg': 'https://drive.google.com/uc?export=view&id=1X_c7wXFx9MxNIWSK1nRgjE-NHqoad2Dz',
    //       '290 Adelaide Rd.PNG': 'https://drive.google.com/uc?export=view&id=1yJmVOcmsXZD4xpSzxGzBweqH5DNkCKLi'
    //     },
    //     'Object containing filenames and URLs',
    //   );
    // });

    QUnit.module.todo('GccPage');

    // QUnit.test('getHtmlAndVariablesFromRunDateFormObject', (assert) => {});

    QUnit.module('GccRun');

    QUnit.test('getCollections', (assert) => {
      assert.equal(
        this.runGroup0Collections[0].length,
        this.expectations.runs[2].rowCount,
        'Run 2 - Number of collections',
      );

      assert.equal(
        this.runGroup0Collections[0][0].address,
        '58/60 Oriental Pde',
        'Run 2 - First customer\'s address',
      );

      assert.equal(
        this.runGroup0Collections[0][this.expectations.runs[2].rowCount - 1].address,
        '1/33 Hania St',
        'Run 2 - Last customer\'s address',
      );

      assert.equal(
        this.runGroup0Collections[1].length,
        this.expectations.runs[3].rowCount,
        'Run 3 - Number of collections',
      );

      assert.equal(
        this.runGroup0Collections[1][0].address,
        '1/2 King St',
        'Run 3 - First customer\'s address',
      );

      assert.equal(
        this.runGroup0Collections[1][this.expectations.runs[3].rowCount - 1].address,
        '71 Webb St',
        'Run 3 - Last customer\'s address',
      );

      assert.equal(
        this.runGroup0Collections[2].length,
        this.expectations.runs[4].rowCount,
        'Run 4 - Number of collections',
      );

      assert.equal(
        this.runGroup0Collections[2][0].address,
        '3/239 Adelaide Rd',
        'Run 4 - First customer\'s address',
      );

      assert.equal(
        this.runGroup0Collections[2][this.expectations.runs[4].rowCount - 1].address,
        '23/10 Colombo St',
        'Run 4 - Last customer\'s address',
      );

      assert.equal(
        this.runGroup0Collections[3].length,
        this.expectations.runs[5].rowCount,
        'Run 5 - Number of collections',
      );

      assert.equal(
        this.runGroup0Collections[3][0].address,
        '17 Mein St',
        'Run 5 - First customer\'s address',
      );

      assert.equal(
        this.runGroup0Collections[3][this.expectations.runs[5].rowCount - 1].address,
        '11 Newtown Ave',
        'Run 5 - Last customer\'s address',
      );

      // TODO: dotherightthing/kaicycle-run-mobile/#206

      // assert.propEqual(
      //   this.runGroup0Collections[3][21].addressPhotos,
      //   [
      //     'https://drive.google.com/uc?export=view&id=1yCOBsthA-9U7vWBQISviNsr4U4ZLij5I',
      //   ],
      //   'Run 5 - Last customer\'s address photos',
      // );

      assert.equal(
        this.runGroup1Collections[0].length,
        this.expectations.runs[8].rowCount,
        'Run 8 - Number of collections',
      );

      assert.equal(
        this.runGroup1Collections[0][0].address,
        '3 Aro St',
        'Run 8 - First customer\'s address',
      );

      assert.equal(
        this.runGroup1Collections[0][this.expectations.runs[8].rowCount - 1].address,
        'Level 1, 22-28 Willeston St',
        'Run 8 - Last customer\'s address',
      );

      assert.equal(
        this.runGroup1Collections[1].length,
        this.expectations.runs[9].rowCount,
        'Run 9 - Number of collections',
      );

      assert.equal(
        this.runGroup1Collections[1][0].address,
        'Level 13, 58-66 Jervois Quay',
        'Run 9 - First customer\'s address',
      );

      assert.equal(
        this.runGroup1Collections[1][this.expectations.runs[9].rowCount - 1].address,
        '1/39 Ghuznee St',
        'Run 9 - Last customer\'s address',
      );

      assert.equal(
        this.runGroup1Collections[2].length,
        this.expectations.runs[10].rowCount,
        'Run 10 - Number of collections',
      );

      assert.equal(
        this.runGroup1Collections[2][0].address,
        'Level 6, 175 Victoria St',
        'Run 10 - First customer\'s address',
      );

      assert.equal(
        this.runGroup1Collections[2][this.expectations.runs[10].rowCount - 1].address,
        'Level 1, 12 Jessie St',
        'Run 10 - Last customer\'s address',
      );

      assert.equal(
        this.runGroup1Collections[3].length,
        this.expectations.runs[11].rowCount,
        'Run 11 - Number of collections',
      );

      assert.equal(
        this.runGroup1Collections[3][0].address,
        '40a Vivian St',
        'Run 11 - First customer\'s address',
      );

      assert.equal(
        this.runGroup1Collections[3][this.expectations.runs[11].rowCount - 1].address,
        '5 Eva St',
        'Run 11 - Last customer\'s address',
      );
    });

    QUnit.test('getColumnRange', (assert) => {
      assert.equal(
        // see startRowIndex and rowCount are sourced from getBounds(), above
        this.runs[2].getColumnRange(this.runGroup0RunDate)
          .getA1Notation(),
        'G24:G40',
        'Date-specific range of volume entries',
      );
    });

    QUnit.test('getRunGroup', (assert) => {
      assert.propEqual(
        GccRun.getRunGroup(this.runGroup0._runNames[0]),
        this.runGroup0,
        'Run belongs to run group',
      );
    });

    QUnit.module('GccRunGroup');

    QUnit.test('getDates', (assert) => {
      assert.propEqual(
        this.runGroups[0].getDates(),
        [
          'Jan 13',
          'Jan 6',
          'Dec 21',
          'Dec 14',
          'Dec 7',
          'Nov 30',
          'Nov 23',
        ],
        'Array of visible suburbs run dates, filtered to this year',
      );

      // https://github.com/dotherightthing/kaicycle-run-mobile-standalone/issues/336
      assert.propEqual(
        this.runGroups[1].getDates(),
        [
          'Jan 6',
          'Dec 16',
          'Dec 9',
          'Dec 2',
          'Nov 25',
          'Nov 18',
          'Nov 11',
          'Nov 4',
        ],
        'Array of visible town run dates, filtered to this year',
      );
    });

    QUnit.module('GccSheet');

    QUnit.test('Sheet created', (assert) => {
      assert.equal(
        this.sheets[0].appName,
        'Gsheet Compost Collections',
        'GccSheet.appName is correct',
      );
    });

    QUnit.test('getCellByString', (assert) => {
      assert.equal(
        GccSheet.getCellByString(this.runGroup0._sheetName, 'Bike & Trailer Check!! SOB rig')
          .getA1Notation(),
        'A6',
        'Range of spreadsheet cell containing text',
      );
    });

    QUnit.test('getColumnIndex', (assert) => {
      assert.equal(
        GccSheet.getColumnIndex(this.runGroup0._sheetName, this.columnHeaders[0]),
        1,
        'Numeric index of spreadsheet column containing columnHeader 1',
      );

      assert.equal(
        GccSheet.getColumnIndex(this.runGroup0._sheetName, this.columnHeaders[1]),
        2,
        'Numeric index of spreadsheet column containing columnHeader 2',
      );

      assert.equal(
        GccSheet.getColumnIndex(this.runGroup0._sheetName, this.columnHeaders[2]),
        3,
        'Numeric index of spreadsheet column containing columnHeader 3',
      );

      assert.equal(
        GccSheet.getColumnIndex(this.runGroup0._sheetName, this.columnHeaders[3]),
        4,
        'Numeric index of spreadsheet column containing columnHeader 4',
      );

      assert.equal(
        GccSheet.getColumnIndex(this.runGroup0._sheetName, this.runGroup0RunDate),
        7,
        'Numeric index of spreadsheet column containing run date',
      );
    });

    QUnit.test('getLastRowIndex', (assert) => {
      assert.equal(
        this.sheets[0].getLastRowIndex(this.runGroup0._sheetName, this.runGroup0._footer),
        100,
        'Numeric index of last collection row in spreadsheet',
      );

      assert.equal(
        this.sheets[0].getLastRowIndex(this.runGroup1._sheetName, this.runGroup0._footer),
        109,
        'Numeric index of last collection row in spreadsheet',
      );
    });

    QUnit.test('getNamedRangeValues', (assert) => {
      assert.propEqual(
        this.sheets[0].getNamedRangeValues('NRContainerCapacities'),
        [ 20, 70, 2, 140 ],
        'Items in named range',
      );

      assert.propEqual(
        this.sheets[0].getNamedRangeValues('NRDateFlags'),
        [
          'See notes',
          'Back to normal',
          'Drop',
          'First collection',
          'Skip',
          'Final',
          'COVID case',
          'Cancelled',
          'Pending',
        ],
        'Items in named range',
      );
    });

    QUnit.test('getRangeValues', (assert) => {
      assert.propEqual(
        this.sheets[0].getRangeValues(this.runGroup0._runNames[0], this.runGroup0RunDate),
        [
          10,
          'Not found',
          10,
          10,
          10,
          15,
          10,
          15,
          15,
          'Not found',
          'Skip',
          5,
          15,
          15,
          15,
          10,
          10,
        ],
        'Array of volume entries for the specified date',
      );
    });

    QUnit.test('getRowIndex', (assert) => {
      assert.equal(
        GccSheet.getRowIndex(this.runGroup0._sheetName, this.runGroup0._runNames[0]),
        23,
        'Numeric index of spreadsheet row containing run header',
      );
    });

    QUnit.test('getRunSheet', (assert) => {
      assert.equal(
        GccSheet.getRunSheet(this.runGroup0._sheetName)
          .getName(),
        this.runGroup0._sheetName,
        'Tab of spreadsheet containing run collections',
      );
    });

    QUnit.test('validateRangeValues', (assert) => {
      assert.equal(
        GccSheet.validateRangeValues(
          this.runGroup0RunSheet.getRange('J24'),
          'Whatever',
        ).invalid[0],
        '"Whatever" is not a valid value for cell J24 (VALUE_IN_LIST 0,1,5,10,15,20,25,Not found,No access,Dropped (first),Collected (final),See group chat,------,See notes,Back to normal,Drop,First collection,Skip,Final,COVID case,Cancelled,Pending)',
        'String value rejected when not present in validation list',
      );

      // TODO this is a false positive
      assert.equal(
        GccSheet.validateRangeValues(
          this.runGroup0RunSheet.getRange('J17'),
          'Whatever',
        ).valid[0],
        '"Whatever" is a valid value for cell J17 ( unsupported by GccSheet.validateValue)',
        'String value rejected when checkbox validation',
      );

      // TODO this is a false positive
      assert.equal(
        GccSheet.validateRangeValues(
          this.runGroup0RunSheet.getRange('J17'),
          '',
        ).valid[0],
        '"false" is a valid value for cell J17 ( unsupported by GccSheet.validateValue)',
        'Empty string value rejected when checkbox validation',
      );

      // TODO this is a false negative
      assert.equal(
        GccSheet.validateRangeValues(
          this.runGroup0RunSheet.getRange('J24'),
          '',
        ).invalid[0],
        '"5" is not a valid value for cell J24 (VALUE_IN_LIST 0,1,5,10,15,20,25,Not found,No access,Dropped (first),Collected (final),See group chat,------,See notes,Back to normal,Drop,First collection,Skip,Final,COVID case,Cancelled,Pending)',
        'Empty string value accepted when not present in validation list',
      );

      assert.equal(
        GccSheet.validateRangeValues(
          this.runGroup0RunSheet.getRange('J9'),
          '',
        ).valid[0],
        '"" is a valid value for cell J9 ( unsupported by GccSheet.validateValue)',
        'Empty string value accepted when no validation present',
      );
    });

    // TODO dotherightthing/kaicycle-run-mobile#201
    // TODO fix
    // QUnit.test('writeToSheetFromRunFormObject', (assert) => {
    //   assert.equal(
    //     // method, formObject
    //     GccSheet.writeToSheetFromRunFormObject({
    //       'collection09-notes': '',
    //       'collection09-volume': '',
    //       tplSelectedRunNameA: 'MT COOK RUN',
    //       tplSelectedRunNameB: '',
    //       tplRunDate: 'Mar 23',
    //       tplPreRunExtras: '',
    //       tplPostRunExtras: '',
    //       'collection03-notes': '',
    //       'collection03-volume': '',
    //       'collection12-notes': '',
    //       'collection12-volume': '',
    //       'collection11-notes': '',
    //       'collection11-volume': '',
    //       'collection13-notes': '',
    //       'collection13-volume': '',
    //       'collection04-notes': '',
    //       'collection04-volume': '',
    //       'collection01-notes': 'Test note',
    //       'collection01-volume': '1',
    //       'collection05-notes': '',
    //       'collection05-volume': '',
    //       'collection07-notes': '',
    //       'collection07-volume': '',
    //       'collection08-notes': '',
    //       'collection08-volume': '',
    //       'collection00-notes': '',
    //       'collection00-volume': '',
    //       'collection06-notes': '',
    //       'collection06-volume': '',
    //       'collection10-notes': '',
    //       'collection10-volume': '',
    //       'collection02-notes': '',
    //       'collection02-volume': '',
    //     }),
    //     'Changes saved',
    //     'Form submission successful',
    //   );
    // });
  }

  /**
   * runUnitTests
   *
   * @summary Run unit tests.
   *  Note: config object is passed into instantiations as unit tests can't access the serverside cache.
   * @param {object} QUnit - QUnit
   * @see {@link https://api.qunitjs.com/QUnit/module/} for setup/teardown
   * @memberof GccTest
   */
  runUnitTests(QUnit) {
    this.sheets = this.getSheetInstances();
    this.collections = this.getCollectionInstances();
    this.colors = this.getColorInstances();
    this.containers = this.getContainerInstances();
    this.runGroups = this.getRunGroupInstances();
    this.pages = this.getPageInstances();
    this.runs = this.getRunInstances();
    this.utils = this.getUtilsInstances();

    QUnit.module('GccColor');

    QUnit.test('hexToRgb (static)', (assert) => {
      assert.propEqual(
        // hex
        GccColor.hexToRgb('#ff0000'),
        {
          r: 255,
          g: 0,
          b: 0,
        },
        'Hex value converted to RGB value',
      );
    });

    QUnit.module('GccContainer');

    QUnit.test('fractionToValue', (assert) => {
      assert.equal(
        this.containers.bucket1.fractionToValue('1/8', 0, 20),
        '2.5',
        '1/8 bucket',
      );

      assert.equal(
        this.containers.bucket1.fractionToValue('1/4', 0, 20),
        '5',
        '1/4 bucket',
      );

      assert.equal(
        this.containers.bucket1.fractionToValue('1/3', 0, 20),
        '6.67',
        '1/3 bucket',
      );

      assert.equal(
        this.containers.bucket1.fractionToValue('1/2', 0, 20),
        '10',
        '1/2 bucket',
      );

      assert.equal(
        this.containers.bucket1.fractionToValue('2/3', 0, 20),
        '13.33',
        '2/3 bucket',
      );

      assert.equal(
        this.containers.bucket1.fractionToValue('3/4', 0, 20),
        '15',
        '3/4 bucket',
      );

      assert.equal(
        this.containers.bucket1.fractionToValue('4/4', 0, 20),
        '20',
        '1 bucket',
      );
    });

    // note: fractions > 1 are filtered out by getVolumes before they reach getVolumeLabel
    // and given a label of 'Overfull' for the 'last' bucket (1st bucket if 1 bucket, 2nd bucket if 2 buckets, etc)
    // otherwise ignored
    // see passing test for getVolumes
    QUnit.test('getVolumeLabel', (assert) => {
      assert.equal(
        this.containers.bucket1.getVolumeLabel(0, '1/4', 0.25),
        '1/4 full',
        'One bucket - one quarter full',
      );

      assert.equal(
        this.containers.bucket1.getVolumeLabel(0, '4/4', 1),
        'Full',
        'One bucket - full',
      );

      assert.equal(
        this.containers.bucket2.getVolumeLabel(0, '4/4', 1),
        '1 full',
        'Two buckets - one bucket full',
      );

      assert.equal(
        this.containers.bucket2.getVolumeLabel(0, '1/4', 0.25),
        '1/4 full',
        'Two buckets - first bucket one quarter full',
      );

      assert.equal(
        this.containers.bucket2.getVolumeLabel(1, '1/4', 0.25),
        '1 1/4 full',
        'Two buckets - first bucket full, second bucket one quarter full',
      );

      assert.equal(
        this.containers.bucket3.getVolumeLabel(2, '1/4', 0.25),
        '2 1/4 full',
        'Three buckets - first bucket full, second bucket full, third bucket one quarter full',
      );

      assert.equal(
        this.containers.bucket3.getVolumeLabel(2, '4/4', 3),
        '3 full',
        'Three buckets - all full',
      );
    });

    QUnit.test('getVolumes', (assert) => {
      assert.propEqual(
        this.containers.bucket1.getVolumes(),
        [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (5L)',
            value: '5',
          },
          {
            label: '1/2 full (10L)',
            value: '10',
          },
          {
            label: '3/4 full (15L)',
            value: '15',
          },
          {
            label: 'Full (20L)',
            value: '20',
          },
          {
            label: 'Overfull',
            value: '25',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
        'Array of select options',
      );

      assert.propEqual(
        this.containers.bucket2.getVolumes(),
        [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (5L)',
            value: '5',
          },
          {
            label: '1/2 full (10L)',
            value: '10',
          },
          {
            label: '3/4 full (15L)',
            value: '15',
          },
          {
            label: '1 full (20L)',
            value: '20',
          },
          {
            label: '1 1/4 full (25L)',
            value: '25',
          },
          {
            label: '1 1/2 full (30L)',
            value: '30',
          },
          {
            label: '1 3/4 full (35L)',
            value: '35',
          },
          {
            label: '2 full (40L)',
            value: '40',
          },
          {
            label: 'Overfull',
            value: '45',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
        'Array of select options',
      );

      assert.propEqual(
        this.containers.bucket3.getVolumes(),
        [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (5L)',
            value: '5',
          },
          {
            label: '1/2 full (10L)',
            value: '10',
          },
          {
            label: '3/4 full (15L)',
            value: '15',
          },
          {
            label: '1 full (20L)',
            value: '20',
          },
          {
            label: '1 1/4 full (25L)',
            value: '25',
          },
          {
            label: '1 1/2 full (30L)',
            value: '30',
          },
          {
            label: '1 3/4 full (35L)',
            value: '35',
          },
          {
            label: '2 full (40L)',
            value: '40',
          },
          {
            label: '2 1/4 full (45L)',
            value: '45',
          },
          {
            label: '2 1/2 full (50L)',
            value: '50',
          },
          {
            label: '2 3/4 full (55L)',
            value: '55',
          },
          {
            label: '3 full (60L)',
            value: '60',
          },
          {
            label: 'Overfull',
            value: '65',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
        'Array of select options',
      );

      assert.propEqual(
        this.containers.tub1.getVolumes(),
        [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (17.5L)',
            value: '17.5',
          },
          {
            label: '1/2 full (35L)',
            value: '35',
          },
          {
            label: '3/4 full (52.5L)',
            value: '52.5',
          },
          {
            label: 'Full (70L)',
            value: '70',
          },
          {
            label: 'Overfull',
            value: '87.5',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
        'Array of select options',
      );

      assert.propEqual(
        this.containers.tub2.getVolumes(),
        [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (17.5L)',
            value: '17.5',
          },
          {
            label: '1/2 full (35L)',
            value: '35',
          },
          {
            label: '3/4 full (52.5L)',
            value: '52.5',
          },
          {
            label: '1 full (70L)',
            value: '70',
          },
          {
            label: '1 1/4 full (87.5L)',
            value: '87.5',
          },
          {
            label: '1 1/2 full (105L)',
            value: '105',
          },
          {
            label: '1 3/4 full (122.5L)',
            value: '122.5',
          },
          {
            label: '2 full (140L)',
            value: '140',
          },
          {
            label: 'Overfull',
            value: '157.5',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
        'Array of select options',
      );

      assert.propEqual(
        this.containers.cookietime1.getVolumes(),
        [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (0.5L)',
            value: '0.5',
          },
          {
            label: '1/2 full (1L)',
            value: '1',
          },
          {
            label: '3/4 full (1.5L)',
            value: '1.5',
          },
          {
            label: 'Full (2L)',
            value: '2',
          },
          {
            label: 'Overfull',
            value: '2.5',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
        'Array of select options',
      );

      assert.propEqual(
        this.containers.wheeliebin1.getVolumes(),
        [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (35L)',
            value: '35',
          },
          {
            label: '1/2 full (70L)',
            value: '70',
          },
          {
            label: '3/4 full (105L)',
            value: '105',
          },
          {
            label: 'Full (140L)',
            value: '140',
          },
          {
            label: 'Overfull',
            value: '175',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
        'Array of select options',
      );
    });

    QUnit.module('GccPage');

    QUnit.test('getFeedbackMailtoLink', (assert) => {
      assert.equal(
        this.pages[0].getFeedbackMailtoLink('Feedback'),
        'mailto:dan@dotherightthing.co.nz?subject=Gsheet%20Compost%20Collections%20-%20Feedback%20(DEV)&amp;body=Please%20enter%20your%20feedback/request.%20If%20you%20are%20logging%20a%20bug,%20please%20describe%20the%20steps%20required%20to%20recreate%20it.%20Thanks!%0D%0A%0D%0A',
        'Mailto link is well formed',
      );
    });

    QUnit.module('GccRun');

    // note: rowCount should include blank/hijacked rows
    QUnit.test('getBounds', (assert) => {
      this.expectations.runs.forEach((run, i) => {
        assert.propEqual(
          this.runs[i].getBounds(),
          {
            startRowIndex: run.startRowIndex,
            rowCount: run.rowCount,
          },
          `${run.testId} - expected startRowIndex and rowCount`,
        );
      });
    });

    QUnit.module('GccUiCollection');

    QUnit.todo('getTypeDefinition', (assert) => {
      assert.equal(
        this.uiCollections[0].getTypeDefinition(),
        'Business',
        `Abbreviation ${this.uiCollections[0].type} has definition ${this.uiCollections[0].typeDefinition}`,
      );
    });

    QUnit.module('GccUtils');

    QUnit.test('stringToCapitalised', (assert) => {
      assert.equal(
        // method, str
        this.utils[0].stringToCapitalised('capitalised string'),
        'Capitalised string',
        'String is capitalised',
      );
    });

    QUnit.test('stringToId', (assert) => {
      assert.equal(
        // method, string
        this.utils[0].stringToId('MT VIC RUN'),
        'mt-vic-run',
        'Replaced spaces with dashes',
      );

      assert.equal(
        // method, string
        this.utils[0].stringToId('BERHAMPORE/NEWTOWN RUN'),
        'berhampore-newtown-run',
        'Replaced slashes with dashes',
      );
    });
  }

  /**
   * stub
   *
   * @summary Stub a function in order to control its output and prevent calls to the server.
   * @param {string} classMethod Class.method
   * @param {Array} args Args
   * @param {*} returnValue Return value
   * @memberof GccTest
   * @example this.stub('GccCache.clearCache', [], 'Deleted cache');
   */
  stub(classMethod, args, returnValue) {
    const [
      className,
      method,
    ] = classMethod.split('.');

    const classMap = new Map([
      [ 'GccCache', GccCache ],
      [ 'GccCacheInstance', GccCache.prototype ],
      [ 'GccCollection', GccCollection ],
      [ 'GccCollectionInstance', GccCollection.prototype ],
      [ 'GccColor', GccColor ],
      [ 'GccColorInstance', GccColor.prototype ],
      [ 'GccContainer', GccContainer ],
      [ 'GccContainerInstance', GccContainer.prototype ],
      [ 'GccEnv', GccEnv ],
      [ 'GccEnvInstance', GccEnv.prototype ],
      [ 'GccPage', GccPage ],
      [ 'GccPageInstance', GccPage.prototype ],
      [ 'GccRun', GccRun ],
      [ 'GccRunInstance', GccRun.prototype ],
      [ 'GccRunGroup', GccRunGroup ],
      [ 'GccRunGroupInstance', GccRunGroup.prototype ],
      [ 'GccSheet', GccSheet ],
      [ 'GccSheetInstance', GccSheet.prototype ],
    ]);

    const Class = classMap.get(className);

    if (typeof returnValue !== 'undefined') {
      let stubbed;

      if (typeof this.stubbedMap.get(classMethod) !== 'undefined') {
        stubbed = this.stubbedMap.get(classMethod);
      } else {
        this.stubbedMap.set(classMethod, sinon.stub((Class), method));
        stubbed = this.stubbedMap.get(classMethod);
      }

      stubbed.withArgs(...args).returns(returnValue);
    } else {
      sinon.stub((Class), method);
    }
  }

  /**
   * stubGccCache
   *
   * @memberof GccTest
   */
  stubGccCache() {
    this.stub('GccCache.clearCache', [], 'Deleted cache');
    this.stub('GccCache.getCacheItem', [], null);
    this.stub('GccCache.logCache', [], {});
    this.stub('GccCache.setCacheItem', []);
  }

  /**
   * stubGccCollection
   *
   * @memberof GccTest
   */
  stubGccCollection() {
    const {
      config: appConfig,
    } = this;

    const {
      NRDateFlags: collectionDateFlags,
    } = GccSheet.getInstance(appConfig).getAllNamedRangeValues();

    const volumes = [
      {
        label: 'Select compost amount',
        value: '',
      },
      {
        label: 'Empty',
        value: 0,
      },
      {
        label: 'Almost empty',
        value: 1,
      },
      {
        label: '1/4 full (5L)',
        value: '5',
      },
      {
        label: '1/2 full (10L)',
        value: '10',
      },
      {
        label: '3/4 full (15L)',
        value: '15',
      },
      {
        label: 'Full (20L)',
        value: '20',
      },
      {
        label: 'Overfull',
        value: '25',
      },
      {
        label: 'Not found',
        value: 'Not found',
      },
      {
        label: 'No access',
        value: 'No access',
      },
      {
        label: 'Dropped (first)',
        value: 'Dropped (first)',
      },
      {
        label: 'Collected (final)',
        value: 'Collected (final)',
      },
      {
        label: 'See group chat',
        value: 'See group chat',
      },
    ];

    this.stub('GccCollection.getVolumesAndDateFlags', [ collectionDateFlags, 1, 'bucket', volumes, 'html' ], [
      {
        optgroup: 'Amount',
        options: [
          {
            label: 'Select compost amount',
            value: '',
          },
          {
            label: 'Empty',
            value: 0,
          },
          {
            label: 'Almost empty',
            value: 1,
          },
          {
            label: '1/4 full (5L)',
            value: '5',
          },
          {
            label: '1/2 full (10L)',
            value: '10',
          },
          {
            label: '3/4 full (15L)',
            value: '15',
          },
          {
            label: 'Full (20L)',
            value: '20',
          },
          {
            label: 'Overfull',
            value: '25',
          },
          {
            label: 'Not found',
            value: 'Not found',
          },
          {
            label: 'No access',
            value: 'No access',
          },
          {
            label: 'Dropped (first)',
            value: 'Dropped (first)',
          },
          {
            label: 'Collected (final)',
            value: 'Collected (final)',
          },
          {
            label: 'See group chat',
            value: 'See group chat',
          },
        ],
      },
      {
        optgroup: 'Date flags',
        options: [
          'See notes',
          'Back to normal',
          'Drop',
          'First collection',
          'Skip',
          'Final',
          'COVID case',
          'Cancelled',
          'Pending',
        ],
      },
    ]);
  }

  /**
   * stubGccEnv
   *
   * @memberof GccTest
   */
  stubGccEnv() {
    const {
      config: appConfig,
    } = this;

    const { env } = appConfig;
    const { spreadsheetId } = env;

    this.stub('GccEnv.getInstance', [], {
      env: {
        scriptTypeAbbr: 'SA',
        deployment: 'TEST Build',
        deploymentAbbr: 'DEV',
        deploymenttId: 'AKfycbyXIo-wDHA4IIzSsMAmcT97XUiFPaMdsUaI2vPnLX1s',
        spreadsheetId,
      },
    });
  }

  /**
   * stubGccRun
   *
   * @memberof GccTest
   */
  stubGccRun() {
    this.stub('GccRunInstance.getCollectionRanges', [], [ [] ]);
  }

  /**
   * stubGccRunGroup
   *
   * @memberof GccTest
   */
  stubGccRunGroup() {
    // suburbs - town:
    // Fri Nov 04 2022 00:00:00 GMT+1300 (New Zealand Daylight Time),
    // Fri Nov 11 2022 00:00:00 GMT+1300 (New Zealand Daylight Time),
    // Fri Nov 18 2022 00:00:00 GMT+1300 (New Zealand Daylight Time),
    // Fri Nov 25 2022 00:00:00 GMT+1300 (New Zealand Daylight Time),
    // Fri Dec 02 2022 00:00:00 GMT+1300 (New Zealand Daylight Time),
    // Fri Dec 09 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)
    // Fri Dec 16 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)
    // Fri Jan 06 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)
    this.stub('GccRunGroupInstance.getDateHeaders', [], [
      'Wed Nov 23 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)',
      'Wed Nov 30 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)',
      'Wed Dec 07 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)',
      'Wed Dec 14 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)',
      'Wed Dec 21 2022 00:00:00 GMT+1300 (New Zealand Daylight Time)',
      'Wed Jan 06 2023 00:00:00 GMT+1300 (New Zealand Daylight Time)',
      'Wed Jan 13 2023 00:00:00 GMT+1300 (New Zealand Daylight Time)',
    ]);

    // suburbs - town:
    // [ 'Nov 4', 'Nov 11', 'Nov 18', 'Nov 25', 'Dec 2', 'Dec 9' ]
    this.stub('GccRunGroupInstance.getDateHeaders', [ true ], [
      'Nov 23',
      'Nov 30',
      'Dec 7',
      'Dec 14',
      'Dec 21',
      'Jan 6',
      'Jan 13',
    ]);

    this.stub('GccRunGroupInstance.getDateHeadersRange', [ 'a1Notation' ], 'A1:A1');
    this.stub('GccRunGroupInstance.getDateHeadersRange', [ 'range' ], [ [] ]);
  }

  /**
   * stubGccSheet
   *
   * @memberof GccTest
   */
  stubGccSheet() {
    this.stub('GccSheetInstance.getActiveSpreadsheet', [], null);

    // this.stub('GccSheet.getInstance', [], this.getSheetInstances()[0]);

    this.stub('GccSheetInstance.getLastRowIndex', [ 'Suburbs Run (WED)', 'End of collections. Do not edit this row.' ], 100);
    this.stub('GccSheetInstance.getLastRowIndex', [ 'Town Run (FRI)', 'End of collections. Do not edit this row.' ], 109);

    this.stub('GccSheetInstance.getNamedRange', [], [ [] ]);
    this.stub('GccSheetInstance.getNamedRangeBackgrounds', [ 'NRBrandColors' ], [
      [ '#b65529' ],
      [ '#53612b' ],
      [ '#719537' ],
      [ '#e1ac30' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
    ]);
    this.stub('GccSheetInstance.getNamedRangeBackgrounds', [ 'NRDateFlags' ], [
      [ '#ffff00' ],
      [ '#ffff00' ],
      [ '#ffff00' ],
      [ '#ffff00' ],
      [ '#cccccc' ],
      [ '#ffff00' ],
      [ '#ffff00' ],
      [ '#999999' ],
      [ '#999999' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
    ]);
    this.stub('GccSheetInstance.getNamedRangeBackgrounds', [ 'NRNonVolumes' ], [
      [ '#ffffff' ],
      [ '#ff0000' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ff0000' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
      [ '#ffffff' ],
    ]);
    this.stub('GccSheetInstance.getNamedRangeFontColors', [ 'NRBrandColors' ], [
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
    ]);
    this.stub('GccSheetInstance.getNamedRangeFontColors', [ 'NRDateFlags' ], [
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#f3f3f3' ],
      [ '#f3f3f3' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
    ]);
    this.stub('GccSheetInstance.getNamedRangeFontColors', [ 'NRNonVolumes' ], [
      [ '#000000' ],
      [ '#ffffff' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#ffffff' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
      [ '#000000' ],
    ]);
    this.stub('GccSheetInstance.getNamedRangeRunGroups', [], [
      {
        _columnHeaderIndices: {
          customer: 1,
          type: 2,
          quantity: 3,
          container: 4,
          address: 5,
          notes: 6,
        },
        _columnHeaderRowIndex: 10,
        dateFormat: 'MMM d',
        _footer: 'End of collections. Do not edit this row.',
        _postRunExtras: 'SWITCHED ON DROP-OFF (SUBURBS)',
        _preRunExtras: 'SWITCHED ON PICK-UP (SUBURBS)',
        _runNames: [
          'MT VIC RUN',
          'MT COOK RUN',
          'BERHAMPORE/NEWTOWN RUN',
          'NEWTOWN CENTRAL RUN',
        ],
        _sheetName: 'Suburbs Run (WED)',
        _dateHeaderRangeA1Notation: 'G10:M10',
        _dateHeaders: [
          '2022-11-01T11:00:00.000Z',
          '2022-11-08T11:00:00.000Z',
          '2022-11-15T11:00:00.000Z',
          '2022-11-22T11:00:00.000Z',
          '2022-11-29T11:00:00.000Z',
          '2022-12-06T11:00:00.000Z',
          '2022-12-13T11:00:00.000Z',
        ],
        _dateHeadersFormatted: [
          'Nov 2',
          'Nov 9',
          'Nov 16',
          'Nov 23',
          'Nov 30',
          'Dec 7',
          'Dec 14',
        ],
        _id: 'suburbs-run-wed',
      },
      {
        _columnHeaderIndices: {
          customer: 1,
          type: 2,
          quantity: 3,
          container: 4,
          address: 5,
          notes: 6,
        },
        _columnHeaderRowIndex: 10,
        dateFormat: 'MMM d',
        _footer: 'End of collections. Do not edit this row.',
        _postRunExtras: 'SWITCHED ON DROP-OFF (TOWN)',
        _preRunExtras: 'SWITCHED ON PICK-UP (TOWN)',
        _runNames: [ 'NORTH A RUN', 'NORTH B RUN', 'SOUTH A RUN', 'SOUTH B RUN' ],
        _sheetName: 'Town Run (FRI)',
        _dateHeaderRangeA1Notation: 'H10:M10',
        _dateHeaders: [
          '2022-11-03T11:00:00.000Z',
          '2022-11-10T11:00:00.000Z',
          '2022-11-17T11:00:00.000Z',
          '2022-11-24T11:00:00.000Z',
          '2022-12-01T11:00:00.000Z',
          '2022-12-08T11:00:00.000Z',
        ],
        _dateHeadersFormatted: [
          'Nov 4',
          'Nov 11',
          'Nov 18',
          'Nov 25',
          'Dec 2',
          'Dec 9',
        ],
        _id: 'town-run-fri',
      },
    ]);
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup1PreRunHeader' ], 'SWITCHED ON PICK-UP (SUBURBS)');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup1PostRunHeader' ], 'SWITCHED ON DROP-OFF (SUBURBS)');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup1RunHeader1' ], 'MT VIC RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup1RunHeader2' ], 'MT COOK RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup1RunHeader3' ], 'BERHAMPORE/NEWTOWN RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup1RunHeader4' ], 'NEWTOWN CENTRAL RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup1Footer' ], 'End of collections. Do not edit this row.');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup2PreRunHeader' ], 'SWITCHED ON PICK-UP (TOWN)');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup2PostRunHeader' ], 'SWITCHED ON DROP-OFF (TOWN)');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup2RunHeader1' ], 'NORTH A RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup2RunHeader2' ], 'NORTH B RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup2RunHeader3' ], 'SOUTH A RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup2RunHeader4' ], 'SOUTH B RUN');
    this.stub('GccSheetInstance.getNamedRangeValue', [ 'NRRunGroup2Footer' ], 'End of collections. Do not edit this row.');
    this.stub('GccSheetInstance.getNamedRangeValues', [ 'NRBrandColors' ], [
      'brown',
      'darkgreen',
      'green',
      'yellow',
    ]);
    this.stub('GccSheetInstance.getNamedRangeValues', [ 'NRContainerTypes' ], [
      'Bucket',
      'Tub',
      'Cookietime',
      'Wheeliebin',
    ]);
    this.stub('GccSheetInstance.getNamedRangeValues', [ 'NRContainerCapacities' ], [
      20,
      70,
      2,
      140,
    ]);
    this.stub('GccSheetInstance.getNamedRangeValues', [ 'NRDateFlags' ], [
      'See notes',
      'Back to normal',
      'Drop',
      'First collection',
      'Skip',
      'Final',
      'COVID case',
      'Cancelled',
      'Pending',
    ]);
    this.stub('GccSheetInstance.getNamedRangeValues', [ 'NRNonVolumes' ], [
      'Not found',
      'No access',
      'Dropped (first)',
      'Collected (final)',
      'See group chat',
    ]);
    this.stub('GccSheet.getRowIndex', [ 'Suburbs Run (WED)', 'SWITCHED ON PICK-UP (SUBURBS)' ], 12);
    this.stub('GccSheet.getRowIndex', [ 'Suburbs Run (WED)', 'SWITCHED ON DROP-OFF (SUBURBS)' ], 16);
    this.stub('GccSheet.getRowIndex', [ 'Suburbs Run (WED)', 'MT VIC RUN' ], 23);
    this.stub('GccSheet.getRowIndex', [ 'Suburbs Run (WED)', 'MT COOK RUN' ], 43);
    this.stub('GccSheet.getRowIndex', [ 'Suburbs Run (WED)', 'BERHAMPORE/NEWTOWN RUN' ], 61);
    this.stub('GccSheet.getRowIndex', [ 'Suburbs Run (WED)', 'NEWTOWN CENTRAL RUN' ], 80);
    this.stub('GccSheet.getRowIndex', [ 'Town Run (FRI)', 'SWITCHED ON PICK-UP (TOWN)' ], 11);
    this.stub('GccSheet.getRowIndex', [ 'Town Run (FRI)', 'SWITCHED ON DROP-OFF (TOWN)' ], 18);
    this.stub('GccSheet.getRowIndex', [ 'Town Run (FRI)', 'NORTH A RUN' ], 23);
    this.stub('GccSheet.getRowIndex', [ 'Town Run (FRI)', 'NORTH B RUN' ], 52);
    this.stub('GccSheet.getRowIndex', [ 'Town Run (FRI)', 'SOUTH A RUN' ], 68);
    this.stub('GccSheet.getRowIndex', [ 'Town Run (FRI)', 'SOUTH B RUN' ], 90);
    this.stub('GccSheet.setRangeValidationCriteria', []);
    this.stub('GccSheet.validateRangeValues', [], {
      valid: [
        [],
      ],
      invalid: [],
    });
  }

  /* Static methods */
}
