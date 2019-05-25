const express = require('express');

const { validateReq } = require('../../../common/middleware/reqValidator');
const leaguesController = require('./controller');

const router = express.Router();

router.route('/')
    .all(validateReq)
    .get(leaguesController.getLeagues)
    .post(leaguesController.postLeague);

router.route('/:id')
    .all(validateReq)
    .get(leaguesController.getLeague)
    .delete(leaguesController.deleteLeague)
    .put(leaguesController.putLeague);

module.exports = router;
