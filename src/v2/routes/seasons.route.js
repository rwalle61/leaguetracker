const express = require('express');

const { validateReq } = require('../../common/middleware/reqValidator');
const seasonsController = require('../controllers/seasons.controller');

const router = express.Router();

router.route('/')
    .all(validateReq)
    .get(seasonsController.getSeasons);

module.exports = router;
