module.exports = {
  up: (queryInterface, Sequelize) => {
    // subscriptions
    // must belong to: user 
    // must belong to: crate 
    // created/updated
    return queryInterface.createTable('subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        // Sequalize is a promise-based ORM for dbs like postgres
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      crateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crates',
          key: 'id'
        },
        allowNull: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subscriptions');
  }
}
