"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Sprints", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      projectId: {
        type: DataTypes.INTEGER
      },
      capacity: {
        type: DataTypes.INTEGER
      },
      start: {
        type: DataTypes.DATE
      },
      end: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Sprints").done(done);
  }
};