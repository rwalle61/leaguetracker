const Season = require('../models/Season');

const getSeasons = () => Season.query();

module.exports = { getSeasons };