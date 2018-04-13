module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: DataTypes.STRING
  }, {});
  Category.associate = (models) => {
    Category.hasMany(models.Informations,{
      foreignKey:'categoryId',
      as: 'categoryInformation'
    });
  };
  return Category;
};