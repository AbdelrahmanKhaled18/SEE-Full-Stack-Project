'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PerformanceMetric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PerformanceMetric.belongsTo(models.Athlete, { foreignKey: 'athleteId' });
      PerformanceMetric.belongsTo(models.Video, { foreignKey: 'videoId' });
    }
  }
  PerformanceMetric.init({
    metricName: DataTypes.STRING,
    value: DataTypes.FLOAT,
    videoId: DataTypes.INTEGER,
    athleteId: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PerformanceMetric',
  });
  return PerformanceMetric;
};