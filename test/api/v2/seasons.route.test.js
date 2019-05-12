const Knex = require('knex')(require('../../../knexfile'));

const seasons = require('../../../seeds/seasons');

const app = require('../../setup/app.setup');

const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');

describe('/api/v2', function () {
    before(async function(){
        await Knex.migrate.rollback();
        await Knex.migrate.latest();
    });
    beforeEach(async function() {
        await Knex.seed.run();
    });
    describe('/seasons', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all seasons', async function () {
                const res = await app().get('/api/v2/seasons');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                for (const member of res.body) {
                    expect(fitsSchema(member, jsonSchemas.Season)).to.be.true;
                }
                expect(res.body).to.deep.equal(seasons.data);
            });
        });
    });
});