const { app, expect } = require('../setup');

describe('/api-docs', function () {
    describe('GET', function () {
        it('returns 200 and an OpenAPI 3 doc served by reDoc', async function () {
            const res = await app().get('/api-docs');
            expect(res.status).to.equal(200);
            expect(res.text).to.include('<title>LeagueTracker Docs</title>');
            expect(res.text).to.include('<redoc');
            expect(res.text).to.include('</redoc>');
        });
    });
    describe('/swagger', function () {
        describe('GET', function () {
            it('returns 200 and an OpenAPI 3 doc served by SwaggerUI', async function () {
                const res = await app().get('/api-docs/swagger');
                expect(res.status).to.equal(200);
                expect(res.text).to.include('<title>Swagger UI</title>');
            });
        });
    });
    describe('/openApi', function () {
        describe('/raw', function () {
            describe('GET', function () {
                it('returns 200 and an OpenAPI 3 doc in JSON form', async function () {
                    const res = await app().get('/api-docs/openApi/raw');
                    expect(res.status).to.equal(200);
                    expect(res.body.openapi).to.equal('3.0.0');
                });
            });
            describe('/3', function () {
                describe('GET', function () {
                    it('returns 200 and an OpenAPI 3 doc in JSON form', async function () {
                        const res = await app().get('/api-docs/openApi/raw/3');
                        expect(res.status).to.equal(200);
                        expect(res.body.openapi).to.equal('3.0.0');
                    });
                });
            });
            describe('/2', function () {
                describe('GET', function () {
                    it('returns 200 and an OpenAPI 2 doc in JSON form', async function () {
                        const res = await app().get('/api-docs/openApi/raw/2');
                        expect(res.status).to.equal(200);
                        expect(res.body.swagger).to.equal('2.0');
                    });
                });
            });
        });
    });
});
