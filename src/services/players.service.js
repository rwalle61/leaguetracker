const season1 = require('../data/season.1');

const getPlayers = () => season1.players;

const getPlayer = name => getPlayers().find(player => player.name === name);

function createPlayer(
    name,
    score = 1000,
    wins = 0,
    losses = 0,
    deltas = [],
) {
    return {
        name,
        score,
        wins,
        losses,
        deltas,
    };
}

module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
};
