const rewire = require('rewire');

const { expect } = require('../../setup/chai.setup');

const playersService = rewire('../../../src/services/players.service');

const createPlayer = playersService.__get__('createPlayer');

describe('players.service.js', function () {
    describe('createPlayer(name, score, wins, losses)', function() {
        describe('valid args', function () {
            describe('{ name: \'exampleName\' }', function () {
                it('returns a default player with name:exampleName', function () {
                    const result = createPlayer({ name: 'exampleName' });
                    expect(result).to.have.keys('name', 'score', 'wins', 'losses', 'rank');
                    expect(result).to.deep.include({ name: 'exampleName' });
                });
            });
            describe('{ name: \'exampleName\', score: 10 }', function () {
                it('returns a default player with name:exampleName, score:10', function () {
                    const result = createPlayer({ name: 'exampleName', score: 10 });
                    expect(result).to.have.keys('name', 'score', 'wins', 'losses', 'rank');
                    expect(result).to.deep.include({
                        name: 'exampleName',
                        score: 10,
                    });
                });
            });
        });
        describe('invalid args', function () {
            describe('missing', function () {
                it('throws a TypeError', function () {
                    const func = () => createPlayer();
                    expect(func).to.throw(TypeError);
                });
            });
        });
    });
});