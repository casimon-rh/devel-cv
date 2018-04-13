module.exports = (sequelize, DataTypes) => {
  var Information = sequelize.define('Information', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    categoryId: DataTypes.INT
  }, {});
  Information.associate = (models) => {
    Information.belongsTo(models.Categories,{
      foreignKey:'categoryId'
    })
  };
  return Information;
};