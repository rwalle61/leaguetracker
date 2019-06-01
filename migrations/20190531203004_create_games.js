const tableName = 'games';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.integer('seasons_id').references('seasons.id').onDelete('cascade');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable(tableName);
};
