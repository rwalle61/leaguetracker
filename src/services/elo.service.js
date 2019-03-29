function getProbabilityOfWin(team1Score, team2Score) {
    const exponent = (team2Score - team1Score) / 400;
    return 1 / (1 + (10 ** exponent));
}

function getDelta(winnersTeamScore, losersTeamScore) {
    const expectedProbability = getProbabilityOfWin(winnersTeamScore, losersTeamScore);

    const delta = Math.round(32 * (1 - expectedProbability));

    return Math.max(delta, 1);
}

function getTeamScore(players) {
    const total = players
        .map(player => player.score)
        .reduce((subtotal, score) => subtotal + score);

    return total / players.length;
}

function updatePlayers(game) {
    const { winners, losers } = game;

    const winnersScore = getTeamScore(winners);
    const losersScore = getTeamScore(losers);

    const delta = getDelta(winnersScore, losersScore);

    for (let i = 0; i < winners.length; i++) {
        winners[i].score += delta;
        winners[i].wins += 1;
    }
    for (let i = 0; i < losers.length; i++) {
        losers[i].score -= delta;
        losers[i].losses += 1;
    }

    return [...winners, ...losers];
}

module.exports = {
    updatePlayers,
};
