/**
 * @file ./scripts/openIntegrationTests.js
 * @summary Open the test URL
 */

const open = require('open');
const packageJson = require('../package.json');

// -----

// npm run openIntegrationTests
const { headDeploymentId } = packageJson.config;

open(`https://script.google.com/macros/s/${headDeploymentId}/dev/test`);
