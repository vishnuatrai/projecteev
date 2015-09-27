'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [{
      firstName: 'Vishnu Kumar', 
      lastName: 'sharma', 
      email: 'vishnu.sharma@gmail.com',
      password: 'password', 
      admin: true
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
