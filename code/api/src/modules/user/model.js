'use strict'

// User
module.exports = function(sequelize, DataTypes) {
// User model 
// name
// email 
// password 
// role 
// has many Subscriptions
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
    },
    // sequelize is the ORM. this formats style into the correct datatype
    style: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}