'use strict';
const {Model} = require('sequelize');
const getYesterday = require('../helpers/yesterday.js')

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    description: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Due date must be in date format'
        },
        isAfter: {
          args: getYesterday(new Date()),
          msg: 'Due date must be today or after'
        },
        notNull: {
          args: true,
          msg: 'Due date cannot be null'
        }
      }
    },
    category: {
      type: DataTypes.ENUM('backlog', 'todo', 'doing', 'done'),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Category cannot be null'
        },
        isIn: {
          args: [['backlog', 'todo', 'doing', 'done']],
          msg: 'Category must be either "backlog", "todo", "doing", or "done"'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: 'UserId has to be a number'
        },
        notNull: {
          args: true,
          msg: 'UserId cannot be null'
        }
      }
    }
  }, {
    hooks: {
      beforeValidate: (user, options) => {
        if (user.due_date === '') {
          user.due_date = null
        }
      }
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};