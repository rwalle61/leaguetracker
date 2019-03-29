const playersService = require('./players.service');
const eloService = require('./elo.service');

const getPlayers = season => season.players;

function getPlayer(season, playerName) {
    return getPlayers().find(player => player.name === playerName);
}

function createSeason(creationOptions) {
    const { seasonName, playerNames } = creationOptions;
    const players = playerNames.map(name => playersService.createPlayer(name));
    const season = {
        seasonName,
        players,
    };
    return season;
}

function updatePlayer(season, updatedPlayer) {
    const playerIndex = season.players.findIndex(p => p.name === updatedPlayer.name);
    season.players[index] = updatedPlayer;
}

function updateSeason(updateOptions) {
    const { season, game } = updateOptions;
    const players = eloService.updatePlayers(game);
    players.forEach((player) => {
        updatePlayer(season, player);
    });
    return season;
}

module.exports = {
    getPlayers,
    getPlayer,
    createSeason,
    updateSeason,
};
