
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
    ...require(`./${env}`), // eslint-disable-line import/no-dynamic-require
    pathToDocsDir: path.join(__dirname, '../../public/docs'),
};
