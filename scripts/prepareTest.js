/**
 * @file ./scripts/prepareTest.js
 * @summary Add or remove the test dependency
 */

const fs = require('fs');
const appsscriptJson = require('../src/appsscript.json');
const packageJson = require('../package.json');

/**
 * @function librariesToArray
 * @summary Converts the libraries property into an array
 * @param {*} libraries Libraries property
 * @returns {Array} libArray
 */
const librariesToArray = (libraries) => {
  let libArray = [];

  if (Array.isArray(libraries)) {
    // if two or more libraries
    libArray = libraries;
  } else if (Object.prototype.toString.call(libraries) === '[object Object]') {
    // if one library
    libArray = [ libraries ];
  }

  return libArray;
};

/**
 * @function addLibrary
 * @summary Add a library to the libraries array
 * @param {Array} libArray Libraries array
 * @param {object} testDependency Test dependency
 * @returns {Array} libArray
 */
const addLibrary = (libArray, testDependency) => {
  const { libraryId: testDependencyId } = testDependency;
  let libraryExists = false;

  libArray.forEach((library) => {
    const { libraryId } = library;

    if (libraryId === testDependencyId) {
      libraryExists = true;
    }
  });

  if (!libraryExists) {
    libArray.push(testDependency);
  }

  return libArray;
};

/**
 * @function removeLibrary
 * @summary Remove a library from the libraries array
 * @param {Array} libArray Libraries array
 * @param {object} testDependency Test dependency
 * @returns {Array} libArray
 */
const removeLibrary = (libArray, testDependency) => {
  const { libraryId: testDependencyId } = testDependency;

  libArray.forEach((library, i) => {
    const { libraryId } = library;

    if (libraryId === testDependencyId) {
      delete libArray[i];
    }
  });

  // prevent resulting array of [ null ]
  const cleanLibArray = libArray.filter((library) => (library !== null));

  return cleanLibArray;
};

/**
 * @function updateFile
 * @summary Update appsscript.json
 * @param {object} json JSON
 */
const updateFile = (json) => {
  const newJson = JSON.stringify(json);

  fs.writeFile(`${process.cwd()}/src/appsscript.json`, newJson, 'utf-8', (err2) => {
    if (err2) {
      throw err2;
    }
  });
};

// -----

// npm run prepareTest --test=false
// npm run prepareTest --test=true
const test = process.env.npm_config_test;
const { dependencies } = appsscriptJson;
const { testDependency } = packageJson.config;
let librariesArray = [];

if (Object.prototype.hasOwnProperty.call(dependencies, 'libraries')) {
  const { libraries } = dependencies;

  librariesArray = librariesToArray(libraries);

  if (test === 'true') {
    librariesArray = addLibrary(librariesArray, testDependency);
  } else {
    librariesArray = removeLibrary(librariesArray, testDependency);
  }
} else if (test === 'true') {
  librariesArray = addLibrary(librariesArray, testDependency);
}

if (librariesArray.length) {
  appsscriptJson.dependencies.libraries = librariesArray;
} else {
  delete appsscriptJson.dependencies.libraries;
}

updateFile(appsscriptJson);
