const db_prod = require('../db')

// Get all Users
const getUsers = async (req, res) => {
  try {
    const users = await db_prod
                          .select()
                          .from('users')
    res
      .json(users)
  } catch (error) {
    console.log(error)
    res
      .status(402)
      .json({ message: 'Error retrieving users' })
  }
}

// Create User
const createUser = async (req, res) => {
  try {
    const user = await db_prod('users')
                        .insert(req.body)
                        .returning('*')
    res
      .json(user)
  } catch (error) {
    console.error(error)
    res
      .status(402)
      .json({ message: 'Error creating user' })
  }
}

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await db_prod('users')
                        .where({ id })
                        .delete()
                        .returning('*')
    res
      .json(user)
  } catch (error) {
    console.error(error)
    res
      .status(402)
      .json({ message: 'Error deleting user' })
  }
}

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await db_prod('users')
                        .where({ id })
                        .update(req.body)
                        .returning('*')
    res
      .json(user)
  } catch (error) {
    console.log(error)
    res
      .status(402)
      .json({ message: 'Error updating user' })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}