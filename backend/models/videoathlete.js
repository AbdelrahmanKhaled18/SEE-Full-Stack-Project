'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VideoAthlete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VideoAthlete.belongsTo(models.Video, { foreignKey: 'videoId' });
      VideoAthlete.belongsTo(models.Athlete, { foreignKey: 'athleteId' });
    }
  }
  VideoAthlete.init({
    videoId: DataTypes.INTEGER,
    athleteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VideoAthlete',
  });
  return VideoAthlete;
};