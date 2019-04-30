const fs = require('fs-extra');
const yaml = require('js-yaml');

const { pathToApiSpec } = require('../config');

// TODO make this check that the schema is valid
const openApiSpec = yaml.safeLoad(fs.readFileSync(pathToApiSpec));
const openApiSchemas = openApiSpec.components.schemas;

module.exports = {
    openApiSchemas,
}