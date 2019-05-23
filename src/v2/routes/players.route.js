const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const playersController = require('../controllers/players.controller');

const router = express.Router();

router.route('/')
    .all(validateReq)
    .get(playersController.getPlayers);

module.exports = router;
