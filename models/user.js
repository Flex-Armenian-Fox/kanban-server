'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Must be in email format'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [5,40],
          msg: 'Password must be between 5-40 characters'
        }
      }
    }
  }, {
    hooks: {
    beforeCreate: (user, options) => {
      const hashedPw = hashPassword(user.password)
      user.password = hashedPw
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};