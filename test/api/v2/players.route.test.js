const Knex = require('knex')(require('../../../knexfile'));

const players = require('./data/players.data');
const app = require('../../setup/app.setup');
const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');

describe('/api/v2/players', function () {
    before(async function(){
        this.timeout(10000);
        await Knex.migrate.latest({ directory: ['test/config/migrations'] });
    });
    beforeEach(async function() {
        this.timeout(10000);
        await Knex.seed.run();
    });
    after(async function(){
        this.timeout(10000);
        await Knex.migrate.rollback({ directory: ['test/config/migrations'] });
    });
    describe('GET', function () {
        it('returns 200 and a body listing all players', async function () {
            const res = await app().get('/api/v2/players');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            for (const member of res.body) {
                expect(fitsSchema(member, jsonSchemas.Player_V2)).to.be.true;
            }
            expect(res.body).to.deep.equal(players.seed);
        });
    });
});
