module.exports = (sequelize, DataTypes) => {
  const Stats = sequelize.define('Stats', {
    lang: {
      type: DataTypes.STRING,
      allowNull: false
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {});
  Stats.associate = function (models) {
    Stats.belongsTo(models.Source, {
      foreignKey: 'sourceId'
    });
  };
  return Stats;
};