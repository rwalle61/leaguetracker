function handleErrors(err, req, res, next) {
    // logError(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send(err.message);
}

function logError(err) {
    console.log({
        error: {
            name: err.name,
            message: err.message,
            // data: err.data,
        },
    });
}

module.exports = {
    handleErrors,
};
