const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs-extra');

const router = express.Router();

const pathToDocsDir = path.join(__dirname, '../../public/docs');

const openApiDocs = {
    v2: fs.readJsonSync(path.join(pathToDocsDir, 'openApi2.json')),
    v3: YAML.load(path.join(pathToDocsDir, 'openApi3.yml')),
};

router.get('/', (req, res) => {
    res.sendFile(path.join(pathToDocsDir, 'redoc.html'));
});

router.get('/openApi/raw', (req, res) => {
    res.json(openApiDocs.v3);
});

router.get('/openApi/raw/3', (req, res) => {
    res.json(openApiDocs.v3);
});

router.get('/openApi/raw/2', (req, res) => {
    res.json(openApiDocs.v2);
});

const swaggerUiOptions = {
    // explorer: true,
};
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocs.v3, swaggerUiOptions));

module.exports = router;
