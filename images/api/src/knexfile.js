module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || "localhost",
      user: process.env.POSTGRES_USER || "test",
      password: process.env.POSTGRES_PASSWORD || "test",
      database: process.env.POSTGRES_DB || "test",
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