const Game = require('../models/Game');

const getGames = () => Game.query().eager('players');
const getGame = (id) => Game.query().findById(id).eager('players');
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