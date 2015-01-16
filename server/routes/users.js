var models = require('../models');
exports.addRoutes = function (app, config) {

    app.get('/users/:email', function(req,res){
        User.byEmail(req.params.email, function(user){
            res.json(200, user);
        })
    });

    app.get('/users', function(req,res){
        User.all({}, function(users){
            res.json(200, users);
        })
    });
};