const League = require('../models/League');

const getLeagues = () => League.query();

module.exports = { getLeagues };