"use strict";
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    projectId: DataTypes.INTEGER,
    sprintId: DataTypes.INTEGER,
    state: DataTypes.STRING,
    name: DataTypes.STRING,
    productBacklogId: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    estimation: DataTypes.INTEGER,
    remaining: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          Task.belongsTo(models.User);
          Task.belongsTo(models.Project);
          Task.belongsTo(models.Sprint);
      }
    }
  });
  return Task;
};