const dotenv = require('dotenv');
dotenv.config();
const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : process.env.DB_USER,
      password : process.env.DB_USER,
      database : process.env.DB_DATABASE
    }
  });

module.exports = knex;