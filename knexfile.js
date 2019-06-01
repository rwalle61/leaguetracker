module.exports = {
    client: 'pg',
    version: '7.2',
    connection: {
        user: process.env.DB_USER, 
        host: process.env.DB_HOST,
        database: 'league_tracker',
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
};