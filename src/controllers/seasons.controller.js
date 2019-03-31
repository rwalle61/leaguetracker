const { seasonsService } = require('../services');
const { typeOf } = require('../utils');


function validateCreationOptions(req, res, next) {
    const { playersOptions } = req.body;
    playersOptions.forEach((player) => {
        let name = player.name
        if (typeOf(name) !== 'string') {
            const err = new Error(`player names must be Strings not ${typeOf(name)}s`);
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
