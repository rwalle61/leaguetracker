const util = require('util');

const { logLevel } = require('../config');

function logError(err) {
    if (logLevel === 'debug') {
        console.log({
            error: {
                name: err.name,
                message: err.message,
                // data: err.data,
            },
        });
    }
}

/**
 * Don't use for:
 * - Date objects,
 * - objects with properties that are functions,
 * - see https://stackoverflow.com/questions/7914968/cloning-whats-the-fastest-alternative-to-json-parsejson-stringifyx
 */
function deepClone(obj) {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (error) {
        throw new TypeError(`Could not clone obj '${util.inspect(obj)}'`);
    }
}

module.exports = {
    logError,
    deepClone,
};
