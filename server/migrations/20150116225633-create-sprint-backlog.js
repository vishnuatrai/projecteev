"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("SprintBacklogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sprintId: {
        type: DataTypes.INTEGER
      },
      productBacklogId: {
        type: DataTypes.INTEGER
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
    migration.dropTable("SprintBacklogs").done(done);
  }
};