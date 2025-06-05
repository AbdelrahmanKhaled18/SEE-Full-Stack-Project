'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Athlete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Athlete.belongsToMany(models.Video, { through: models.VideoAthlete, foreignKey: 'athleteId', otherKey: 'videoId', as: 'Videos' });
      Athlete.hasMany(models.PerformanceMetric, { foreignKey: 'athleteId', as: 'PerformanceMetrics' });
    }
  }
  Athlete.init({
    name: DataTypes.STRING,
    sport: DataTypes.STRING,
    age: DataTypes.INTEGER,
    uniqueId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Athlete',
  });
  return Athlete;
};