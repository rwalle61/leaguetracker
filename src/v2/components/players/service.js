const Player = require('./model');

const getPlayers = () => Player.query();

module.exports = { getPlayers };