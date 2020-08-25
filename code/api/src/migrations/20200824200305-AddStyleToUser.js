'use strict';

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
