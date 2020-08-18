module.exports = {
  up: (queryInterface, Sequelize) => {
  // migration for products. each product will have:
  // id
  // name: string
  // slug: string (slug is a description in one unit)
  // description: text
  // type: integer ---> not sure what type would be
  // gender: integer 
  // image: text
  // createdAt / updatedAt
    return queryInterface.createTable('products', {
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
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.INTEGER
      },
    gender: {
        type: Sequelize.INTEGER
      },
      image: {
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
    return queryInterface.dropTable('products');
  }
}
