// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from './database'

const models = {
  // models is made up of all db tables
  // imported from their respective locations
  User: databaseConnection.import('../modules/user/model'),
  Product: databaseConnection.import('../modules/product/model'),
  Crate: databaseConnection.import('../modules/crate/model'),
  Subscription: databaseConnection.import('../modules/subscription/model')
}

Object.keys(models).forEach(modelName => {
  // feels like its foreign key related
  // associate ~= relationship?
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

// if we are calling sequelize I imagine its graphql
// if we call graphql I imaigne its sequelize
models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
