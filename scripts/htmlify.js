/**
 * @file ./scripts/htmlify.js
 * @summary Copy 1st and 3rd party dependencies into project, transform into include-ready HTML files.
 * @todo Making the directory readonly would prevent accidental editing but could make it difficult to update files
 */
/*
{
  "config": {
    "htmlify": {
      "pubsub.js": ["pubsub.js"]
    }
  },
  "dependencies": {
    "pubsub.js": "^1.5.2"
  }
}
*/
const fs = require('fs');
const packageJson = require('../package.json');

const files = [];
const dest = '/src/Htmlified/';
const toCopy = packageJson.config.htmlify;

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
  const id = file.toLowerCase().replace('./', '').replaceAll(/([ /.,_'"!()])+/g, '-');

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const fileExtension = file.substring(file.lastIndexOf('.') + 1);
    let fileName = file.substring(file.lastIndexOf('/') + 1);

    fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1); // Capitalise
    fileName = fileName.replace('.mjs', '.js');

    let linter;
    let tag;

    if (fileExtension === 'js') {
      linter = 'eslint';
      tag = 'script';
    } else if (fileExtension === 'mjs') {
      linter = 'eslint';
      tag = 'script';
    } else if (fileExtension === 'css') {
      linter = 'stylelint';
      tag = 'style';
    }

    let fileValue = `<${tag} id="${id}">\n/* ${linter}-disable */\n${data}\n/* ${linter}-enable */\n</${tag}>`;

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

    fs.writeFile(`${process.cwd()}${dest}${fileName}.html`, fileValue, 'utf-8', (err2) => {
      if (err2) {
        throw err2;
      }
    });
  });
});

console.log(`${files.length} ${(files.length > 1) ? 'dependencies' : 'dependency'} copied to ${dest}`); // eslint-disable-line no-console
