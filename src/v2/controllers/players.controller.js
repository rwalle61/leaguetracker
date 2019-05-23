const playersService = require('../services/players.service');

const getPlayers = async function(req, res, next) {
    try {
        res.status(200).send(await playersService.getPlayers());
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getPlayers,
};
