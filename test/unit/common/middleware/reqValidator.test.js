const rewire = require('rewire');

const { expect } = require('../../../setup/chai.setup');

const reqValidator = rewire('../../../../src/common/middleware/reqValidator');
const getRouteInOpenapiFormat = reqValidator.__get__('getRouteInOpenapiFormat');

describe('reqValidator.js', function () {
    describe('getRouteInOpenapiFormat(req)', function () {
        describe('valid args', function () {
            describe('req.route.path = \'/\'', function () {
                it('returns an empty string', async function () {
                    const req = {
                        route: {
                            path: '/',
                        },
                    };
                    const output = getRouteInOpenapiFormat(req);
                    expect(output).to.equal('');
                });
            });
            describe('req.route.path = \'/{id}\'', function () {
                it('return /{id}', async function () {
                    const req = {
                        route: {
                            path: '/:id',
                        },
                    };
                    const output = getRouteInOpenapiFormat(req);
                    expect(output).to.equal('/{id}');
                });
            });
        });
        // Don't test invalid args because req comes from Express
    });
});