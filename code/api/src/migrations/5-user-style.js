'use strict';

// When called this will add column 'style' to users.
// renamed to follow convention
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'style',
      Sequelize.STRING
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'style')
  }
};
