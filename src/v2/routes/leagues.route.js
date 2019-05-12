const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const leaguesService = require('../services/leagues.service');

const router = express.Router();

router.get('/', validateReq, async (req, res, next) => {
    try {
        const leagues = await leaguesService.getLeagues();
        console.log(leagues);
        res.status(200).send(leagues);
        console.log('NO err');
    } catch(err) {
        console.log('err');
        console.log(err);
        next(err);
    }
});

module.exports = router;
