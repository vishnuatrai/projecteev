"use strict";
module.exports = function(sequelize, DataTypes) {
  var ProjectTeamMember = sequelize.define("ProjectTeamMember", {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          ProjectTeamMember.belongsTo(models.Project);
          ProjectTeamMember.belongsTo(models.User);
      }
    }
  });
  return ProjectTeamMember;
};