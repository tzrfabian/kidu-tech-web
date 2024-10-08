'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile);
      User.hasMany(models.UserCourse);
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'email sudah tersedia!'
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);

        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};