function handleErrors(err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
}

module.exports = {
    handleErrors,
};
