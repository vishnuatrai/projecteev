"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
          User.hasMany(models.ProjectTeamMember)
          User.hasMany(models.Project, { through: 'ProjectTeamMember' })
      }
    }
  });
  return User;
};