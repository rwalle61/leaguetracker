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

router.put('/', async (req, res) => {
    try {
        const seasonUpdateOptions = seasonsController.validateUpdateOptions(req.body);
        const detailsOfUpdatedSeason = await seasonsController.updateSeason(seasonUpdateOptions);
        res.status(200).send(detailsOfUpdatedSeason);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;
