const Converter = require('api-spec-converter');
const path = require('path');
const fs = require('fs-extra');

const { pathToDocsDir } = require('../config');

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

function logError(err) {
    // console.log({
    //     error: {
    //         name: err.name,
    //         message: err.message,
    //         // data: err.data,
    //     },
    // });
}

module.exports = {
    syncOpenApi2and3Docs,
    logError,
};
