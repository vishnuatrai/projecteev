var Project = require('./../models/project');
var ProductBacklog = require('./../models/product_backlog');
var Sprint = require('./../models/sprint');
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
    ProductBacklog.all({ projectId: req.params.projectId }, function(product_backlogs){
      res.json(200, product_backlogs);
    })
  });

  app.post('/projects/:projectId/productbacklog', function(req,res){
    var params = req.body;
    params['projectId'] = req.params.projectId;
    ProductBacklog.createOrUpdate(params, function(product_backlog){
      res.json(200, product_backlog);
    })
  });

  app.get('/projects/:projectId/productbacklog/:productBacklogId', function(req,res){
    ProductBacklog.byId(req.params.productBacklogId, function(product_backlog){
      res.json(200, product_backlog);
    })
  });

  app.delete('/projects/:projectId/productbacklog/:productBacklogId', function(req,res){
    ProductBacklog.delete(req.params.productBacklogId, function(){
      res.json(200, {});
    })
  });

  app.get('/projects/:projectId/sprints', function(req,res){
    Sprint.all({ projectId: req.params.projectId }, function(sprints){
      res.json(200, sprints);
    })
  });

  app.post('/projects/:projectId/sprints', function(req,res){
    var params = req.body;
    params['projectId'] = req.params.projectId;
    Sprint.createOrUpdate(params, function(sprint){
      res.json(200, sprint);
    })
  });

  app.get('/projects/:projectId/sprints/:sprintId', function(req,res){
    Sprint.byId(req.params.sprintId, function(sprint){
      res.json(200, sprint);
    })
  });

  app.delete('/projects/:projectId/sprints/:sprintId', function(req,res){
    Sprint.delete(req.params.sprintId, function(){
      res.json(200, {});
    })
  });

  app.get('/projects/:projectId/sprints/:sprintId/tasks', function(req,res){
    Task.all({ sprintId: req.params.sprintId }, function(tasks){
      res.json(200, tasks);
    })
  });

  app.get('/projects/:projectId/sprints/:sprintId/tasks/:taskId', function(req,res){
    Task.byId(req.params.taskId, function(task){
      res.json(200, task);
    })
  });

  app.post('/projects/:projectId/sprints/:sprintId/tasks', function(req,res){
    var params = req.body;
    Task.createOrUpdate(params, function(task){
      res.json(200, task);
    })
  });

};