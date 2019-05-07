const fs = require('fs-extra');
const yaml = require('js-yaml');
const SwaggerParser = require('swagger-parser');

const { pathToApiSpec } = require('../config');
const { expect } = require('../setup/chai.setup');

const openApiSpec = yaml.safeLoad(fs.readFileSync(pathToApiSpec));

SwaggerParser.validate(openApiSpec); // TODO handle this potential promise rejection

const openApiSchemas = openApiSpec.components.schemas;

async function validateOAS3(openApiSpec) {
    expect(openApiSpec.openapi).to.equal('3.0.0');
    const validatedSpec = await SwaggerParser.validate(openApiSpec);
    expect(validatedSpec.openapi).to.equal('3.0.0');
}

async function validateOAS2(openApiSpec) {
    expect(openApiSpec.swagger).to.equal('2.0');
    const validatedSpec = await SwaggerParser.validate(openApiSpec);
    expect(validatedSpec.swagger).to.equal('2.0');
}

module.exports = {
    openApiSchemas,
    validateOAS3,
    validateOAS2,
}