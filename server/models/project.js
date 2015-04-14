"use strict";
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    productOwner: DataTypes.INTEGER,
    scrumMaster: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          Project.hasMany(models.ProjectTeamMember)
          Project.hasMany(models.User, { through: 'ProjectTeamMember'} )
      }
    }
  });
  return Project;
};