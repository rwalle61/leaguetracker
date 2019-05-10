const app = require('../../setup/app.setup');
const { expect } = require('../../setup/chai.setup');
const { validateOAS3, validateOAS2, deleteOAS2, readDocsDir } = require('../../test-helpers/openapi.helper');

describe('/api/v1', function () {
    describe('/api-docs', function () {
        describe('GET', function () {
            it('returns 200 and an OpenAPI 3 doc served by reDoc', async function () {
                const res = await app().get('/api/v1/api-docs');
                expect(res.status).to.equal(200);
                expect(res.text).to.include('<title>LeagueTracker Docs</title>');
                expect(res.text).to.include('<redoc');
                expect(res.text).to.include('</redoc>');
                // Note: the DOM may still error. See https://github.com/rwalle61/leaguetracker/issues/83
            });
        });
        describe('/swagger', function () {
            describe('GET', function () {
                it('returns 200 and an OpenAPI 3 doc served by SwaggerUI', async function () {
                    const res = await app().get('/api/v1/api-docs/swagger');
                    expect(res.status).to.equal(200);
                    expect(res.text).to.include('<title>Swagger UI</title>');
                });
            });
        });
        describe('/openApi', function () {
            describe('/raw', function () {
                describe('GET', function () {
                    it('returns 200 and a valid OpenAPI 3 doc in JSON form', async function () {
                        const res = await app().get('/api/v1/api-docs/openApi/raw');
                        expect(res.status).to.equal(200);
                        await validateOAS3(res.body);
                    });
                });
                describe('/3', function () {
                    describe('GET', function () {
                        it('returns 200 and a valid OpenAPI 3 doc in JSON form', async function () {
                            const res = await app().get('/api/v1/api-docs/openApi/raw/3');
                            expect(res.status).to.equal(200);
                            await validateOAS3(res.body);
                        });
                    });
                });
                describe('/2', function () {
                    describe('GET', function () {
                        before(`even if we're missing our OAS2`, function() {
                            deleteOAS2();
                            const entries = readDocsDir();
                            expect(entries).to.not.include('openApi2.json');
                        });
                        it('returns 200 and a valid OpenAPI 2 doc in JSON form', async function () {
                            const res = await app().get('/api/v1/api-docs/openApi/raw/2');
                            expect(res.status).to.equal(200);
                            await validateOAS2(res.body);
                        });
                    });
                });
            });
        });
    });
});