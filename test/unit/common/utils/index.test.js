require('mocha-sinon'); // auto-calls this.sinon.restore() afterEach test block

const { syncOpenApi2and3Docs, logError, deepClone } = require('../../../../src/common/utils');

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

    describe('deepClone(obj)', function () {
        describe('valid args', function () {
            describe('array containing nested object', function () {
                it('returns the original object and \
                    allows the clone to be modified without affecting the original', function () {
                    const original = [
                        {
                            1: { 2: 'original value' },
                        },
                    ];
                    const clone = deepClone(original);

                    expect(clone).to.deep.equal(original);

                    // modify clone
                    clone[0]['1']['2'] = 'new value';

                    expect(clone).to.deep.equal([
                        {
                            1: { 2: 'new value' },
                        },
                    ]);
                    expect(original).to.deep.equal([
                        {
                            1: { 2: 'original value' },
                        },
                    ]);
                });
            });
        });
        describe('invalid args', function () {
            describe('missing', function () {
                it('throws a TypeError', function () {
                    const func = () => deepClone();
                    expect(func).to.throw(TypeError, `Could not clone obj 'undefined'`);
                });
            });
        });
    });
});
