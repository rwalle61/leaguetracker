const express = require('express');

const root = require('./root.route');
const players = require('./players.route');

const router = express.Router();

router.use(root);
router.use(players);

module.exports = router;
