
const path = require('path');

const env = process.env.NODE_ENV || 'development';

function determineLogLevel(env) {
    if (env === 'production' || env === 'staging') {
        return 'info';
    }
    return 'debug';
}

module.exports = {
    ...require(`./${env}`), // eslint-disable-line import/no-dynamic-require
    pathToDocsDir: path.join(__dirname, '../../public/docs'),
    logLevel: determineLogLevel(env),
};
