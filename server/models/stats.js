module.exports = (sequelize, DataTypes) => {
  const Stats = sequelize.define('Stats', {
    lang: {
      type: DataTypes.STRING,
      allowNull: false
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    sourceId:DataTypes.INTEGER,
  }, {});
  Stats.associate = (models) => {
    Stats.belongsTo(models.Source, {
      foreignKey: 'sourceId'
    });
  };
  return Stats;
};