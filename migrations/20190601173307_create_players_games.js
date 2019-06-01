const tableName = 'players_games';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.integer('players_id');
        table.integer('games_id');
        table.boolean('won');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable(tableName);
};
