'use strict'

module.exports = function(sequelize, DataTypes) {
  // Similar setup to a migration, but this creates a model
  // no up or down
  // Capitalized variables are models
  // Crate 
  // name: string 
  // description: text
  // Crates have many Subscriptions

  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  Crate.associate = function(models) {
    // Subscription model belongs to Crates
    Crate.hasMany(models.Subscription)
  }

  return Crate
}