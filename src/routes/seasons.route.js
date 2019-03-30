const express = require('express');

const { seasonsController } = require('../controllers');

const router = express.Router();

router.post('/',
    seasonsController.validateCreationOptions,
    async (req, res) => {
        const detailsOfCreatedSeason = await seasonsController.createSeason(req.body);
        res.status(201).send(detailsOfCreatedSeason);
    });

router.put('/',
    seasonsController.validateUpdateOptions,
    async (req, res) => {
        const detailsOfUpdatedSeason = await seasonsController.updateSeason(req.body);
        res.status(200).send(detailsOfUpdatedSeason);
    });

module.exports = router;
