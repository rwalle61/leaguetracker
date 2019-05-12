const express = require('express');

const leagues = require('./leagues.route');
const seasons = require('./seasons.route');

const router = express.Router();

router.use('/leagues', leagues);
router.use('/seasons', seasons);

module.exports = router;
