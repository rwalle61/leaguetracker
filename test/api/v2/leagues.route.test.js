const Knex = require('knex')(require('../../../knexfile'));

const leagues = require('./data/leagues.data');
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
    describe('/leagues', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all leagues', async function () {
                const res = await app().get('/api/v2/leagues');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                for (const member of res.body) {
                    expect(fitsSchema(member, jsonSchemas.League)).to.be.true;
                }
                expect(res.body).to.deep.equal(leagues.seed);
            });
        });
        describe('POST', function () {
            it('returns 201; then we can GET the created league', async function () {
                const newLeague = leagues.insertableLeague;
                const resFromPost = await app()
                    .post('/api/v2/leagues')
                    .send(newLeague);
                expect(resFromPost.status).to.equal(201);


                const resFromGet = await app().get(`/api/v2/leagues/${newLeague.id}`);
                expect(resFromGet.status).to.equal(200);
                expect(fitsSchema(resFromGet.body, jsonSchemas.League)).to.be.true;
                expect(resFromGet.body).to.deep.equal(newLeague);
            });
        });
        describe('/{id}', function () {
            describe('GET', function () {
                describe(`with valid 'id' param`, function () {
                    it('returns 200 and a body with only the requested league', async function () {
                        const expectedLeague = leagues.existingLeague;
                        const res = await app().get(`/api/v2/leagues/${expectedLeague.id}`);
                        expect(res.status).to.equal(200);
                        expect(fitsSchema(res.body, jsonSchemas.League)).to.be.true;
                        expect(res.body).to.deep.equal(expectedLeague);
                    });
                });
                describe(`with invalid 'id' param`, function () {
                    describe('non-existent league', function () {
                        it('returns 404 and text explaining the problem', async function () {
                            const id = -1;
                            const res = await app().get(`/api/v2/leagues/${id}`);
                            expect(res.status).to.equal(404);
                            expect(res.text).to.equal(`league ${id} not found`);
                        });
                    });
                });
            });
            describe('DELETE', function () {
                it('returns 204; then we cannot GET the deleted league', async function () {
                    const { id } = leagues.existingLeague;

                    const resFromDelete = await app().delete(`/api/v2/leagues/${id}`);
                    expect(resFromDelete.status).to.equal(204);

                    const resFromGet = await app().get(`/api/v2/leagues/${id}`);
                    expect(resFromGet.status).to.equal(404);
                    expect(resFromGet.text).to.equal(`league ${id} not found`);
                });
            });
            describe('PUT', function () {
                it('returns 204; then we can GET the updated league', async function () {
                    const updatableLeague = leagues.updatableLeague;
                    const id = updatableLeague.id;
                    const resFromPut = await app()
                        .put(`/api/v2/leagues/${id}`)
                        .send(updatableLeague);
                    expect(resFromPut.status).to.equal(204);

                    const resFromGet = await app().get(`/api/v2/leagues/${id}`);
                    expect(resFromGet.status).to.equal(200);
                    expect(resFromGet.body).to.deep.equal(updatableLeague);
                });
            });
        });
    });
});
