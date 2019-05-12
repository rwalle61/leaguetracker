const tableName = 'leagues';
const data = [
    {
        id: 1,
        name: 'rowValue1',
        description: 'rowValue11',
    },
    {
        id: 2,
        name: 'rowValue2',
        description: 'rowValue12',
    },
    {
        id: 3,
        name: 'rowValue3',
        description: 'rowValue13',
    },
];
exports.data = data;
exports.seed = async function (knex) {
    await knex(tableName).del();
    await knex(tableName).insert(data);
};