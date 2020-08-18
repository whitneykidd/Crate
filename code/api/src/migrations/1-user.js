// a migration for a user. Each attribute has specific options defined.
// Mostly datatypes of each attribute/column. 
// ex: name = string
module.exports = {
  // the up function defines what happens when we run the migration
  // this function is actually named up and has queryInterface and Sequelize as arguments
  up: (queryInterface, Sequelize) => {
    // is quertInterface already an object that has a method '.createTable' or is this standard JS where its another function (ruby method)
    // it is named appropriately. this will create a users table
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
      // I'm curious if there is a place where password security comes in
      // seeds uses bcrypt and salt
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // if down is called, simply drop the table
  // how do you specify if you want to run the 'down' portion?
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
}
