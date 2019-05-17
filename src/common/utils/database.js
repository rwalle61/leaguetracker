const Knex = require('knex');
const { Model } = require('objection');

const connection = require('../../../knexfile');

function connectToDatabase() {
    const knexConnection = Knex(connection);
    Model.knex(knexConnection);
}

module.exports = {
    connectToDatabase,
};