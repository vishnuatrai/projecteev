"use strict";
module.exports = function(sequelize, DataTypes) {
  var ProductBacklog = sequelize.define("ProductBacklog", {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    projectId: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    estimation: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          ProductBacklog.belongsTo(models.Project);
          ProductBacklog.hasMany(models.SprintBacklog);
      }
    }
  });
  return ProductBacklog;
};