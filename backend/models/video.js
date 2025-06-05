'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Video.belongsToMany(models.Athlete, { through: models.VideoAthlete, foreignKey: 'videoId', otherKey: 'athleteId', as: 'Athletes' });
      Video.hasMany(models.PerformanceMetric, { foreignKey: 'videoId', as: 'PerformanceMetrics' });
    }
  }
  Video.init({
    filename: DataTypes.STRING,
    originalname: DataTypes.STRING,
    uploadDate: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};