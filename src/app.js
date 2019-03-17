const express = require('express');

const routes = require('./routes');
const config = require('./config');

const { port } = config.dev;
const app = express();

app.use(routes);

app.listen(port, () => {
    console.log(`App running on ${port}`);
});

module.exports = app;
