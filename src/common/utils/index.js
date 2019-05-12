const Converter = require('api-spec-converter');
const path = require('path');
const fs = require('fs-extra');
const YAML = require('yamljs');
const util = require('util');

const { pathToDocsDir, logLevel } = require('../config');

/**
 * Writes/updates our openApi2.json from our existing OpenApi3 spec
 */
async function syncOpenApi2and3Docs() {
    const convertedJson = await Converter.convert({
        from: 'openapi_3',
        to: 'swagger_2',
        source: path.join(pathToDocsDir, 'openApi3.yml'),
    });

    const options = { order: 'openapi' };
    await fs.writeFile(
        path.join(pathToDocsDir, 'openApi2.json'),
        convertedJson.stringify(options),
        { spaces: 2 },
    );
}

function getOAS2() {
    return fs.readJsonSync(path.join(pathToDocsDir, 'openApi2.json'));
}

function getOAS3() {
    return YAML.load(path.join(pathToDocsDir, 'openApi3.yml'));
}

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
    syncOpenApi2and3Docs,
    logError,
    getOAS2,
    getOAS3,
    deepClone,
};
