const { playersService } = require('../services');

module.exports = {
    getPlayers: playersService.getPlayers,
    getPlayer: playersService.getPlayer,
};
