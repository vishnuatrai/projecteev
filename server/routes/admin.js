var models = require('../models');
exports.addRoutes = function (app) {

    app.get('/admin/users', function(req,res){
        models.User.findAll({}, function(users){
            res.json(200, users );
        })
    });

    app.get('/admin/users/:userId', function(req,res){
        models.User.find({ where: { id: req.params.userId }}).then(function(user){ res.json(200, user); });
    });

    app.post('/admin/users', function(req,res){
        models.User.findOrInitialize({ where: { id: req.body.id } })
            .then(function(result){
                result[0].updateAttributes( req.body )
            })
            .then(function(user){ res.json(200, user); })
    });

    app.delete('/admin/users/:userId', function(req,res){
        models.User.destroy({where: { id: req.params.userId}}).then(function(result){
            res.json(200, {});
        })
    });

    app.get('/admin/projects/users', function(req,res){
        models.User.findAll({}, function(users){
            res.json(200, users );
        })
    });

    app.get('/admin/projects', function(req,res){
        models.Project.findAll({}).then(function(projects){ res.json(200, projects ); })
    });

    app.get('/admin/projects/:projectId', function(req,res){
        models.Project.find({where: { id: req.params.projectId } }).then(function(project){ res.json(200, project); })
    });


    app.post('/admin/projects', function(req,res){
        models.Project.findOrInitialize({ where: { id: req.body.id } })
            .then(function(result){
                result[0].updateAttributes( req.body )
            })
            .then(function(project){ res.json(200, project); })
    });

    app.delete('/admin/projects/:projectId', function(req,res){
        models.Project.destroy({where: { id: req.params.projectId }}).then(function(result){
            res.json(200, {});
        })
    });



};