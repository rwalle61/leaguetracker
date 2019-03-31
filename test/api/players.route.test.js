const players = require('../../src/data/players');
const { app, expect } = require('../setup');

describe('/players', function () {
    describe('GET', function () {
        it('returns 200 and a body containing a list of players', async function () {
            const res = await app().get('/players');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.all.have.property('name');
        });
    });

    describe('/{id}', function () {
        describe('GET', function () {
            describe('with valid req.param.id (playerName)', function () {
                const playerName = 'Craig';
                it('returns 200 and a body containing the player requested', async function () {
                    const res = await app().get(`/players/${playerName}`);
                    expect(res.status).to.equal(200);
                    const expectedPlayer = players.find(player => player.name === playerName);
                    expect(res.body).to.deep.equal(expectedPlayer);
                });
            });
            describe('with invalid req.param.id (playerName)', function () {
                describe('since this player doesn\'t exist', function () {
                    const playerName = 'Non-existent player';
                    it('returns 404 and text explaining the problem', async function () {
                        const res = await app().get(`/players/${playerName}`);
                        expect(res.status).to.equal(404);
                        expect(res.text).to.equal(`player ${playerName} not found`);
                    });
                });
            });
        });
    });
});
