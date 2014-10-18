var Task = require('./../models/task');
exports.addRoutes = function (app, config) {

  app.get('/tasks', function(req,res){
      Task.byUser(req.user._id, function(users){
          res.json(200, users );
      })
  });

};