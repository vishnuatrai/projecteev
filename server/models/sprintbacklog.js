"use strict";
module.exports = function(sequelize, DataTypes) {
  var SprintBacklog = sequelize.define("SprintBacklog", {
    sprintId: { type: DataTypes.INTEGER, allowNull: false },
    productBacklogId: { type: DataTypes.INTEGER, allowNull: false }
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