const fs = require('fs-extra');
const path = require('path');

const { syncOpenApi2and3Docs } = require('../../../src/utils');

const { expect } = require('../../setup/chai.setup');

describe('index.test.js', function () {
    const pathToDocsDir = path.join(__dirname, '../../../public/docs');

    describe('syncOpenApi2and3Docs()', function () {

        before('check that we have an OAS3 (OpenAPI Spec v3)', function() {
            const entries = fs.readdirSync(pathToDocsDir)
            expect(entries).to.include('openApi3.yml');
        })

        before('delete our OAS2', function() {
            fs.removeSync(path.join(pathToDocsDir, 'openApi2.json'))
            const entries = fs.readdirSync(pathToDocsDir)
            expect(entries).to.not.include('openApi2.json');
        })

        it('synchronises our OAS2 with our OAS3', async function () {
            await syncOpenApi2and3Docs();
            const entries = fs.readdirSync(pathToDocsDir)
            expect(entries).to.include('openApi2.json');
            const openApi2File = fs.readJSONSync(path.join(pathToDocsDir, 'openApi2.json'));
            expect(openApi2File.swagger).to.equal('2.0');
        });
    });
});
