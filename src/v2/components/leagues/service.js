const League = require('./model');

const getLeagues = () => League.query();
const getLeague = (id) => League.query().findById(id);
const postLeague = (league) => League.query().insert(league);
const deleteLeague = (id) => League.query().deleteById(id);
const putLeague = (id, league) => League.query().findById(id).patch(league);

module.exports = { 
    getLeagues, 
    getLeague,
    postLeague,
    deleteLeague, 
    putLeague, 
};