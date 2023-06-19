require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

const db = require('./queries')
const db_prod = require('./db')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Users CRUD
// app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/users', async (req, res) => {
  try {
    const users = await db_prod.select().from('users')
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'Error retrieving users' })
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})