const { app, expect } = require('../setup');
const season1 = require('../../src/data/season.1');

describe('/seasons', function () {
    describe('POST', function () {
        it('returns 201 and a body containing the season details', async function () {
            const seasonCreationOptions = {
                seasonName: 'Pool Season 1',
                playerNames: ['Craig', 'Richard'],
            };
            const res = await app()
                .post('/seasons')
                .send(seasonCreationOptions);
            expect(res.status).to.equal(201);
            expect(res.body.seasonName).to.equal(seasonCreationOptions.seasonName);
            expect(res.body.players).to.have.deep.members([
                {
                    name: 'Craig',
                    score: 1000,
                    wins: 0,
                    losses: 0,
                }, {
                    name: 'Richard',
                    score: 1000,
                    wins: 0,
                    losses: 0,
                },
            ]);
        });
    });
    describe('PUT', function () {
        it('returns 200 and a body containing the season details', async function () {
            const seasonUpdateOptions = {
                season: {
                    seasonName: 'Pool Season 1',
                    players: [
                        {
                            name: 'Craig', score: 1000, wins: 0, losses: 0,
                        }, {
                            name: 'Richard', score: 1000, wins: 0, losses: 0,
                        },
                    ],
                },
                game: {
                    winners: [
                        {
                            name: 'Craig', score: 1000, wins: 0, losses: 0,
                        },
                    ],
                    losers: [
                        {
                            name: 'Richard', score: 1000, wins: 0, losses: 0,
                        },
                    ],
                },
            };
            const res = await app()
                .put('/seasons')
                .send(seasonUpdateOptions);
            expect(res.status).to.equal(200);
            expect(res.body.seasonName).to.equal(seasonUpdateOptions.season.seasonName);
            expect(res.body.players).to.have.deep.members([
                {
                    name: 'Craig',
                    score: 1016,
                    wins: 1,
                    losses: 0,
                }, {
                    name: 'Richard',
                    score: 984,
                    wins: 0,
                    losses: 1,
                },
            ]);
        });
    });
    describe('PUT', function () {
        it('returns 200 and a body containing the season details', async function () {
            const seasonUpdateOptions = {
                season: season1,
                game: {
                    winners: [
                        {
                            name: 'Craig', score: 1088, wins: 34, losses: 24,
                        }, {
                            name: 'Richard', score: 1081, wins: 10, losses: 5,
                        },
                    ],
                    losers: [
                        {
                            name: 'Jack', score: 1051, wins: 16, losses: 13,
                        }, {
                            name: 'Luke', score: 1049, wins: 14, losses: 10,
                        },
                    ],
                },
            };
            const res = await app()
                .put('/seasons')
                .send(seasonUpdateOptions);
            expect(res.status).to.equal(200);
            expect(res.body.seasonName).to.equal(seasonUpdateOptions.season.seasonName);
            expect(res.body.players).to.have.deep.members([
                {
                    name: 'Craig', score: 1102, wins: 35, losses: 24,
                }, {
                    name: 'Richard', score: 1095, wins: 11, losses: 5,
                }, {
                    name: 'Jack', score: 1037, wins: 16, losses: 14,
                }, {
                    name: 'Luke', score: 1035, wins: 14, losses: 11,
                }, {
                    name: 'Nik', score: 1034, wins: 14, losses: 14,
                }, {
                    name: 'James', score: 1015, wins: 1, losses: 0,
                }, {
                    name: 'Matt', score: 1001, wins: 18, losses: 16,
                }, {
                    name: 'Judith', score: 985, wins: 16, losses: 21,
                }, {
                    name: 'Liam', score: 966, wins: 10, losses: 13,
                }, {
                    name: 'Matthew', score: 950, wins: 27, losses: 29,
                }, {
                    name: 'Danny', score: 949, wins: 8, losses: 11,
                }, {
                    name: 'Beth', score: 917, wins: 1, losses: 7,
                }, {
                    name: 'Jamie', score: 914, wins: 3, losses: 9,
                },
            ]);
        });
    });
});
