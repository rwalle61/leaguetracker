const { seasonsService } = require('../services');
const { typeOf } = require('../utils');


function validateCreationOptions(req, res, next) {
    const { seasonName, playerNames } = req.body;
    playerNames.forEach((name) => {
        if (typeof name !== 'string') {
            // handle errors using this pattern and our errorHandler middleware, rather than try-catches
            const err = new Error(`playerNames must be a String array but instead contains a ${typeOf(name)}`);
            err.statusCode = 400;
            next(err);
        }
    });
    next();
}

function validateUpdateOptions(req, res, next) {
    next();
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
