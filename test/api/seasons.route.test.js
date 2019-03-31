const season1 = require('../../src/data/season.1');
const { app, expect } = require('../setup');

describe('/seasons', function () {
    describe('POST', function () {
        describe('201 case', function () {
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
                expect(res.body.players).to.be.an('array').with.deep.members([
                    { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 1 },
                    { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 1 },
                ]);
            });
        });
        describe('400 cases', function () {
            it('returns status 400 and text explaining how input was invalid', async function () {
                const seasonCreationOptions = {
                    seasonName: 'Pool Season 1',
                    playerNames: [['Craig']],
                };
                const res = await app()
                    .post('/seasons')
                    .send(seasonCreationOptions);
                expect(res.status).to.equal(400);
                expect(res.text).to.equal('playerNames must be a String array but instead contains a array');
            });
        });
    });
    describe('PUT', function () {
        it('returns 200 and a body containing the season details', async function () {
            const seasonUpdateOptions = {
                season: {
                    seasonName: 'Pool Season 1',
                    players: [
                        { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 1 },
                        { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 1 },
                    ],
                },
                games: [
                    { 
                        namesOfWinners: ['Craig'],
                        namesOfLosers: ['Richard'],
                    },
                ],
            };
            const res = await app()
                .put('/seasons')
                .send(seasonUpdateOptions);
            expect(res.status).to.equal(200);
            expect(res.body.season.seasonName).to.equal(seasonUpdateOptions.season.seasonName);
            expect(res.body.season.players).to.be.an('array').with.deep.members([
                { name: 'Craig', score: 1016, wins: 1, losses: 0, rank: 1 },
                { name: 'Richard', score: 984, wins: 0, losses: 1, rank: 2 },
            ]);
            expect(res.body.deltas).to.be.an('array').with.deep.members([16]);
        });

        it('returns 200 and a body containing the season details', async function () {
            const seasonUpdateOptions = {
                season: {
                    seasonName: 'Pool Season 1',
                    players: [
                        { name: 'Craig', score: 1000, wins: 0, losses: 0, rank: 2 },
                        { name: 'Richard', score: 1000, wins: 0, losses: 0, rank: 2 },
                        { name: 'Tom', score: 1001, wins: 1, losses: 0, rank: 1 },
                    ],
                },
                games: [
                    { 
                        namesOfWinners: ['Craig'],
                        namesOfLosers: ['Richard'],
                    },
                ],
            };
            const res = await app()
                .put('/seasons')
                .send(seasonUpdateOptions);
            expect(res.status).to.equal(200);
            expect(res.body.season.seasonName).to.equal(seasonUpdateOptions.season.seasonName);
            expect(res.body.season.players).to.be.an('array').with.deep.members([
                { name: 'Craig', score: 1016, wins: 1, losses: 0, rank: 1 },
                { name: 'Richard', score: 984, wins: 0, losses: 1, rank: 3 },
                { name: 'Tom', score: 1001, wins: 1, losses: 0, rank: 2 },
            ]);
            expect(res.body.deltas).to.be.an('array').with.deep.members([16]);
        });

        it('returns 200 and a body containing the season details', async function () {
            const seasonUpdateOptions = {
                season: season1,
                games: [
                    { 
                        namesOfWinners: ['Craig', 'Richard'],
                        namesOfLosers: ['Jack', 'Luke'],
                    },
                    { 
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
                {
                    name: 'Craig', score: 1083, wins: 35, losses: 25, rank: 1,
                }, {
                    name: 'Richard', score: 1076, wins: 11, losses: 6, rank: 2,
                }, {
                    name: 'Jack', score: 1056, wins: 17, losses: 14, rank: 3,
                }, {
                    name: 'Luke', score: 1054, wins: 15, losses: 11, rank: 4,
                }, {
                    name: 'Nik', score: 1034, wins: 14, losses: 14, rank: 5,
                }, {
                    name: 'James', score: 1015, wins: 1, losses: 0, rank: 6,
                }, {
                    name: 'Matt', score: 1001, wins: 18, losses: 16, rank: 7,
                }, {
                    name: 'Judith', score: 985, wins: 16, losses: 21, rank: 8,
                }, {
                    name: 'Liam', score: 966, wins: 10, losses: 13, rank: 9,
                }, {
                    name: 'Matthew', score: 950, wins: 27, losses: 29, rank: 10,
                }, {
                    name: 'Danny', score: 949, wins: 8, losses: 11, rank: 11,
                }, {
                    name: 'Beth', score: 917, wins: 1, losses: 7, rank: 12,
                }, {
                    name: 'Jamie', score: 914, wins: 3, losses: 9, rank: 13,
                },
            ]);
            expect(res.body.deltas).to.be.an('array').with.deep.members([14,19]);
        });
    });
});
