const Converter = require('api-spec-converter');
const path = require('path');
const fs = require('fs-extra');

const { pathToDocsDir } = require('../config');

function typeOf(variable) {
    if (Array.isArray(variable)) return 'array';
    return typeof variable;
}

async function syncOpenApi2and3Docs() {
    // write an OpenApi 2 Doc from our existing OpenApi 3 Doc
    const convertedJson = await Converter.convert({
        from: 'openapi_3',
        to: 'swagger_2',
        source: path.join(pathToDocsDir, 'openApi3.yml'),
    })

    const options = { order: 'openapi' };
    await fs.writeFile(
        path.join(pathToDocsDir, 'openApi2.json'),
        convertedJson.stringify(options),
        { spaces: 2 },
    );
}

module.exports = {
    typeOf,
    syncOpenApi2and3Docs,
};
