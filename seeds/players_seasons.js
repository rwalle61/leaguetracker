const tableName = 'players_seasons';
const data = require('../test/api/v2/data/players_seasons.data');

exports.seed = async function (knex) {
    await knex(tableName).del();
    await knex(tableName).insert(data.seed);
};