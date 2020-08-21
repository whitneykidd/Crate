// Imports
import { Sequelize } from 'sequelize'

// App Imports
import { NODE_ENV } from '../config/env'
import databaseConfig from '../config/database.json'

// Load database config
const databaseConfigEnv = databaseConfig[NODE_ENV]

// Create new database connection
// This feels like accessing an API
const connection = new Sequelize(databaseConfigEnv.database, databaseConfigEnv.username, databaseConfigEnv.password, {
  host: databaseConfigEnv.host,
  dialect: databaseConfigEnv.dialect,
  logging: false
})

// Test connection
// console.info('SETUP - Connecting database...')

<<<<<<< HEAD
connection
  .authenticate()
  // promise! Asynch functions!
  .then(() => {
    console.info('INFO - Database connected.')
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })
=======
// connection
//   .authenticate()
//   .then(() => {
//     console.info('INFO - Database connected.')
//   })
//   .catch(err => {
//     console.error('ERROR - Unable to connect to the database:', err)
//   })
>>>>>>> tested user q&m. tested product q. unable to auth before testing product m

export default connection
