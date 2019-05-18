const express = require('express');

const leagues = require('./leagues.route');
const seasons = require('./seasons.route');
const players = require('./players.route');

const router = express.Router();

router.use('/leagues', leagues);
router.use('/seasons', seasons);
router.use('/players', players);

module.exports = router;
