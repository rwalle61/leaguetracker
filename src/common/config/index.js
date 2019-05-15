
const path = require('path');

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

/* istanbul ignore next */
function determineLogLevel(env) {
    if (env === 'production' || env === 'staging') {
        return 'info';
    }
    return 'debug';
}

module.exports = {
    ...require(`./${env}`), // eslint-disable-line import/no-dynamic-require
    pathToDocsDir: path.join(__dirname, '../../../docs'),
    logLevel: determineLogLevel(env),
    env,
};
