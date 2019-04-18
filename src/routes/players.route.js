const express = require('express');

const { playersController } = require('../controllers');

const router = express.Router();

router.get('/', async (req, res) => {
    const players = await playersController.getPlayers();
    res.status(200).send(players);
});

router.get('/:id', async (req, res) => {
    const playerName = req.params.id;
    const player = await playersController.getPlayer(playerName);
    if (!player) {
        res.status(404).send(`player ${playerName} not found`);
    } else {
        res.status(200).send(player);
    }
});

module.exports = router;
