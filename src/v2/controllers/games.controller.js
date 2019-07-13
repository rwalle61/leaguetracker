const gamesService = require('../services/games.service');

const getGames = async function(req, res, next) {
    try {
        res.status(200).send(await gamesService.getGames());
    } catch(err) {
        next(err);
    }
};

const getGame = async function(req, res, next) {
    try {
        const id = req.params.id;
        const game = await gamesService.getGame(id);
        if (!game) {
            res.status(404).send(`game ${id} not found`);
        } else {
            res.status(200).send(game);
        }
    } catch(err) {
        next(err);
    }
};

const postGame = async function(req, res, next) {
    try {
        const game = req.body;
        const { id } = await gamesService.postGame(game);
        const location = `${req.protocol}://${req.get('host')}${req.originalUrl}/${id}`;
        res.status(201).set({ location }).send();
    } catch(err) {
        next(err);
    }
};

const deleteGame = async function(req, res, next) {
    try {
        const id = req.params.id;
        await gamesService.deleteGame(id);
        res.status(204).send();
    } catch(err) {
        next(err);
    }
};

const putGame = async function(req, res, next) {
    try {
        const id = req.params.id;
        const game = req.body;
        delete game.id;
        await gamesService.putGame(id, game);
        res.status(204).send();
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getGames,
    getGame,
    postGame,
    deleteGame,
    putGame,
};
