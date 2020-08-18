'use strict'

// Product
module.exports = function(sequelize, DataTypes) {
  // Product
  // name 
  // slug 
  // description
  // type 
  // gender 
  // image

  return sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  })
}