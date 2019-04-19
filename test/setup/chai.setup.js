const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiThings = require('chai-things');

chai.use(chaiHttp);
chai.use(chaiThings);

module.exports = chai;