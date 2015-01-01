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
    Task.all({ project_id: req.params.projectId }, function(tasks){
      res.json(200, tasks);
    })
  });

  app.post('/projects/:projectId/productbacklog', function(req,res){
    var params = req.body;
    params['project_id'] = req.params.projectId;
    Task.createOrUpdate(params, function(task){
      res.json(200, task);
    })
  });

  app.get('/projects/:projectId/productbacklog/:taskId', function(req,res){
    Task.byId(req.params.taskId, function(task){
      res.json(200, task);
    })
  });

  app.delete('/projects/:projectId/productbacklog/:taskId', function(req,res){
    Task.delete(req.params.taskId, function(){
      res.json(200, {});
    })
  });

};