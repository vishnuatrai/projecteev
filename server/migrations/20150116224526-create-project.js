"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Projects", {
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
      productOwner: {
        type: DataTypes.INTEGER
      },
      scrumMaster: {
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
    migration.dropTable("Projects").done(done);
  }
};