/* code-annotations-wk
  This file uses sequelize to define user model,
  field names, data types, relationships
*/
'use strict'

// User
/* code-annotations-wk
  Will likely add user column here: 
  styleSummary: { type: DataTypes.TEXT }
*/
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

/* code-annotations-wk
  Relationship to other models - a user has many subscriptions
*/
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}