const League = require('../models/League');

const getLeagues = () => League.query();
const getLeague = (id) => League.query().findById(id);
const postLeague = (league) => League.query().insert(league);
const deleteLeague = (id) => League.query().deleteById(id);

module.exports = { 
    getLeagues, 
    getLeague,
    postLeague,
    deleteLeague, 
};