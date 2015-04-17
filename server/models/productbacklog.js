"use strict";
module.exports = function(sequelize, DataTypes) {
  var ProductBacklog = sequelize.define("ProductBacklog", {
    name: { type: DataTypes.STRING, allowNull: false },
    desc: DataTypes.TEXT,
    projectId: { type: DataTypes.INTEGER, allowNull: false },
    priority: DataTypes.INTEGER,
    estimation: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          ProductBacklog.belongsTo(models.Project);
          ProductBacklog.hasMany(models.SprintBacklog);
          ProductBacklog.hasMany(models.Sprint, { through: 'SprintBacklogs' })
      }
    }
  });
  return ProductBacklog;
};