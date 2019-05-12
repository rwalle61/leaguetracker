module.exports = {
    client: 'pg',
    version: '7.2',
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
    pool: {
        min: 0,
        max: 12,
        propagateCreateError: false,
    },
};