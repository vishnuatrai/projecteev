"use strict";
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    ProjectId: { type: DataTypes.INTEGER, allowNull: false },
    SprintId: { type: DataTypes.INTEGER, allowNull: false },
    state: DataTypes.STRING,
    name: { type: DataTypes.STRING, allowNull: false },
    ProductBacklogId: { type: DataTypes.INTEGER, allowNull: false },
    desc: DataTypes.TEXT,
    estimation: DataTypes.INTEGER,
    remaining: DataTypes.INTEGER,
    UserId: { type: DataTypes.INTEGER, allowNull: false }
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