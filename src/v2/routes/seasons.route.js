const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const seasonsService = require('../services/seasons.service');

const router = express.Router();

router.get('/', validateReq, async (req, res, next) => {
    try {
        res.status(200).send(await seasonsService.getSeasons());
    } catch(err) {
        next(err);
    }
});

module.exports = router;
