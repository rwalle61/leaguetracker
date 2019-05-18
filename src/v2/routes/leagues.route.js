const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const leaguesController = require('../controllers/leagues.controller');

const router = express.Router();

router.route('/')
    .all(validateReq)
    .get(async (req, res, next) => {
        try {
            res.status(200).send(await leaguesController.getLeagues());
        } catch(err) {
            next(err);
        }
    })
    .post(leaguesController.postLeague);

router.route('/:id')
    .all(validateReq)
    .get(leaguesController.getLeague)
    .delete(leaguesController.deleteLeague)
    .put(leaguesController.putLeague);

module.exports = router;
