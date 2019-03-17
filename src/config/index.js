
const env = process.env.NODE_ENV || 'development';

module.exports = require(`./${env}`); // eslint-disable-line import/no-dynamic-require
