var models = require('../models');
exports.addRoutes = function (app) {

    app.get('/users/:email', function(req,res){
        models.User.find( { email: req.params.email }).then(function(user){ res.json(200, user); })
    });

    app.get('/users', function(req,res){
        models.User.findAll({}).then(function(users){ res.json(200, users); });
    });
};