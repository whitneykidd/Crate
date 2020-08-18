module.exports = {
  up: (queryInterface, Sequelize) => {
    // crate
    // name: string
    // description: text
    // createdAt/updatedAt
    return queryInterface.createTable('crates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        // Sequalize is a promise-based ORM for dbs like postgres
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('crates');
  }
}
