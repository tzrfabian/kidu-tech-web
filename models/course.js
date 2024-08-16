'use strict';
const {
  Model
} = require('sequelize');
const formatDate = require('../helper/formatDate');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Category);
      Course.belongsToMany(models.User, {through: 'UserCourses'});
      Course.hasMany(models.Content);
    }

    get callName(){
      return 'Course ' + this.name;
    }

    get formatCreatedAt() {
      return formatDate(this.createdAt);
    }

  }
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Nama Course tidak boleh kosong'
        },
        notNull: {
          msg: 'Nama Course tidak boleh kosong'
        },
        len: {
          args: [5],
          msg: 'Nama Course minimal sebanyak 5 karakter'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Deskripsi tidak boleh kosong'
        },
        notNull: {
          msg: 'Deskripsi tidak boleh kosong'
        }
      }
    },
    courseImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Silahkan lakukan upload image'
        },
        notNull: {
          msg: 'Silahkan lakukan upload image'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Jumlah durasi tidak boleh kosong'
        },
        notNull: {
          msg: 'Jumlah durasi tidak boleh kosong'
        },
        min: {
          args: 10,
          msg: 'Minimal durasi pembelajaran 10 menit'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Silahkan pilih kategori course'
        },
        notNull: {
          msg: 'Silahkan pilih kategori course'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};