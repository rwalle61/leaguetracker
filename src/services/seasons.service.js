const playersService = require('./players.service');
const eloService = require('./elo.service');

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
    const rankedPlayers = assignPlayerRanks(players);
    const season = {
        seasonName,
        players: rankedPlayers,
    };
    return season;
}

function assignPlayerRanks(players) {
    const playersCopy = [...players];
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

function updateSeason({ season, games }) {
    const deltas = [];
    games.forEach(game => {
        const { namesOfWinners, namesOfLosers } = game;
        const winners = namesOfWinners.map(name => getPlayer(season, name));
        const losers = namesOfLosers.map(name => getPlayer(season, name));

        const { players, delta } = eloService.updatePlayers({ winners, losers });
        deltas.push(delta);
        players.forEach((player) => {
            updatePlayer(season, player);
        });
        const rankedPlayers = assignPlayerRanks(season.players);
        rankedPlayers.map((player) => {
            updatePlayer(season, player);
        });
    });
    return {
        season,
        deltas,
    };
}

module.exports = {
    getPlayers,
    getPlayer,
    createSeason,
    updateSeason,
};
