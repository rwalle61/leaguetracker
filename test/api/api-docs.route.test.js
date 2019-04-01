const { app, expect } = require('../setup');

describe('/api-docs', function () {
    describe('GET', function () {
        it('returns 200 and an OpenAPI 3 doc', async function () {
            const res = await app().get('/api-docs');
            expect(res.status).to.equal(200);
            expect(res.text).to.include('<title>LeagueTracker Docs</title>');
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
        describe('/raw', function () {
            describe('GET', function () {
                it('returns 200 and an OpenAPI 3 doc in JSON form', async function () {
                    const res = await app().get('/api-docs/swagger/raw');
                    expect(res.status).to.equal(200);
                    expect(res.body.openapi).to.equal('3.0.0');
                });
            });
        });
    });
});
