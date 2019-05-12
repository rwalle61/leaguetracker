const Knex = require('knex')(require('../../../knexfile'));

const leagues = require('./data/leagues.data');

const app = require('../../setup/app.setup');

const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');

describe('/api/v2', function () {
    before(async function(){
        console.log(process.env.DB_USER);
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_HOST2);
        console.log(process.env.DB_HOST3);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_PORT);
        console.log(process.env.DB_DATABASE);
        console.log(process.env.DB_DATABASE2);
        this.timeout(100000);
        await Knex.migrate.rollback();
        await Knex.migrate.latest();
    });
    beforeEach(async function() {
        this.timeout = 100000;
        await Knex.seed.run();
    });
    describe('/leagues', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all leagues', async function () {
                const res = await app().get('/api/v2/leagues');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                for (const member of res.body) {
                    expect(fitsSchema(member, jsonSchemas.Season)).to.be.true;
                }
                expect(res.body).to.deep.equal(leagues.seed);
            });
        });
    });
});
