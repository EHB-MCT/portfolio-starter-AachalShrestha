module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'root',
      database: 'devv',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  },
};