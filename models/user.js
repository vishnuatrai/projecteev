"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false, unique: true,
             validate: { isEmail: { msg: 'Email must be valid.' } }
            },
    password: { type: DataTypes.STRING, allowNull: false,
        validate: { len: { args: [ 8, 24 ], msg: 'Password must be between 8 to 24 characters.' } }
    },
    admin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
          User.hasMany(models.ProjectTeamMember)
          User.hasMany(models.Project, { through: 'ProjectTeamMembers' })
          User.hasMany(models.Task)
      }
    }
  });
  return User;
};