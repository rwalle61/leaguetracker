const Game = require('../models/Game');

const getGames = () => Game.query();
const getGame = (id) => Game.query().findById(id);
const postGame = (game) => Game.query().insert(game);
const deleteGame = (id) => Game.query().deleteById(id);
const putGame = (id, game) => Game.query().findById(id).patch(game);

module.exports = { 
    getGames, 
    getGame,
    postGame,
    deleteGame, 
    putGame, 
};