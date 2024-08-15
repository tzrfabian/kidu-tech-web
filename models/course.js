'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Category);
      Course.hasMany(models.Content);
      Course.hasMany(models.UserCourse);
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    courseImg: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};