const tableName = 'players_seasons';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.integer('player_id');
        table.integer('season_id');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable(tableName);
};
