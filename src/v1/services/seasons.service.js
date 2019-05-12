const playersService = require('./players.service');
const eloService = require('../../common/services/elo.service');
const { deepClone } = require('../../common/utils');

function getPlayers(season) {
    if (!season.players) throw new TypeError();
    return season.players;
}

function getPlayer(season, playerName) {
    if (typeof playerName !== 'string') throw new TypeError();
    return getPlayers(season).find(player => player.name === playerName);
}

function createSeason({ seasonName, playersOptions }) {
    const players = playersOptions.map(
        playerOptions => playersService.createPlayer(playerOptions)
    );
    const rankedPlayers = rankPlayers(players);
    const season = {
        seasonName,
        players: rankedPlayers,
    };
    return season;
}

function rankPlayers(players) {
    const playersCopy = deepClone(players);
    const sortedPlayers = playersCopy.sort((player1, player2) => (player2.score - player1.score));
    let scoreOfPreviousPlayer;
    let rankOfPreviousPlayer;
    const rankedPlayers = sortedPlayers.map((player, index) => {
        if (player.score === scoreOfPreviousPlayer) {
            player.rank = rankOfPreviousPlayer;
        } else {
            const rank = index + 1;
            player.rank = rank;
            rankOfPreviousPlayer = rank;
        }
        scoreOfPreviousPlayer = player.score;
        return player;
    });
    return rankedPlayers;
}

function updatePlayer(season, updatedPlayer) {
    const playerIndex = season.players.findIndex(p => p.name === updatedPlayer.name);
    season.players[playerIndex] = updatedPlayer;
}

function updateSeasonWithPlayers(season, players) {
    return players.forEach(player => updatePlayer(season, player));
}

function updateSeason({ season, games }) {
    const deltas = [];
    games.forEach(game => {
        const { namesOfWinners, namesOfLosers } = game;
        const winners = namesOfWinners.map(name => getPlayer(season, name));
        const losers = namesOfLosers.map(name => getPlayer(season, name));

        const { players, delta } = eloService.updatePlayers({ winners, losers });
        deltas.push(delta);

        updateSeasonWithPlayers(season, players);
        const rankedPlayers = rankPlayers(season.players);
        updateSeasonWithPlayers(season, rankedPlayers);
    });
    return { season, deltas };
}

module.exports = {
    getPlayers,
    getPlayer,
    createSeason,
    updateSeason,
};
