const tableName = 'players';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.string('name');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable(tableName);
};
