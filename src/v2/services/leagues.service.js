const League = require('../models/League');

const getLeagues = () => League.query();
const getLeague = (id) => League.query().findById(id);
const deleteLeague = (id) => League.query().deleteById(id);

module.exports = { 
    getLeagues, 
    getLeague, 
    deleteLeague, 
};