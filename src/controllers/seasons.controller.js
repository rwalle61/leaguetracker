const { seasonsService } = require('../services');

function validateCreationOptions(reqBody) {
    return reqBody;
}

function createSeason(creationOptions) {
    return seasonsService.createSeason(creationOptions);
}

module.exports = {
    validateCreationOptions,
    createSeason,
};
