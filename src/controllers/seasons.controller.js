const { seasonsService } = require('../services');

function validateCreationOptions(reqBody) {
    return reqBody;
}

function validateUpdateOptions(reqBody) {
    return reqBody;
}

function createSeason(creationOptions) {
    return seasonsService.createSeason(creationOptions);
}

function updateSeason(updateOptions) {
    return seasonsService.updateSeason(updateOptions);
}

module.exports = {
    validateCreationOptions,
    validateUpdateOptions,
    createSeason,
    updateSeason,
};
