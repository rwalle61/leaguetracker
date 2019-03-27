const { app, expect } = require('../setup');

describe('Health test', function () {
    describe('/', function () {
        describe('GET', function () {
            it('returns 200 OK', async function () {
                const res = await app().get('/');
                expect(res.status).to.equal(200);
            });
        });
    });
});
