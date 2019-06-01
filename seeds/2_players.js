const tableName = 'players';
const data = require('../test/api/v2/data/players.data');

exports.seed = async function (knex) {
    await knex(tableName).del();
    await knex(tableName).insert(data.seed);
};