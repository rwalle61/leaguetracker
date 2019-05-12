const tableName = 'seasons';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
        table.integer('leagues_id').references('leagues.id').onDelete('cascade');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable(tableName);
};
