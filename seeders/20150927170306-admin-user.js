'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Vishnu Kumar', 
      lastName: 'sharma', 
      email: 'vishnu.sharma@gmail.com',
      password: 'password', 
      admin: true,
      createdAt: '2015-12-12',
      updatedAt: '2015-12-12'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
