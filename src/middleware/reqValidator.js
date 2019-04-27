const { OpenApiValidator } = require('express-openapi-validate');
const YAML = require('yamljs');
const path = require('path');

const { pathToDocsDir } = require('../config');

const openApiDocument = YAML.load(path.join(pathToDocsDir, 'openApi3.yml'));

const validator = new OpenApiValidator(openApiDocument);

function validateReq(req, res, next) {
    const pathInOpenapiFormat = req.baseUrl + getRouteInOpenapiFormat(req);
    const methodInOpenapiFormat = req.method.toLowerCase();
    const validationFunction = validator.validate(methodInOpenapiFormat, pathInOpenapiFormat);
    validationFunction(req, res, next);
}

function getRouteInOpenapiFormat(req) {
    return req.route.path
        .replace(/:(id)/, '{$1}')
        .replace(/\/*$/, '');
}

module.exports = {
    validateReq,
};