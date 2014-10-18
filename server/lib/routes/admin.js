var User = require('./../models/user');
var Project = require('./../models/project');
exports.addRoutes = function (app, config) {

    app.get('/admin/users', function(req,res){
        User.all({}, function(users){
            res.json(200, users );
        })
    });

    app.get('/admin/projects', function(req,res){
        Project.all({}, function(users){
            res.json(200, users );
        })
    });

};