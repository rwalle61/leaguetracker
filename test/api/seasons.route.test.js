const season1 = require('../../src/data/season.1');
const app = require('../setup/app.setup');
const { expect } = require('../setup/chai.setup');

describe('/seasons', function () {
    describe('POST', function () {
        describe('with valid req.body (seasonCreationOptions)', function () {
            describe('containing 2 players (with default options)', function () {
                it('returns 201 and a body containing the season details', async function () {
                    const seasonCreationOptions = {
                        seasonName: 'Pool Season 1',
                        playersOptions: [
                            { name: 'Craig' },
                            { name: 'Richard' },
                        ],
                    };
                    const res = await app()
                        .post('/seasons')
                        .send(seasonCreationOptions);
                    expect(res.status).to.equal(201);
                    expect(res.body.seasonName).to.equal(seasonCreationOptions.seasonName);
                    expect(res.body.players).to.be.an('array').with.deep.members([
                        { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 1 },
                        { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 1 },
                    ]);
                });
            });
            describe('containing 2 players (1 starting on a different score)', function () {
                it('returns 201 and a body containing the season details', async function () {
                    const seasonCreationOptions = {
                        seasonName: 'Pool Season 1',
                        playersOptions: [
                            { name: 'Craig', score: 1001 },
                            { name: 'Richard' },
                        ],
                    };
                    const res = await app()
                        .post('/seasons')
                        .send(seasonCreationOptions);
                    expect(res.status).to.equal(201);
                    expect(res.body.seasonName).to.equal(seasonCreationOptions.seasonName);
                    expect(res.body.players).to.be.an('array').with.deep.members([
                        { name: 'Craig', score: 1001, wins: 0, losses: 0, rank: 1 },
                        { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 2 },
                    ]);
                });
            });
        });

        describe('with invalid req.body (seasonCreationOptions)', function () {
            describe('(playersOptions.name should be a String, but is instead an array)', function () {
                it('returns 400 and text explaining how req was invalid', async function () {
                    const seasonCreationOptions = {
                        seasonName: 'Pool Season 1',
                        playersOptions: [
                            {
                                name: ['Craig'],
                            },
                        ],
                    };
                    const res = await app()
                        .post('/seasons')
                        .send(seasonCreationOptions);
                    expect(res.status).to.equal(400);
                    expect(res.text).to.equal('Error while validating request: request.body.playersOptions[0].name should be string');
                });
            });
        });
    });
    describe('PUT', function () {
        describe('with valid req.body (seasonUpdateOptions)', function () {
            describe('containing 1 game of 2 players (and a season of 2 players)', function () {
                it('returns 200 and a body containing the season details', async function () {
                    const season = {
                        seasonName: 'Pool Season 1',
                        players: [
                            { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 1 },
                            { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 1 },
                        ],
                    };
                    const games = [
                        {
                            namesOfWinners: ['Craig'],
                            namesOfLosers: ['Richard'],
                        },
                    ];
                    const res = await app()
                        .put('/seasons')
                        .send({ season, games });
                    expect(res.status).to.equal(200);
                    expect(res.body.season.seasonName).to.equal(season.seasonName);
                    expect(res.body.season.players).to.be.an('array').with.deep.members([
                        { name: 'Craig', score: 1016, wins: 1, losses: 0, rank: 1 },
                        { name: 'Richard', score: 984, wins: 0, losses: 1, rank: 2 },
                    ]);
                    expect(res.body.deltas).to.be.an('array').with.deep.members([16]);
                });
            });

            describe('containing 1 game of 2 players (and a season of 2+ players)', function () {
                it('returns 200 and a body containing the season details', async function () {
                    const season = {
                        seasonName: 'Pool Season 1',
                        players: [
                            { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 2 },
                            { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 2 },
                            { name: 'Tom', score: 1001, wins: 1, losses: 0, rank: 1 },
                        ],
                    };
                    const games = [
                        {
                            namesOfWinners: ['Craig'],
                            namesOfLosers: ['Richard'],
                        },
                    ];
                    const res = await app()
                        .put('/seasons')
                        .send({ season, games });
                    expect(res.status).to.equal(200);
                    expect(res.body.season.seasonName).to.equal(season.seasonName);
                    expect(res.body.season.players).to.be.an('array').with.deep.members([
                        { name: 'Craig', score: 1016, wins: 1, losses: 0, rank: 1 },
                        { name: 'Richard', score: 984, wins: 0, losses: 1, rank: 3 },
                        { name: 'Tom', score: 1001, wins: 1, losses: 0, rank: 2 },
                    ]);
                    expect(res.body.deltas).to.be.an('array').with.deep.members([16]);
                });
            });

            describe('containing 2 games of 4 players (and a season of 4+ players)', function () {
                it('returns 200 and a body containing the season details', async function () {
                    const seasonUpdateOptions = {
                        season: season1,
                        games: [
                            {
                                namesOfWinners: ['Craig', 'Richard'],
                                namesOfLosers: ['Jack', 'Luke'],
                            }, {
                                namesOfWinners: ['Jack', 'Luke'],
                                namesOfLosers: ['Craig', 'Richard'],
                            },
                        ],
                    };
                    const res = await app()
                        .put('/seasons')
                        .send(seasonUpdateOptions);
                    expect(res.status).to.equal(200);
                    expect(res.body.season.seasonName).to.equal(seasonUpdateOptions.season.seasonName);
                    expect(res.body.season.players).to.be.an('array').with.deep.members([
                        { name: 'Craig', score: 1083, wins: 35, losses: 25, rank: 1 },
                        { name: 'Richard', score: 1076, wins: 11, losses: 6, rank: 2 },
                        { name: 'Jack', score: 1056, wins: 17, losses: 14, rank: 3 },
                        { name: 'Luke', score: 1054, wins: 15, losses: 11, rank: 4 },
                        { name: 'Nik', score: 1034, wins: 14, losses: 14, rank: 5 },
                        { name: 'James', score: 1015, wins: 1, losses: 0, rank: 6 },
                        { name: 'Matt', score: 1001, wins: 18, losses: 16, rank: 7 },
                        { name: 'Judith', score: 985, wins: 16, losses: 21, rank: 8 },
                        { name: 'Liam', score: 966, wins: 10, losses: 13, rank: 9 },
                        { name: 'Matthew', score: 950, wins: 27, losses: 29, rank: 10 },
                        { name: 'Danny', score: 949, wins: 8, losses: 11, rank: 11 },
                        { name: 'Beth', score: 917, wins: 1, losses: 7, rank: 12 },
                        { name: 'Jamie', score: 914, wins: 3, losses: 9, rank: 13 },
                    ]);
                    expect(res.body.deltas).to.be.an('array').with.deep.members([14,19]);
                });
            });
        });
        describe('with invalid req.body (seasonUpdateOptions)', function () {
            describe('(missing \'season\' field)', function () {
                const seasonUpdateOptions = {
                    games: [
                        {
                            namesOfWinners: ['Craig'],
                            namesOfLosers: ['Richard'],
                        },
                    ],
                }
                it('returns 400 and text explaining how req was invalid', async function () {
                    const res = await app()
                        .put('/seasons')
                        .send(seasonUpdateOptions);
                    expect(res.status).to.equal(400);
                    expect(res.text).to.equal('Error while validating request: request.body should have required property \'season\'');
                });
            });
            describe('(missing \'games\' field)', function () {
                const seasonUpdateOptions = {
                    season: {
                        seasonName: 'Pool Season 1',
                        players: [
                            { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 1 },
                            { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 1 },
                        ],
                    },
                }
                it('returns 400 and text explaining how req was invalid', async function () {
                    const res = await app()
                        .put('/seasons')
                        .send(seasonUpdateOptions);
                    expect(res.status).to.equal(400);
                    expect(res.text).to.equal('Error while validating request: request.body should have required property \'games\'');
                });
            });
        });
    });
});
