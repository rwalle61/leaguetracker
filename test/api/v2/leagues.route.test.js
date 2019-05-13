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
            it('returns 201 and a body listing a single league', async function () {
                const insertableleague = leagues.insertableLeague;
                const resAfterPost = await app()
                    .post('/api/v2/leagues')
                    .send(insertableleague);
                expect(resAfterPost.status).to.equal(201);

                const resAfterGet = await app()
                    .get(`/api/v2/leagues/${insertableleague.id}`);
                expect(resAfterGet.status).to.equal(200);
                expect(fitsSchema(resAfterGet.body, jsonSchemas.League)).to.be.true;
                expect(resAfterGet.body).to.deep.equal(insertableleague);
            });
        });
        describe('/{id}', function () {
            describe('GET', function () {
                it('returns 200 and a body listing a single league', async function () {
                    const expectedLeague = leagues.existingLeague;
                    const res = await app().get(`/api/v2/leagues/${expectedLeague.id}`);
                    expect(res.status).to.equal(200);
                    expect(fitsSchema(res.body, jsonSchemas.League)).to.be.true;
                    expect(res.body).to.deep.equal(expectedLeague);
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
                it('returns 204 and a GET on the deleted league returns 404', async function () {
                    const deletableLeague = leagues.existingLeague;
                    const id = deletableLeague.id;
                    const resFromDelete = await app().delete(`/api/v2/leagues/${id}`);
                    expect(resFromDelete.status).to.equal(204);
                    const resFromGet = await app().get(`/api/v2/leagues/${id}`);
                    expect(resFromGet.status).to.equal(404);
                    expect(resFromGet.text).to.equal(`league ${id} not found`);
                });
            });
        });
    });
});
