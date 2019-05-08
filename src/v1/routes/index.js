const express = require('express');

const root = require('./root.route');
const apiDocs = require('./api-docs.route');
const players = require('./players.route');
const seasons = require('./seasons.route');

const router = express.Router();

router.use('/', root);
router.use('/api-docs', apiDocs);
router.use('/players', players);
router.use('/seasons', seasons);

module.exports = router;
