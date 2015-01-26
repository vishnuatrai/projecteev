"use strict";
module.exports = function(sequelize, DataTypes) {
  var ProjectTeamMember = sequelize.define("ProjectTeamMember", {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProjectTeamMember;
};