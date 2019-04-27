require('mocha-sinon'); // auto-calls this.sinon.restore() afterEach test block
const fs = require('fs-extra');
const path = require('path');

const { syncOpenApi2and3Docs, logError } = require('../../../src/utils');

const { expect } = require('../../setup/chai.setup');

describe('utils/index.js', function () {
    const pathToDocsDir = path.join(__dirname, '../../../public/docs');

    describe('syncOpenApi2and3Docs()', function () {

        before('check that we have an OAS3 (OpenAPI Spec v3)', function() {
            const entries = fs.readdirSync(pathToDocsDir)
            expect(entries).to.include('openApi3.yml');
        });

        before('delete our OAS2', function() {
            fs.removeSync(path.join(pathToDocsDir, 'openApi2.json'))
            const entries = fs.readdirSync(pathToDocsDir)
            expect(entries).to.not.include('openApi2.json');
        });

        it('synchronises our OAS2 with our OAS3', async function () {
            await syncOpenApi2and3Docs();
            const entries = fs.readdirSync(pathToDocsDir)
            expect(entries).to.include('openApi2.json');
            const openApi2File = fs.readJSONSync(path.join(pathToDocsDir, 'openApi2.json'));
            expect(openApi2File.swagger).to.equal('2.0');
        });
    });

    describe('logError(err)', function () {
        it('logs the correct error info to console', async function () {
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
