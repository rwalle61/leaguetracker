const { syncOpenApi2and3Docs, getOAS2, getOAS3 } = require('../../../../src/common/utils/openapi');

const { expect } = require('../../../setup/chai.setup');
const { validateOAS2, deleteOAS2, readDocsDir, getOAS2File, getOAS3File } = require('../../../test-helpers/openapi.helper');

describe('utils/openapi.js', function () {
    describe('syncOpenApi2and3Docs()', function () {

        before('check that we have an OAS3 (OpenAPI Spec v3)', function() {
            expect(readDocsDir()).to.include('openApi3.yml');
        });

        before('delete our OAS2', function() {
            deleteOAS2();
            expect(readDocsDir()).to.not.include('openApi2.json');
        });

        it('synchronises our OAS2 with our OAS3', async function () {
            await syncOpenApi2and3Docs();
            expect(readDocsDir()).to.include('openApi2.json');
            await validateOAS2(getOAS2File());
            // should really test with a concrete example
        });
    });

    describe('getOAS2()', function () {
        it('returns our OAS2', function () {
            expect(getOAS2()).to.deep.equal(getOAS2File());
        });
    });

    describe('getOAS3()', function () {
        it('returns our OAS3', function () {
            expect(getOAS3()).to.deep.equal(getOAS3File());
        });
    });
});
