const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs-extra');

const { syncOpenApi2and3Docs } = require('../utils');

const router = express.Router();

const pathToDocsDir = path.join(__dirname, '../../public/docs');

let openApiDocs = {};
try {
    openApiDocs.v2 = fs.readJsonSync(path.join(pathToDocsDir, 'openApi2.json'));
} catch (error) {
    openApiDocs.v2 = { error: 'unavailable' };
}
try {
    openApiDocs.v3 = YAML.load(path.join(pathToDocsDir, 'openApi3.yml'));
} catch (error) {
    openApiDocs.v3 = { error: 'unavailable' };
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
    .put(async (req, res) => {
        try {
            await syncOpenApi2and3Docs();
            openApiDocs.v2 = fs.readJsonSync(path.join(pathToDocsDir, 'openApi2.json'));
            res.status(200).json(openApiDocs.v2);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

const swaggerUiOptions = {
    // explorer: true,
};
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocs.v3, swaggerUiOptions));

module.exports = router;
