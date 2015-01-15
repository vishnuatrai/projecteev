"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {

      migration.createTable(
          'users',
          {
              id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
              },
              createdAt: {
                  type: DataTypes.DATE
              },
              updatedAt: {
                  type: DataTypes.DATE
              },
              attr1: DataTypes.STRING,
              attr2: DataTypes.INTEGER,
              attr3: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false,
                  allowNull: false
              }
          }
      )

    done();
  },

  down: function(migration, DataTypes, done) {

    migration.dropTable('users')
    done();
  }
};
