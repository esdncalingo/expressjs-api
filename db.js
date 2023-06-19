const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'postgres://express_api_db_dj8d_user:hQjWmLPCmmejR0MXzOginFxRrCdjp8mC@dpg-ci8bvrenqql0ldafkg20-a.singapore-postgres.render.com/express_api_db_dj8d',
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = db;