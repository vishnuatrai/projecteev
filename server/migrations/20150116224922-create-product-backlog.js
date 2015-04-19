"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("ProductBacklogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      desc: {
        type: DataTypes.TEXT
      },
      ProjectId: {
        type: DataTypes.INTEGER
      },
      priority: {
        type: DataTypes.INTEGER
      },
      estimation: {
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
    migration.dropTable("ProductBacklogs").done(done);
  }
};