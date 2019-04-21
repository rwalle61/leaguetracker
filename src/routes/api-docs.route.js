const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs-extra');

const { syncOpenApi2and3Docs, logError } = require('../utils');
const { pathToDocsDir } = require('../config');

const router = express.Router();

const openApiDocs = loadOpenApiDocs();

function loadOpenApiDocs() {
    let openApiDocs = {};
    try {
        openApiDocs.v2 = fs.readJsonSync(path.join(pathToDocsDir, 'openApi2.json'));
    } catch (error) {
        logError(error);
        openApiDocs.v2 = { error: 'unavailable' };
    }
    try {
        openApiDocs.v3 = YAML.load(path.join(pathToDocsDir, 'openApi3.yml'));
    } catch (error) {
        logError(error);
        openApiDocs.v3 = { error: 'unavailable' };
    }
    return openApiDocs;
}

router.get('/', (req, res) => {
    res.sendFile(path.join(pathToDocsDir, 'redoc.html'));
});

router.get('/openApi/raw', (req, res) => {
    res.json(openApiDocs.v3);
});

router.get('/openApi/raw/3', (req, res) => {
    res.json(openApiDocs.v3);
});

router.route('/openApi/raw/2')
    .get((req, res) => {
        res.json(openApiDocs.v2);
    })
    .put(async (req, res, next) => {
        try {
            await syncOpenApi2and3Docs();
            openApiDocs.v2 = fs.readJsonSync(path.join(pathToDocsDir, 'openApi2.json'));
            res.status(200).json(openApiDocs.v2);
        } catch (error) {
            next(error);
        }
    });

const swaggerUiOptions = {
    // explorer: true,
};
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocs.v3, swaggerUiOptions));

module.exports = router;
