require('mocha-sinon'); // auto-calls this.sinon.restore() afterEach test block

const { syncOpenApi2and3Docs, logError } = require('../../../../src/common/utils');

const { expect } = require('../../../setup/chai.setup');
const { validateOAS2, deleteOAS2, readDocsDir, getOAS2File } = require('../../../test-helpers/openapi.helper');

describe('utils/index.test.js', function () {
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
        });
    });

    describe('logError(err)', function () {
        it('logs the correct error info to console', function () {
            const spy = this.sinon.spy(console, 'log');
            logError(new TypeError('errMsg'));

            if (process.env.NODE_ENV === 'development') {
                expect(spy).have.been.calledWith({
                    error: {
                        name: 'TypeError',
                        message: 'errMsg',
                    },
                });
            }
        });
    });
});
