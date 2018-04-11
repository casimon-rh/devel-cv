module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('Source', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Source.associate = function (models) {
    Source.hasMany(models.Stats,{
      foreignKey:'sourceId',
      as: 'sourceStats'
    });
  };
  return Source;
};