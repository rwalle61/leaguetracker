const rewire = require('rewire');

const { expect } = require('../../setup/chai.setup');

const eloService = rewire('../../../src/services/elo.service');

const calculateWinProbability = eloService.__get__('calculateWinProbability');
const calculateDelta = eloService.__get__('calculateDelta');
const calculateTeamScore = eloService.__get__('calculateTeamScore');
const updatePlayers = eloService.__get__('updatePlayers');

describe('elo.service.test.js', function () {
    describe('calculateWinProbability(team1Score, team2Score)', function () {
        describe('valid args', function () {
            describe('2000, 2000', function () {
                it('returns 0.5', function () {
                    const result = calculateWinProbability(2000, 2000)
                    expect(result).to.equal(0.5);
                });
            });
            describe('100, 100', function () {
                it('returns 0.5', function () {
                    const result = calculateWinProbability(100, 100)
                    expect(result).to.equal(0.5);
                });
            });
            describe('2000, 1900', function () {
                it('returns ~0.64005', function () {
                    const result = calculateWinProbability(2000, 1900)
                    expect(result).to.be.closeTo(0.64005, 0.0001);
                });
            });
            describe('0, 0', function () {
                it('returns 0.5', function () {
                    const result = calculateWinProbability(0, 0)
                    expect(result).to.equal(0.5);
                });
            });
        });
        describe('invalid args', function () {
            describe('missing', function () {
                it('throws a TypeError', function () {
                    const func = () => calculateWinProbability(100);
                    expect(func).to.throw(TypeError);
                });
            });
            describe('invalid type ({})', function () {
                it('throws a TypeError', function () {
                    const func = () => calculateWinProbability({}, {});
                    expect(func).to.throw(TypeError);
                });
            });
            describe('invalid type (\'NaN\')', function () {
                it('throws a TypeError', function () {
                    const func = () => calculateWinProbability('NaN', 'NaN');
                    expect(func).to.throw(TypeError);
                });
            });
        });
    });
    describe('calculateDelta(winnersTeamScore, losersTeamScore)', function () {
        describe('valid args', function () {
            describe('2000, 2000', function () {
                it('returns 16', function () {
                    const result = calculateDelta(2000, 2000);
                    expect(result).to.equal(16);
                });
            });
            describe('100, 100', function () {
                it('returns 16', function () {
                    const result = calculateDelta(100, 100);
                    expect(result).to.equal(16);
                });
            });
            describe('100, 0', function () {
                it('returns 12', function () {
                    const result = calculateDelta(2000, 1900);
                    expect(result).to.equal(12);
                });
            });
            describe('0, 100', function () {
                it('returns 20', function () {
                    const result = calculateDelta(0, 100);
                    expect(result).to.equal(20);
                });
            });
        });
        describe('invalid args', function () {
            describe('missing', function () {
                it('throws a TypeError', function () {
                    const func = () => calculateDelta(100);
                    expect(func).to.throw(TypeError);
                });
            });
            describe('invalid type ({})', function () {
                it('throws a TypeError', function () {
                    const func = () => calculateDelta({}, {});
                    expect(func).to.throw(TypeError);
                });
            });
            describe('invalid type (\'NaN\')', function () {
                it('throws a TypeError', function () {
                    const func = () => calculateDelta('NaN', 'NaN');
                    expect(func).to.throw(TypeError);
                });
            });
        });
    });
    describe('calculateTeamScore(players)', function () {
        describe('valid args', function () {
            describe('[playerWithScore2000]', function () {
                it('returns 2000', function () {
                    const players = [
                        createPlayer({ score: 2000 }),
                    ];
                    const result = calculateTeamScore(players);
                    expect(result).to.equal(2000);
                });
            });
            describe('[playerWithScore2000, playerWithScore2000]', function () {
                it('returns 2000', function () {
                    const players = [
                        createPlayer({ score: 2000 }),
                        createPlayer({ score: 2000 }),
                    ];
                    const result = calculateTeamScore(players);
                    expect(result).to.equal(2000);
                });
            });
            describe('[playerWithScore0, playerWithScore2000]', function () {
                it('returns 1000', function () {
                    const players = [
                        createPlayer({ score: 0 }),
                        createPlayer({ score: 2000 }),
                    ];
                    const result = calculateTeamScore(players);
                    expect(result).to.equal(1000);
                });
            });
            describe('[playerWithScore-1000, playerWithScore0]', function () {
                it('returns -500', function () {
                    const players = [
                        createPlayer({ score: -1000 }),
                        createPlayer({ score: 0 }),
                    ];
                    const result = calculateTeamScore(players);
                    expect(result).to.equal(-500);
                });
            });
        });
        describe('invalid args', function () {
            describe('missing', function () {
                it('throws an error', function () {
                    const func = () => calculateTeamScore();
                    expect(func).to.throw();
                });
            });
            describe('invalid type (String, not an array)', function () {
                it('throws an error', function () {
                    const func = () => calculateTeamScore('String, not an array');
                    expect(func).to.throw();
                });
            });
            describe('invalid type ({})', function () {
                it('throws an error', function () {
                    const func = () => calculateTeamScore({});
                    expect(func).to.throw();
                });
            });
            describe('missing players', function () {
                it('throws an error', function () {
                    const func = () => calculateTeamScore([]);
                    expect(func).to.throw();
                });
            });
        });
    });
    describe('updatePlayers(game)', function () {
        describe('valid args', function () {
            describe('sampleGame', function () {
                it('returns the correct players and delta', function () {
                    const game = {
                        winners: [
                            createPlayer({ name: 'P1', score: 0, wins: 10, losses: 10 }),
                            createPlayer({ name: 'P2', score: 0, wins: 10, losses: 10 }),
                        ],
                        losers: [
                            createPlayer({ name: 'P3', score: 0, wins: 10, losses: 10 }),
                            createPlayer({ name: 'P4', score: 0, wins: 10, losses: 10 }),
                        ],
                    };
                    const result = updatePlayers(game);
                    const expectedDelta = 16;
                    expect(result).to.deep.equal({
                        players: [
                            createPlayer({ name: 'P1', score: expectedDelta, wins: 11, losses: 10 }),
                            createPlayer({ name: 'P2', score: expectedDelta, wins: 11, losses: 10 }),
                            createPlayer({ name: 'P3', score: -expectedDelta, wins: 10, losses: 11 }),
                            createPlayer({ name: 'P4', score: -expectedDelta, wins: 10, losses: 11 }),
                        ],
                        delta: expectedDelta,
                    });
                });
            });
        });
        describe('invalid args', function () {
            describe('missing', function () {
                it('throws an error', function () {
                    const func = () => updatePlayers();
                    expect(func).to.throw();
                });
            });
            describe('invalid type (String, not an object)', function () {
                it('throws an error', function () {
                    const func = () => updatePlayers('String, not an object');
                    expect(func).to.throw();
                });
            });
            describe('missing field (winners)', function () {
                it('throws an error', function () {
                    const game = { losers: createSampleLosers() };
                    const func = () => updatePlayers(game);
                    expect(func).to.throw();
                });
            });
            describe('missing field (losers)', function () {
                it('throws an error', function () {
                    const game = { winners: createSampleWinners() };
                    const func = () => updatePlayers(game);
                    expect(func).to.throw();
                });
            });
            describe('missing players', function () {
                it('throws an error', function () {
                    const game = {
                        winners: createSampleWinners(),
                        losers: [],
                    };
                    const func = () => updatePlayers(game);
                    expect(func).to.throw();
                });
            });
            function createSampleWinners() {
                return [
                    createPlayer({ name: 'P1', score: 0, wins: 10, losses: 10 }),
                    createPlayer({ name: 'P2', score: 0, wins: 10, losses: 10 }),
                ];
            }
            function createSampleLosers() {
                return [
                    createPlayer({ name: 'P3', score: 0, wins: 10, losses: 10 }),
                    createPlayer({ name: 'P4', score: 0, wins: 10, losses: 10 }),
                ];
            }
        });
    });
});

function createPlayer({
    name='ExamplePlayer',
    score=0,
    wins=0,
    losses=0,
    rank=0,
}) {
    return { name, score, wins, losses, rank };
}