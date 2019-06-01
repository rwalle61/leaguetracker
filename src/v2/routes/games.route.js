const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const gamesController = require('../controllers/games.controller');

const router = express.Router();

router.route('/')
    .all(validateReq)
    .get(gamesController.getGames)
    .post(gamesController.postGame);

router.route('/:id')
    .all(validateReq)
    .get(gamesController.getGame)
    .delete(gamesController.deleteGame)
    .put(gamesController.putGame);

module.exports = router;
