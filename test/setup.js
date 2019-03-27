const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');

const app = require('../src/app');

chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;

module.exports = {
    expect,
    app: () => chai.request(app), // use like: await app().get('/')
};
