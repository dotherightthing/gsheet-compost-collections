/**
 * @file ./scripts/timestamp.js
 * @summary Timestamp npm runs.
 */

const d = new Date();
const t = d.toLocaleTimeString();

// npm run timestamp --prefix='Function 1'
// npm run timestamp --prefix='Function 2'
// const prefix = process.env.npm_config_prefix;

// console.log(process.env);

console.log(t); // eslint-disable-line no-console
