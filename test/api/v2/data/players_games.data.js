const join1 = {
    id: 1,
    players_id: 1,
    games_id: 1,
    won: true,
};
const join2 = {
    id: 2,
    players_id: 2,
    games_id: 1,
    won: false,
};
const join3 = {
    id: 3,
    players_id: 1,
    games_id: 2,
    won: true,
};
const join4 = {
    id: 4,
    players_id: 2,
    games_id: 2,
    won: true,
};
const join5 = {
    id: 5,
    players_id: 3,
    games_id: 2,
    won: false,
};
module.exports = {
    seed: [join1, join2, join3, join4, join5],
};