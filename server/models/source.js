module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('Source', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Source.associate = (models)=> {
    Source.hasMany(models.Stats,{
      foreignKey:'sourceId',
      as: 'sourceStats'
    });
  };
  return Source;
};