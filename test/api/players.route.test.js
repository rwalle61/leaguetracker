const players = require('../../src/data/players');
const app = require('../setup/app.setup');
const { expect } = require('../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../setup/schemas.setup');

describe('/players', function () {
    describe('GET', function () {
        it('returns 200 and a body listing all players', async function () {
            const res = await app().get('/players');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            for (const member of res.body) {
                expect(fitsSchema(member, jsonSchemas.Player)).to.be.true;
            }
            expect(res.body).to.deep.equal(players);
        });
    });

    describe('/{id}', function () {
        describe('GET', function () {
            describe(`with valid 'id' param`, function () {
                const playerName = 'Craig';
                it('returns 200 and a body containing the player requested', async function () {
                    const res = await app().get(`/players/${playerName}`);
                    expect(res.status).to.equal(200);
                    expect(fitsSchema(res.body, jsonSchemas.Player)).to.be.true;
                    const expectedPlayer = players.find(player => player.name === playerName);
                    expect(res.body).to.deep.equal(expectedPlayer);
                });
            });
            describe(`with invalid 'id' param`, function () {
                describe('non-existent player', function () {
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