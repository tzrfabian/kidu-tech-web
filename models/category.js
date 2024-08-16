'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Course);
    }

    static async getAllCategoriesandCount() {
      let data = await Category.findAll({
                attributes: [
                'id', 
                'name',
                [sequelize.fn('COUNT', sequelize.col('Courses.CategoryId')), 'JumlahCourse']
            ],
            include: [
                {
                    model: sequelize.models.Course,
                    attributes: []
                }
            ],
            group: ['Category.id'],
            order: [[sequelize.literal('"JumlahCourse"'), 'DESC']],
            raw: true
            });
      return data;
    }

    get callName(){
      return 'Kategori' + this.name;
    }
    
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};