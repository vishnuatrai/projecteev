var User = require('./../models/user');
exports.addRoutes = function (app, config) {

    app.get('/users/:email', function(req,res){
        User.byEmail(req.params.email, function(user){
            res.json(200, user);
        })
    });

};