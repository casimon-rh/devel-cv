module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Information', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      img: {
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
      categoryId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Categories',
          key: 'id',
          as: 'categoryId',
        }
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Information')
};