var models = require('../models');

var attrs = { firstName: 'Vishnu Kumar', lastName: 'sharma', email: 'vishnu.sharma@gmail.com',
              password: 'password', admin: true };
models.User.create( attrs ).then(function(record){ console.log('User created..');console.log(record.dataValues); });
