const League = require('../models/League');

const getLeagues = () => League.query();
const getLeague = (id) => League.query().findById(id);

module.exports = { getLeagues, getLeague };