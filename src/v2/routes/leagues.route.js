const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const leaguesController = require('../controllers/leagues.controller');

const router = express.Router();

router.get('/', validateReq, async (req, res, next) => {
    try {
        res.status(200).send(await leaguesController.getLeagues());
    } catch(err) {
        next(err);
    }
});

router.route('/:id')
    .get(leaguesController.getLeague)
    .delete(leaguesController.deleteLeague);

module.exports = router;
