const Season = require('./model');

const getSeasons = () => Season.query();

module.exports = { getSeasons };