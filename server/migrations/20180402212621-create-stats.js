module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lang: {
        type: Sequelize.STRING,
        allowNull: false
      },
      percentage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sourceId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Sources',
          key: 'id',
          as: 'sourceId',
        }
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Stats')
};