const Knex = require('knex')(require('../../../knexfile'));

const games = require('./data/games.data');
const app = require('../../setup/app.setup');
const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');

describe('/api/v2', function () {
    before(async function(){
        this.timeout(10000);
        await Knex.migrate.rollback();
        await Knex.migrate.latest();
    });
    beforeEach(async function() {
        this.timeout(10000);
        await Knex.seed.run();
    });
    describe('/games', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all games', async function () {
                const res = await app().get('/api/v2/games');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                for (const member of res.body) {
                    expect(fitsSchema(member, jsonSchemas.Game)).to.be.true;
                }
                expect(res.body).to.deep.equal(games.seedGamesWithPlayerRelations);
            });
        });
        describe('POST', function () {
            it('returns 201; then we can GET the created game', async function () {
                const newGame = games.insertableGame;
                const newGameWithRelation = games.game4WithPlayersRelations;
                const resFromPost = await app()
                    .post('/api/v2/games')
                    .send(newGame);
                expect(resFromPost.status).to.equal(201);

                const resFromGet = await app().get(`/api/v2/games/${newGame.id}`);
                expect(resFromGet.status).to.equal(200);
                expect(fitsSchema(resFromGet.body, jsonSchemas.Game)).to.be.true;
                expect(resFromGet.body).to.deep.equal(newGameWithRelation);
            });
        });
        describe('/{id}', function () {
            describe('GET', function () {
                describe(`with valid 'id' param`, function () {
                    it('returns 200 and a body with only the requested game', async function () {
                        const expectedGame = games.game1WithPlayersRelations;
                        const res = await app().get(`/api/v2/games/${expectedGame.id}`);
                        expect(res.status).to.equal(200);
                        expect(fitsSchema(res.body, jsonSchemas.Game)).to.be.true;
                        expect(res.body).to.deep.equal(expectedGame);
                    });
                });
                describe(`with invalid 'id' param`, function () {
                    describe('non-existent game', function () {
                        it('returns 404 and text explaining the problem', async function () {
                            const id = -1;
                            const res = await app().get(`/api/v2/games/${id}`);
                            expect(res.status).to.equal(404);
                            expect(res.text).to.equal(`game ${id} not found`);
                        });
                    });
                });
            });
            describe('DELETE', function () {
                it('returns 204; then we cannot GET the deleted game', async function () {
                    const { id } = games.existingGame;

                    const resFromDelete = await app().delete(`/api/v2/games/${id}`);
                    expect(resFromDelete.status).to.equal(204);

                    const resFromGet = await app().get(`/api/v2/games/${id}`);
                    expect(resFromGet.status).to.equal(404);
                    expect(resFromGet.text).to.equal(`game ${id} not found`);
                });
            });
            describe('PUT', function () {
                it('returns 204; then we can GET the updated game', async function () {
                    const updatableGame = games.updatableGame;
                    const updatedGameWithRelation = games.updatableGameWithPlayersRelations;
                    const id = updatableGame.id;
                    const resFromPut = await app()
                        .put(`/api/v2/games/${id}`)
                        .send(updatableGame);
                    expect(resFromPut.status).to.equal(204);

                    const resFromGet = await app().get(`/api/v2/games/${id}`);
                    expect(resFromGet.status).to.equal(200);
                    expect(resFromGet.body).to.deep.equal(updatedGameWithRelation);
                });
            });
        });
    });
});
