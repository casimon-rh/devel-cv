module.exports = (sequelize, DataTypes) => {
  var Information = sequelize.define('Information', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  Information.associate = (models) => {
    Information.belongsTo(models.Category,{
      foreignKey:'categoryId'
    })
  };
  return Information;
};