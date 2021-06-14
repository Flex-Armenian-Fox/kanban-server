'use strict';
const {
  Model
} = require('sequelize');
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
    due_date: DataTypes.STRING,
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
    sequelize,
    modelName: 'Task',
  });
  return Task;
};