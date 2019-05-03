const toJsonSchema = require('openapi-schema-to-json-schema');
const ZSchema = require('z-schema');
const util = require('util');

const { openApiSchemas } = require('../test-helpers/openapi.helper');
const { expect } = require('./chai.setup');

const validator = new ZSchema({});

const jsonSchemas = convertOpenApiSchemasToJsonSchemas(openApiSchemas);

function convertOpenApiSchemasToJsonSchemas(openApiSchemas) {
    const clonedOpenApiSchemas = { ...openApiSchemas };
    const jsonSchemas = {};
    for (const [schemaName, schema] of Object.entries(clonedOpenApiSchemas)) {
        const modifiedSchema = toJsonSchema(schema);
        fixSchemaRef(modifiedSchema, schemaName);
        validator.validateSchema(modifiedSchema);
        jsonSchemas[schemaName] = modifiedSchema;
    }
    return jsonSchemas;
}

function fixSchemaRef(schema, schemaName) {
    schema.id = schemaName;
    findRefAndShorten(schema);
}

function findRefAndShorten(obj) {
    for (const [name, value] of Object.entries(obj)) {
        if (name === '$ref') {
            obj[name] = shortenRef(obj[name]);
        } else if (!isEmptyObj(value) && !isString(value)) {
            findRefAndShorten(value);
        }
    }
}

function isEmptyObj(obj) {
    return obj.constructor === Object && Object.keys(obj).length === 0;
}

function isString(obj) {
    return (typeof obj === 'string' || obj instanceof String);
}

function shortenRef(ref) {
    return ref.split('#/components/schemas/')[1];
}

function fitsSchema(obj, schema) {
    try {
        expect(validator.validate(obj, schema)).to.be.true;
        return true;
    } catch (error) {
        const details = validator.getLastError().details[0];
        const errMsg = extractProperties(details, ['message', 'schemaId']);
        error.message += `\n      ErrorInfo: ${util.inspect(errMsg)}`;
        throw(error);
    }
}

function extractProperties(obj, keys) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (keys.includes(key)) {
            newObj[key] = value;
        }
    }
    return newObj
}

module.exports = {
    jsonSchemas,
    fitsSchema,
}