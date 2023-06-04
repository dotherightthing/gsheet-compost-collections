/**
 * @file ./scripts/copyDependencies.js
 * @summary Copy 3rd party dependencies into project src folder, so they can be uploaded to the GAS server.
 */
/*
{
  "config": {
    "dependencies": {
      "node_modules/dtrt-type-validate": [
        "index.mjs"
      ]
    }
  },
  "dependencies": {
    "dtrt-type-validate": "^1.0.0"
  }
}
*/
const fs = require('fs');
const packageJson = require('../package.json');

const files = [];
const dest = '/src/Dependencies/';
const toCopy = packageJson.config.dependencies;

if (typeof toCopy === 'object') {
  const deps = Object.keys(toCopy);

  deps.forEach((dep) => {
    const paths = toCopy[dep];

    paths.forEach((path) => {
      files.push(`./${dep}/${path}`);
    });
  });
}

files.forEach((file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    let fileName = file.substring(file.lastIndexOf('/') + 1);

    fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1); // Capitalise
    fileName = fileName.replace('.mjs', '.js');

    let fileValue = `/* Copied by copyDependencies.js */\n/* eslint-disable */\n${data}\n/* eslint-enable */\n`;

    // GAS doesn't support modules
    // https://stackoverflow.com/a/52198260
    // https://stackoverflow.com/a/75591163
    fileValue = fileValue
      .replace(/^export const/gm, 'const')
      .replace(/import {[^}]*}.*(?='[a-z-]+').*/g, '');

    try {
      fs.mkdirSync(`${process.cwd()}${dest}`, {
        recursive: true,
      });
    } catch (err3) {
      console.log('Cannot create folder ', err3); // eslint-disable-line no-console
    }

    fs.writeFile(`${process.cwd()}${dest}${fileName}`, fileValue, 'utf-8', (err2) => {
      if (err2) {
        throw err2;
      }
    });
  });
});

console.log(`${files.length} ${(files.length > 1) ? 'dependencies' : 'dependency'} copied to ${dest}`); // eslint-disable-line no-console
