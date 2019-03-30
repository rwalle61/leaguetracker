const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const middleware = require('./middleware');
const { port } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(routes);
app.use(middleware.errorHandler.handleErrors);

app.listen(port, () => {
    console.log(`App running on ${port}`);
});

module.exports = app;
