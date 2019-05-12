const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const leaguesService = require('../services/leagues.service');

const router = express.Router();

router.get('/', validateReq, async (req, res, next) => {
    try {
        res.status(200).send(await leaguesService.getLeagues());
    } catch(err) {
        next(err);
    }
});

module.exports = router;
