const Pool = require('pg').Pool
const pool = new Pool({
  user: 'dncalingo',
  host: 'localhost',
  database: 'express_api_db',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  console.log('Getting all users Data')
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers
}