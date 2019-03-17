const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Health tests', function () {
    describe('GET /', function () {
        it('returns 200 OK', async function () {
            const res = await chai.request(app).get('/');
            expect(res.status).to.equal(200);
        });
    });
});
