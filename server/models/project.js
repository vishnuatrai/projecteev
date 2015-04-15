"use strict";
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name: { type: DataTypes.STRING, allowNull: false },
    desc: DataTypes.TEXT,
    productOwner: DataTypes.INTEGER,
    scrumMaster: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          Project.hasMany(models.ProjectTeamMember)
          Project.hasMany(models.User, { through: 'ProjectTeamMembers'} )
          Project.hasMany(models.ProductBacklog)
          Project.hasMany(models.Sprint)
          Project.hasMany(models.Task)
      }
    }
  });
  return Project;
};