"use strict";
module.exports = function(sequelize, DataTypes) {
  var ProjectTeamMember = sequelize.define("ProjectTeamMember", {
    ProjectId: { type: DataTypes.INTEGER, allowNull: false },
    UserId: { type: DataTypes.INTEGER, allowNull: false }
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