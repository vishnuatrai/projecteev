var models = require('../models');
exports.addRoutes = function (app) {

  app.get('/tasks', function(req,res){
      models.Task.findAll({ where: { UserId: req.params.userId} }).then(function(tasks){
          res.json(200, tasks);
      });
  });

  app.delete('/tasks/:taskId', function(req,res){
      models.Task.destroy({where: { id: req.params.taskId}}).then(function(result){
      res.json(200, {});
    });
  });

};