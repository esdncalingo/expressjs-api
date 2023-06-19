require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

// Get all Users
const getUsers = (request, response) => {
  console.log('Getting all users Data')

  pool
    .query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
    response
      .status(200).json(results.rows)
  })
}

// Get User
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool
    .query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
    response
      .status(200).json(results.rows)
  })
}

// Create User
const createUser = (request, response) => {
  console.log('User Created: ')
  console.log(request.body)

  const { name, email, phone, address } = request.body
  pool
    .query('INSERT INTO users (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *', 
      [name, email, phone, address], 
      (error, results) => {
        if (error) {
          throw error
        }
    response
      .status(200)
      .send(`User added with ID: ${results.rows[0].id}`)
  })
}

// Update User
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  
  const { name, email, phone, address } = request.body
  pool
    .query('UPDATE users SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5',
      [name, email, phone, address, id],
      (error, results) => {
        if (error) {
          throw error
        }
      response
        .status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// Delete User
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool
    .query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
    response
      .status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}