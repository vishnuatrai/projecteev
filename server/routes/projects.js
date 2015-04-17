var models = require('../models');
exports.addRoutes = function (app) {

  app.get('/projectsinfo', function(req,res){
    models.Project.findAll({ where: { productOwner: req.user.id } }).then(function(projects){
      res.json(200, projects );
    });
  });

  app.get('/projectsinfo/:projectId', function(req,res){
    models.Project.find({ where: { id: req.params.projectId }}).then(function(project){
      res.json(200, project);
    })
  });

  app.get('/projects/:projectId/team_members', function(req,res){
      models.User.findAll( { include: [{model: models.ProjectTeamMember, attributes: [], where: { projectId: req.params.projectId }}]} ).then(function(users){
          res.json(200, users);
      })
  });

  app.get('/projects/:projectId/productbacklog', function(req,res){
    models.ProductBacklog.findAll({ where: { projectId: req.params.projectId }}).then(function(product_backlogs){
      res.json(200, product_backlogs);
    })
  });

  app.post('/projects/:projectId/productbacklog', function(req,res){
    models.ProductBacklog.findOrInitialize({ where: { id: req.body.id } })
      .then(function(result){ result[0].updateAttributes( req.body ) })
      .then(function(product_backlog){ res.json(200, product_backlog); })
  });

  app.get('/projects/:projectId/productbacklog/:productBacklogId', function(req,res){
    models.ProductBacklog.find({where: { id: req.params.productBacklogId } }).then(function(product_backlog){
      res.json(200, product_backlog);
    })
  });

  app.delete('/projects/:projectId/productbacklog/:productBacklogId', function(req,res){
    models.ProductBacklog.destroy({where: { id: req.params.productBacklogId }}).then(function(result){
      res.json(200, {});
    })
  });

  app.get('/projects/:projectId/sprints', function(req,res){
    models.Sprint.findAll({ where: { projectId: req.params.projectId } }).then(function(sprints){
      res.json(200, sprints);
    })
  });

  app.post('/projects/:projectId/sprints', function(req,res){
    models.Sprint.findOrInitialize({ where: { id: req.body.id } })
      .then(function(result){
            result[0].updateAttributes( req.body).then( function(sprint){ sprint.setSprintBacklogs(req.body['sprintBacklog']); });
        })
      .then(function(sprint){ res.json(200, sprint); })
  });

  app.get('/projects/:projectId/sprints/:sprintId', function(req,res){
    models.Sprint.find({ where: { id: req.params.sprintId } }).then(function(sprint){
      res.json(200, sprint);
    })
  });

  app.delete('/projects/:projectId/sprints/:sprintId', function(req,res){
    models.Sprint.destroy({where: { id: req.params.sprintId}}).then(function(result){
      res.json(200, {});
    })
  });

  app.get('/projects/:projectId/sprints/:sprintId/sprint_backlogs', function(req,res){
    models.ProductBacklog.findAll( { include: [{ model: models.SprintBacklog, attributes: [], where: { sprintId: req.params.sprintId }}]} ).then(function(backlogs){
      res.json(200, backlogs);
    })
  });

  app.get('/projects/:projectId/sprints/:sprintId/tasks', function(req,res){
      models.Task.findAll({ where: { sprintId: req.params.sprintId } }).then(function(tasks){
      res.json(200, tasks);
    })
  });

  app.get('/projects/:projectId/sprints/:sprintId/tasks/:taskId', function(req,res){
      models.Task.find({ where: { id: req.params.taskId } }).then(function(task){
      res.json(200, task);
    })
  });

  app.post('/projects/:projectId/sprints/:sprintId/tasks', function(req,res){
    models.Task.findOrInitialize({ where: { id: req.body.id } })
      .then(function(result){ result[0].updateAttributes( req.body ) })
      .then(function(task){ res.json(200, task); })
  });

};