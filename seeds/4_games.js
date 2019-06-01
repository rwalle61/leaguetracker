const tableName = 'games';
const data = require('../test/api/v2/data/games.data');

exports.seed = async function (knex) {
    await knex(tableName).del();
    await knex(tableName).insert(data.seed);
};