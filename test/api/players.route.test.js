const players = require('../../src/data/players');
const { app, expect } = require('../setup');

describe('/players', function () {
    describe('GET', function () {
        describe('200 case', function () {
            const expectedResStatus = 200;
            it(`returns status ${expectedResStatus} and a body containing a list of players`, async function () {
                const res = await app().get('/players');
                expect(res.status).to.equal(expectedResStatus);
                expect(res.body).to.be.an('array');
                expect(res.body).to.all.have.property('name');
            });
        });
    });

    describe('/{id}', function () {
        const reqParamId = 'Craig';
        describe('GET', function () {
            describe('200 case', function () {
                const expectedResStatus = 200;
                const expectedResBody = players.find(player => player.name === reqParamId);
                it(`returns status ${expectedResStatus} and a body containing a single player`, async function () {
                    const res = await app()
                        .get(`/players/${reqParamId}`)
                        .send(players);
                    expect(res.status).to.equal(expectedResStatus);
                    expect(res.body).to.deep.equal(expectedResBody);
                });
            });
        });
    });
});
