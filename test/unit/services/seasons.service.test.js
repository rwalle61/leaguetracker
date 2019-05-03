
const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/schemas.setup');

const seasonsService = require('../../../src/services/seasons.service');

const season1 = require('../../../src/data/season.1');
const expectedPlayers = require('../../../src/data/players');

describe('seasons.service.js', function () {
    describe('getPlayer(season, playerName)', function () {
        describe('valid args', function () {
            describe(`season1, 'Richard'`, function () {
                it(`returns the player 'Richard' from season1`, function () {
                    const player = seasonsService.getPlayer(season1, 'Richard');
                    const expectedPlayer = { name: 'Richard', score: 1081, wins: 10, losses: 5, rank: 2 };
                    expect(fitsSchema(player, jsonSchemas.Player)).to.be.true;
                    expect(player).to.deep.equal(expectedPlayer);
                });
            });
        });
        describe('invalid args', function () {
            describe('missing playerName', function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.getPlayer(season1);
                    expect(func).to.throw(TypeError);
                });
            });
            describe(`invalid 'season' type (String)`, function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.getPlayer('string', 'Richard');
                    expect(func).to.throw(TypeError);
                });
            });
            describe(`invalid 'playerName' type ({})`, function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.getPlayer(season1, {});
                    expect(func).to.throw(TypeError);
                });
            });
        });
    });

    describe('getPlayers(season)', function () {
        describe('valid args', function () {
            describe(`season1`, function () {
                it(`returns the players from season1`, function () {
                    const players = seasonsService.getPlayers(season1);
                    players.forEach(player => {
                        expect(fitsSchema(player, jsonSchemas.Player)).to.be.true;
                    });
                    expect(players).to.deep.equal(expectedPlayers);
                });
            });
        });
        describe('invalid args', function () {
            describe('missing/undefined', function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.getPlayers();
                    expect(func).to.throw(TypeError);
                });
            });
            describe(`invalid 'season' type (String)`, function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.getPlayers('string');
                    expect(func).to.throw(TypeError);
                });
            });
        });
    });
    describe('createSeason({ seasonName, playersOptions })', function () {
        describe('valid args', function () {
            describe(`{ seasonName: name1, playersOptions: [{ name: 'Richard' }] }`, function () {
                it(`returns a season named 'name1' with 1 default player, Richard`, function () {
                    const seasonName = 'name1';
                    const season = seasonsService.createSeason({
                        seasonName,
                        playersOptions: [ { name: 'Richard' } ],
                    });
                    expect(season).to.deep.equal({
                        seasonName,
                        players: [ { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 1 } ],
                    });
                });
            });
            describe(`{ seasonName: name1, playersOptions: [{ name: 'Craig' } { name: 'Richard' }] }`, function () {
                it(`returns a season named 'name1' with 2 default players, Craig and Richard`, function () {
                    const seasonName = 'name1';
                    const season = seasonsService.createSeason({
                        seasonName,
                        playersOptions: [
                            { name: 'Craig' },
                            { name: 'Richard' },
                        ],
                    });
                    expect(season).to.deep.equal({
                        seasonName,
                        players: [
                            { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 1 },
                            { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 1 },
                        ],
                    });
                });
            });
        });
        describe('invalid args', function () {
            describe(`missing field (seasonName)`, function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.createSeason({ playersOptions: { name: 'Richard' } });
                    expect(func).to.throw(TypeError);
                });
            });
            describe(`missing field (playersOptions)`, function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.createSeason({ seasonName: 'name1' });
                    expect(func).to.throw(TypeError);
                });
            });
        });
    });

    describe('updateSeason({ season, games })', function () {
        describe('valid args', function () {
            describe(`{ season: <defaultSeason:2Players>, games: <1game> }`, function () {
                let defaultSeason;
                before('set up a default season with 2 players', function () {
                    defaultSeason = seasonsService.createSeason({
                        seasonName: 'defaultSeason:2Players',
                        playersOptions: [
                            { name: 'Craig' },
                            { name: 'Richard' },
                        ],
                    });
                });
                it(`returns a correctly updated season`, function () {
                    const result = seasonsService.updateSeason({
                        season: defaultSeason,
                        games: [
                            {
                                namesOfWinners: ['Craig'],
                                namesOfLosers: ['Richard'],
                            },
                        ],
                    });
                    result.season.players.forEach(player => {
                        expect(fitsSchema(player, jsonSchemas.Player)).to.be.true;
                    });
                    expect(result.season.players).to.be.an('array').with.deep.members([
                        { name: 'Craig', score: 1016, wins: 1, losses: 0, rank: 1 },
                        { name: 'Richard', score: 984, wins: 0, losses: 1, rank: 2 },
                    ]);
                    expect(result.deltas).to.be.an('array').with.members([16]);
                });
            });
            describe(`{ season: <defaultSeason:3Players>, games: <1game> }`, function () {
                let defaultSeason;
                before('set up a default season with 3 players', function () {
                    defaultSeason = seasonsService.createSeason({
                        seasonName: 'defaultSeason:3Players',
                        playersOptions: [
                            { name: 'Craig' },
                            { name: 'Richard' },
                            { name: 'Danny' },
                        ],
                    });
                });
                it(`returns a correctly updated season`, function () {
                    const result = seasonsService.updateSeason({
                        season: defaultSeason,
                        games: [
                            {
                                namesOfWinners: ['Craig'],
                                namesOfLosers: ['Richard'],
                            },
                        ],
                    });
                    result.season.players.forEach(player => {
                        expect(fitsSchema(player, jsonSchemas.Player)).to.be.true;
                    });
                    expect(result.season.players).to.be.an('array').with.deep.members([
                        { name: 'Craig', score: 1016, wins: 1, losses: 0, rank: 1 },
                        { name: 'Danny', score: 1000, wins: 0, losses: 0, rank: 2 },
                        { name: 'Richard', score: 984, wins: 0, losses: 1, rank: 3 },
                    ]);
                    expect(result.deltas).to.be.an('array').with.members([16]);
                });
            });
            describe(`{ season: <defaultSeason:2Players>, games: <2games> }`, function () {
                let defaultSeason;
                before('set up a default season with 2 players', function () {
                    defaultSeason = seasonsService.createSeason({
                        seasonName: 'defaultSeason:2Players',
                        playersOptions: [
                            { name: 'Craig' },
                            { name: 'Richard' },
                        ],
                    });
                });
                it(`returns a correctly updated season`, function () {
                    const result = seasonsService.updateSeason({
                        season: defaultSeason,
                        games: [
                            {
                                namesOfWinners: ['Craig'],
                                namesOfLosers: ['Richard'],
                            },
                            {
                                namesOfWinners: ['Richard'],
                                namesOfLosers: ['Craig'],
                            },
                        ],
                    });
                    result.season.players.forEach(player => {
                        expect(fitsSchema(player, jsonSchemas.Player)).to.be.true;
                    });
                    expect(result.season.players).to.be.an('array').with.deep.members([
                        { name: 'Richard', score: 1001, wins: 1, losses: 1, rank: 1 },
                        { name: 'Craig', score: 999, wins: 1, losses: 1, rank: 2 },
                    ]);
                    expect(result.deltas).to.be.an('array').with.members([16, 17]);
                });
            });
        });
        describe('invalid args', function () {
            describe('missing/undefined', function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.updateSeason();
                    expect(func).to.throw(TypeError);
                });
            });
            describe(`missing field (games)`, function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.updateSeason({ season: season1 });
                    expect(func).to.throw(TypeError);
                });
            });
            describe(`invalid 'games' type (String)`, function () {
                it('throws a TypeError', function () {
                    const func = () => seasonsService.updateSeason({
                        season: season1,
                        games: 'string',
                    });
                    expect(func).to.throw(TypeError);
                });
            });
        });
    });
});