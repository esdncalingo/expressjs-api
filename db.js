const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'postgres://mtg_champs_db_user:jS9d2EinY930hI5dyVMTgK3LPILQCFT2@dpg-chiclat269vf5qd8aalg-a.singapore-postgres.render.com/mtg_champs_db',
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = db;