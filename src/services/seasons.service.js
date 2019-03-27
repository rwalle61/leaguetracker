const season1 = require('../data/season.1');
const playersService = require('./players.service');

function createSeason(creationOptions) {
    const { seasonName, playerNames } = creationOptions;
    const players = playerNames.map(name => playersService.createPlayer(name));
    const season = {
        seasonName,
        players,
    };
    return season;
}

module.exports = {
    getPlayers: () => season1.players,
    createSeason,
};
