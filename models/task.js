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
      // define association here
      this.belongsTo(models.User, {foreignKey: "UserId"})
    }
  };
  Task.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Task name may not be empty"},
        notEmpty: {msg: "Task name may not be empty"}
      }
    },
    deadline: {
      type: DataTypes.DATE,
    },
    category: {
      type: DataTypes.STRING,
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeValidate: task => {
        if (!task.deadline) {task.deadline = null}
        if (!task.deadline) {task.deadline = null}
        console.log(task.deadline)
      }
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};