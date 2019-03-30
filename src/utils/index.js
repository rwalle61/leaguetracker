function typeOf(variable) {
    if (Array.isArray(variable)) return 'array';
    return typeof variable;
}

module.exports = {
    typeOf,
};
