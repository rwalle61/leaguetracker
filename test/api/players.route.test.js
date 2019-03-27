const { app, expect } = require('../setup');

describe('/players', function () {
    describe('GET', function () {
        describe('200 case', function () {
            const expectedResStatus = 200;
            it(`returns status ${expectedResStatus} and a body`, async function () {
                const res = await app().get('/players');
                expect(res.status).to.equal(expectedResStatus);
                expect(res.body).to.be.an('array');
                expect(res.body).to.all.have.property('name');
            });
        });
    });

    describe.skip('/{id}', function () {
        describe('GET', function () {
            describe('200 case', function () {
                const expectedResStatus = 200;
                it(`returns status ${expectedResStatus} and a body`, async function () {
                    const res = await app().get('/players');
                    expect(res.status).to.equal(expectedResStatus);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.all.have.property('name');
                });
            });
        });

        describe('/score', function () {
            describe('GET', function () {
                describe('200 case', function () {
                    const expectedResStatus = 200;
                    it(`returns status ${expectedResStatus} and a body`, async function () {
                        const res = await app().get('/players');
                        expect(res.status).to.equal(expectedResStatus);
                        expect(res.body).to.be.an('array');
                        expect(res.body).to.all.have.property('name');
                    });
                });
            });
        });
    });
});
