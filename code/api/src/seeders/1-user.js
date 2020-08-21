// code should be executed in strict mode.
// ex: in strict mode you cant use undeclared variables
'use strict';
// 2 users in the seed file, user and admin

const bcrypt = require('bcrypt');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@crate.com',
      // this is where password is encrypted
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        style: 'classy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The User 1',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        style: 'casual',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
  // does this also delete its dependants? - subscriptions 
  // is that not a problem?
    return (
      queryInterface.bulkDelete('subscriptions', null, {}),
      queryInterface.bulkDelete('users', null, {})
    )
  }
}
