const tableName = 'leagues';

exports.up = async function (knex) {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable(tableName);
};
