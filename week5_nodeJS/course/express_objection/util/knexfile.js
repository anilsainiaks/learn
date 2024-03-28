const {knexSnakeCaseMappers} = require('objection');

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'node',
      user:     'root',
      password: "Anil@123"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      directory : './seeds'
    },
    ...knexSnakeCaseMappers(),
  }
  

};
