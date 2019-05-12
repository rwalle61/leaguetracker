require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const Knex = require('knex');
const { Model } = require('objection');

const v1Routes = require('./v1/routes');
const v2Routes = require('./v2/routes');
const connection = require('../knexfile');

const middleware = require('./common/middleware');
const { port } = require('./common/config');
const { syncOpenApi2and3Docs } = require('./common/utils');

const knexConnection = Knex(connection);
Model.knex(knexConnection);

syncOpenApi2and3Docs();

const app = express();

app.use('/api/v1/api-doc/', express.static('docs'));

app.use(bodyParser.json());
app.use('/api/v1/', v1Routes);
app.use('/api/v2/', v2Routes);
app.use(middleware.errorHandler.handleErrors);

app.listen(port, () => {
    console.log(`App running on ${port}`);
});

module.exports = app;
