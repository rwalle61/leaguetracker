const rewire = require('rewire');

const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');

const playersService = rewire('../../../src/v1/services/players.service');

const getPlayers = playersService.__get__('getPlayers');
const getPlayer = playersService.__get__('getPlayer');
const createPlayer = playersService.__get__('createPlayer');

describe('players.service.js', function () {
    describe('getPlayers()', function() {
        it('returns an array of players', function () {
            const result = getPlayers();
            for (const player of result) {
                expect(fitsSchema(player, jsonSchemas.Player)).to.be.true;
            }
        });
    });
    describe('getPlayer(name)', function() {
        describe('valid args', function () {
            describe('Craig', function () {
                it(`returns the player 'Craig'`, function () {
                    const result = getPlayer('Craig');
                    expect(fitsSchema(result, jsonSchemas.Player)).to.be.true;
                    expect(result).to.deep.include({ name: 'Craig' });
                });
            });
        });
    });
    describe('createPlayer(name, score, wins, losses)', function() {
        describe('valid args', function () {
            describe('{ name: \'exampleName\' }', function () {
                it('returns a default player with name:exampleName', function () {
                    const result = createPlayer({ name: 'exampleName' });
                    expect(fitsSchema(result, jsonSchemas.Player)).to.be.true;
                    expect(result).to.deep.include({ name: 'exampleName' });
                });
            });
            describe('{ name: \'exampleName\', score: 10 }', function () {
                it('returns a default player with name:exampleName, score:10', function () {
                    const result = createPlayer({ name: 'exampleName', score: 10 });
                    expect(fitsSchema(result, jsonSchemas.Player)).to.be.true;
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