const express = require('express');

const { seasonsController } = require('../controllers');
const { validateReq } = require('../middleware/reqValidator');

const router = express.Router();

router.post('/', validateReq, async (req, res) => {
    const detailsOfCreatedSeason = await seasonsController.createSeason(req.body);
    res.status(201).send(detailsOfCreatedSeason);
});

router.put('/', validateReq, async (req, res) => {
    const detailsOfUpdatedSeason = await seasonsController.updateSeason(req.body);
    res.status(200).send(detailsOfUpdatedSeason);
});

module.exports = router;
