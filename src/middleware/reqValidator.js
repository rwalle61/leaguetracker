const { OpenApiValidator } = require('express-openapi-validate');
const YAML = require('yamljs');
const path = require('path');

const { pathToDocsDir } = require('../config');

const openApiDocument = YAML.load(path.join(pathToDocsDir, 'openApi3.yml'));

const validator = new OpenApiValidator(openApiDocument);

function validateReq(...args) {
    return validator.validate(...args)
}

module.exports = {
    validateReq,
};