const { seasonsService } = require('../services');

function createSeason(creationOptions) {
    return seasonsService.createSeason(creationOptions);
}

function updateSeason(updateOptions) {
    return seasonsService.updateSeason(updateOptions);
}

module.exports = {
    createSeason,
    updateSeason,
};
