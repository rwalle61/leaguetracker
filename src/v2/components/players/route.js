const express = require('express');

const { validateReq } = require('../../../common/middleware/reqValidator');
const playersController = require('./controller');

const router = express.Router();

router.route('/')
    .all(validateReq)
    .get(playersController.getPlayers);

module.exports = router;
