"use strict";
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    projectId: { type: DataTypes.INTEGER, allowNull: false },
    sprintId: { type: DataTypes.INTEGER, allowNull: false },
    state: DataTypes.STRING,
    name: { type: DataTypes.STRING, allowNull: false },
    productBacklogId: { type: DataTypes.INTEGER, allowNull: false },
    desc: DataTypes.TEXT,
    estimation: DataTypes.INTEGER,
    remaining: DataTypes.INTEGER,
    userId: { type: DataTypes.INTEGER, allowNull: false }
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