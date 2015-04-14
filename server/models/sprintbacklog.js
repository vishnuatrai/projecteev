"use strict";
module.exports = function(sequelize, DataTypes) {
  var SprintBacklog = sequelize.define("SprintBacklog", {
    sprintId: DataTypes.INTEGER,
    productBacklogsId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          SprintBacklog.belongsTo(models.ProductBacklog);
          SprintBacklog.belongsTo(models.Sprint);
      }
    }
  });
  return SprintBacklog;
};