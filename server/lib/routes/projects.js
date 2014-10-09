exports.addRoutes = function (app, config) {

    app.get('/projectsinfo', function(req,res){
        res.json( [{ }] );
    });
};