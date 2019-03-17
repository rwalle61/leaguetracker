const chai = require('chai');
const chaiHttp = require('chai-http');

const { appUrl } = require('../config');

chai.use(chaiHttp);
const { expect } = chai;

describe('Health tests', function () {
    describe('GET /', function () {
        it('returns 200 OK', async function () {
            const res = await chai.request(appUrl).get('/');
            expect(res.status).to.equal(200);
        });
    });
});
