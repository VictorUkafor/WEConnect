module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      categories: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      productsOrServices: {
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('Businesses'),
};
