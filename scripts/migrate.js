const db_prod = require('../db');
(async () => {
    try {
    await db_prod.schema.dropTableIfExists('users')
    await db_prod.schema.withSchema('public').createTable('users', (table) => {
      table.increments()
      table.string('name')
      table.string('email')
      table.string('phone')
      table.string('address')
     })
       console.log('Created users table!')
       process.exit(0)
   } catch (err) {
      console.log(err)
      process.exit(1)
  }
})()