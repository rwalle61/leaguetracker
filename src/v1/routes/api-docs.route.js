const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const { logError } = require('../../common/utils');
const { getOAS2, getOAS3, syncOpenApi2and3Docs } = require('../../common/utils/openapi');
const { pathToDocsDir } = require('../../common/config');

const router = express.Router();

const openApiDocs = loadOpenApiDocs();

function loadOpenApiDocs() {
    let openApiDocs = {};
    try {
        openApiDocs.v2 = getOAS2();
    } catch (error) {
        logError(error);
    }
    try {
        openApiDocs.v3 = getOAS3();
    } catch (error) {
        logError(error);
    }
    return openApiDocs;
}

router.get('/', (req, res) => {
    res.sendFile(path.join(pathToDocsDir, 'index.html'));
});

router.get('/openApi/raw', (req, res) => {
    res.json(openApiDocs.v3);
});

router.get('/openApi/raw/3', (req, res) => {
    res.json(openApiDocs.v3);
});

router.get('/openApi/raw/2', async (req, res, next) => {
    try {
        openApiDocs.v2 = getOAS2();
    } catch (error) {
        try {
            await syncOpenApi2and3Docs();
            openApiDocs.v2 = getOAS2();
        } catch (error) {
            error.statusCode = 404;
            next(error);
        }
    }
    res.json(openApiDocs.v2);
});

const swaggerUiOptions = {
    // explorer: true,
};
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocs.v3, swaggerUiOptions));

module.exports = router;
