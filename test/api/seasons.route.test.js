const { app, expect } = require('../setup');

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
                    deltas: [],
                }, {
                    name: 'Richard',
                    score: 1000,
                    wins: 0,
                    losses: 0,
                    deltas: [],
                },
            ]);
        });
    });
});
