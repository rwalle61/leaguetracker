const seasonsService = require('../services/seasons.service');

const getSeasons = async function(req, res, next) {
    try {
        res.status(200).send(await seasonsService.getSeasons());
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getSeasons,
};
