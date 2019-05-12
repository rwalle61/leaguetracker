const tableName = 'seasons';
const data = [
    {
        id: 1,
        name: 'SrowValue1',
        description: 'SrowValue11',
        leagues_id: 1,
    },
    {
        id: 2,
        name: 'SrowValue2',
        description: 'SrowValue12',
        leagues_id: 2,
    },
    {
        id: 3,
        name: 'SrowValue3',
        description: 'SrowValue13',
        leagues_id: 3,
    },
];
exports.data = data;
exports.seed = async function (knex) {
    await knex(tableName).del();
    await knex(tableName).insert(data);
};