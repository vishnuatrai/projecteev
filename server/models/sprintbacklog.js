"use strict";
module.exports = function(sequelize, DataTypes) {
  var SprintBacklog = sequelize.define("SprintBacklog", {
    sprintId: DataTypes.INTEGER,
    productBacklogsId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SprintBacklog;
};