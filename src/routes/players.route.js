const express = require('express');

const { playersController } = require('../controllers');

const router = express.Router();

router.get('/players', async (req, res) => {
    const players = await playersController.getPlayers();
    res.status(200).send(players);
});

module.exports = router;
