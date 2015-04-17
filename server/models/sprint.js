"use strict";
module.exports = function(sequelize, DataTypes) {
  var Sprint = sequelize.define("Sprint", {
    name: { type: DataTypes.STRING, allowNull: false },
    projectId: { type: DataTypes.INTEGER, allowNull: false },
    capacity: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
          Sprint.belongsTo(models.Project);
          Sprint.hasMany(models.Task);
          Sprint.hasMany(models.SprintBacklog);
          Sprint.hasMany(models.ProductBacklog, { through: 'SprintBacklogs'} )
      }
    }
  });
  return Sprint;
};