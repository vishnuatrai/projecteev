//"use strict";
//var fs = require('fs');
//module.exports = function(app) {
//    var routePath = './routes';
//    fs.readdirSync(routePath).forEach(function(file) {
//        var route = routePath + file.substr(0, file.indexOf('.'));
//        require(route)(app);
//    });
//};

module.exports = function(app) {
    require('./static').addRoutes(app);
    require('./admin').addRoutes(app);
    require('./projects').addRoutes(app);
    require('./tasks').addRoutes(app);
    require('./users').addRoutes(app);
    require('./security').addRoutes(app);
    require('./appFile').addRoutes(app);
};
