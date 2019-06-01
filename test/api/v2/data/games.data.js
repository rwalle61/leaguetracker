const game1 = {
    id: 1,
    seasons_id: 1,
};
const game2 = {
    id: 2,
    seasons_id: 1,
};
const game3 = {
    id: 3,
    seasons_id: 2,
};
const game4 = {
    id: 4,
    seasons_id: 3,
};
const updatableGame = {
    id: 1,
    seasons_id: 2,
};

module.exports = {
    seed: [game1, game2, game3],
    existingGame: game1,
    insertableGame: game4,
    updatableGame,
};