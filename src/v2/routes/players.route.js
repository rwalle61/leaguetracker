const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const playersService = require('../services/players.service');

const router = express.Router();

router.get('/', validateReq, async (req, res, next) => {
    try {
        res.status(200).send(await playersService.getPlayers());
    } catch(err) {
        next(err);
    }
});

module.exports = router;
