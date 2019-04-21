const { logError } = require('../utils');

function handleErrors(err, req, res, next) {
    logError(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send(err.message);
}

module.exports = {
    handleErrors,
};
