var Project = require('./../models/project');
exports.addRoutes = function (app, config) {

  app.get('/projectsinfo', function(req,res){
      Project.byUser(req.user._id, function(users){
          res.json(200, users );
      })
  });

};