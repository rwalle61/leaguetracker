const Player = require('../models/Player');

const getPlayers = () => Player.query();

module.exports = { getPlayers };