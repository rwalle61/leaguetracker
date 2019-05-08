function calculateWinProbability(team1Score, team2Score) {
    if (isNaN(team1Score) || isNaN(team2Score)) throw TypeError(`both ${team1Score} and ${team2Score} must be numbers`);
    const exponent = (team2Score - team1Score) / 400;
    return 1 / (1 + 10 ** exponent);
}

function calculateDelta(winnersTeamScore, losersTeamScore) {
    const winProbability = calculateWinProbability(winnersTeamScore, losersTeamScore);
    const delta = Math.round(32 * (1 - winProbability));
    return Math.max(delta, 1);
}

function calculateTeamScore(players) {
    const sumOfPlayersScores = players
        .map(player => player.score)
        .reduce((subtotal, score) => subtotal + score);
    return sumOfPlayersScores / players.length;
}

function updatePlayers(game) {
    const { winners, losers } = game;

    const winnersScore = calculateTeamScore(winners);
    const losersScore = calculateTeamScore(losers);

    const delta = calculateDelta(winnersScore, losersScore);

    winners.forEach((player) => {
        player.score += delta;
        player.wins += 1;
    });
    losers.forEach((player) => {
        player.score -= delta;
        player.losses += 1;
    });
    
    const players = [...winners, ...losers];
    return {
        players,
        delta,
    };
}

module.exports = {
    updatePlayers,
};
