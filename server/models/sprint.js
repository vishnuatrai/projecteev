"use strict";
module.exports = function(sequelize, DataTypes) {
  var Sprint = sequelize.define("Sprint", {
    name: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
          Sprint.belongsTo(models.Project);
          Sprint.hasMany(models.Task);
      }
    }
  });
  return Sprint;
};