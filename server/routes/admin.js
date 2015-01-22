var models = require('../models');
exports.addRoutes = function (app, config) {

    app.get('/admin/users', function(req,res){
        models.User.findAll({}, function(users){
            res.json(200, users );
        })
    });

    app.get('/admin/users/:userId', function(req,res){
        models.User.find({ id: req.params.userId } , function(user){
            res.json(200, user);
        })
    });

    app.post('/admin/users', function(req,res){
        User.createOrUpdate(req.body, function(user){
            res.json(200, user);
        })
    });

    app.delete('/admin/users/:userId', function(req,res){
        models.User.delete(req.params.userId, function(){
            res.json(200, {});
        })
    });

    app.get('/admin/projects/users', function(req,res){
        models.User.all({}, function(users){
            res.json(200, users );
        })
    });

    app.get('/admin/projects', function(req,res){
        models.Project.all({}, function(users){
            res.json(200, users );
        })
    });

    app.post('/admin/projects', function(req,res){
        models.Project.createOrUpdate(req.body, function(project){
            res.json(200, project);
        })
    });

    app.delete('/admin/projects/:projectId', function(req,res){
        models.Project.delete(req.params.projectId, function(){
            res.json(200, {});
        })
    });



};