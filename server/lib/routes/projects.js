var Project = require('./../models/project');
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

};