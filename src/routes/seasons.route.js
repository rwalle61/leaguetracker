const express = require('express');

const { seasonsController } = require('../controllers');

const router = express.Router();

router.post('/', async (req, res) => {
    const seasonCreationOptions = seasonsController.validateCreationOptions(req.body);
    try {
        const detailsOfCreatedSeason = await seasonsController.createSeason(seasonCreationOptions);
        res.status(201).send(detailsOfCreatedSeason);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;
