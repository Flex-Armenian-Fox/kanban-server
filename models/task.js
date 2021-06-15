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
    description: DataTypes.STRING,
    deadline: {
      type: DataTypes.DATE,
      validate:{
        dateCheck(taskDate) {
          if (taskDate) {
            let taskDate = taskDate.getTime()
            let date = new Date()
            date = new Date(date.toISOString().slice(0,10).getTime())
            if (taskDate < date) throw {msg: "Deadline must be after today"}
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        categories(cat){
          if (cat != "backlog" && cat != "todo" && cat != "doing" && cat != "done") throw {msg: "Invalid Category"}
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeValidate: task => {
        if (!task.deadline) {task.deadline = null}
        if (!task.deadline) {task.deadline = null}
        
      }
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};