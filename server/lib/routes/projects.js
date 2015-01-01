var Project = require('./../models/project');
var Task = require('./../models/task');
exports.addRoutes = function (app, config) {

  app.get('/projectsinfo', function(req,res){
      Project.byUser(req.user._id, function(projects){
          res.json(200, projects );
      });
  });

  app.get('/projectsinfo/:projectId', function(req,res){
    Project.byId(req.params.projectId, function(project){
      res.json(200, project);
    })
  });

  app.get('/projects/:projectId/productbacklog', function(req,res){
    Task.all({}, function(tasks){
      res.json(200, tasks);
    })
  });

};