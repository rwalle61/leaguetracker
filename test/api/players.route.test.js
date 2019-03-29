const { app, expect } = require('../setup');

describe('/players', function () {
    describe('GET', function () {
        describe('200 case', function () {
            const expectedResStatus = 200;
            it(`returns status ${expectedResStatus} and a body containing a list of players`, async function () {
                const res = await app().get('/players');
                expect(res.status).to.equal(expectedResStatus);
                expect(res.body).to.be.an('array');
                expect(res.body).to.all.have.property('name');
            });
        });
    });

    describe('/{id}', function () {
        const reqParamId = 'Craig';
        const players = [
            {
                name: 'Craig', score: 1088, wins: 34, losses: 24,
            }, {
                name: 'Richard', score: 1081, wins: 10, losses: 5,
            }, {
                name: 'Jack', score: 1051, wins: 16, losses: 13,
            }, {
                name: 'Luke', score: 1049, wins: 14, losses: 10,
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
        ];
        describe('GET', function () {
            describe('200 case', function () {
                const expectedResStatus = 200;
                const expectedResBody = players.find(player => player.name === 'Craig');
                it(`returns status ${expectedResStatus} and a body containing a single player`, async function () {
                    const res = await app()
                        .get(`/players/${reqParamId}`)
                        .send(players);
                    expect(res.status).to.equal(expectedResStatus);
                    expect(res.body).to.deep.equal(expectedResBody);
                });
            });
        });
    });
});
