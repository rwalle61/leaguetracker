function calculateProbabilityOfWin(team1Score, team2Score) {
    const exponent = (team2Score - team1Score) / 400;
    return 1 / (1 + 10 ** exponent);
}

function calculateDelta(winnersTeamScore, losersTeamScore) {
    const expectedProbability = calculateProbabilityOfWin(winnersTeamScore, losersTeamScore);

    const delta = Math.round(32 * (1 - expectedProbability));

    return Math.max(delta, 1);
}

function calculateTeamScore(players) {
    const total = players
        .map(player => player.score)
        .reduce((subtotal, score) => subtotal + score);

    return total / players.length;
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

    return [...winners, ...losers];
}

module.exports = {
    updatePlayers,
};
