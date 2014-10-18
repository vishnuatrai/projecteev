var User = require('./../models/user');
exports.addRoutes = function (app, config) {

  app.get('/users', function(req,res){
      User.all({}, function(users){
          res.json(200, users );
      })
  });

};