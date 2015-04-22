"use strict";
module.exports = function(sequelize, DataTypes) {
  var SprintBacklog = sequelize.define("SprintBacklog", {
    SprintId: { type: DataTypes.INTEGER, allowNull: false },
    ProductBacklogId: { type: DataTypes.INTEGER, allowNull: false }
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