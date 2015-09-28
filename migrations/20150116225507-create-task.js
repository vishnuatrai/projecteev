'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectId: {
        type: Sequelize.INTEGER
      },
      SprintId: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      ProductBacklogId: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.TEXT
      },
      estimation: {
        type: Sequelize.INTEGER
      },
      remaining: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tasks');
  }
};