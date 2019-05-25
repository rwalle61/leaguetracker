const express = require('express');

const { validateReq } = require('../../../common/middleware/reqValidator');
const seasonsController = require('./controller');

const router = express.Router();

router.route('/')
    .all(validateReq)
    .get(seasonsController.getSeasons);

module.exports = router;
