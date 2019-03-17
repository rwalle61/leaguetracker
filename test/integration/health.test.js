const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Health test', function () {
    describe('GET /', function () {
        it('returns 200 OK', async function () {
            const res = await chai.request(app).get('/');
            expect(res.status).to.equal(200);
        });
    });
});
