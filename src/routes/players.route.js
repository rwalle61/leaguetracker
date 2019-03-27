const express = require('express');

const { playersController } = require('../controllers');

const router = express.Router();

router.get('/', async (req, res) => {
    const players = await playersController.getPlayers();
    res.status(200).send(players);
});

router.get('/:id', async (req, res) => {
    try {
        const player = await playersController.getPlayer(req.params.id);
        res.status(200).send(player);
    } catch (error) {
        if (error.msg.includes('player not found')) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(500);
    }
});

module.exports = router;
