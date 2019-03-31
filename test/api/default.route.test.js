const { app, expect } = require('../setup');

describe('/', function () {
    describe('GET', function () {
        it('returns 200', async function () {
            const res = await app().get('/');
            expect(res.status).to.equal(200);
        });
    });
});
