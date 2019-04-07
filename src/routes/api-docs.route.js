const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const path = require('path');

const router = express.Router();

const pathToDocsDir = path.join(__dirname, '../../public/docs');

const swaggerDefinition = YAML.load(path.join(pathToDocsDir, 'swagger.yml'));

const swaggerJsDocOptions = {
    definition: {
        ...swaggerDefinition,
    },
    apis: ['./**/*.route.js'], // Path to the API docs
};

const swaggerDoc = swaggerJSDoc(swaggerJsDocOptions);

router.get('/', (req, res) => {
    res.sendFile(path.join(pathToDocsDir, 'redoc.html'));
});

router.get('/swagger/raw', (req, res) => {
    res.json(swaggerDoc);
});

const swaggerUiOptions = {
    // explorer: true,
};
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc, swaggerUiOptions));

module.exports = router;
