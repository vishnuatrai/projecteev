"use strict";
var fs = require('fs');
module.exports = function(app) {
    var routePath = './routes';
    fs.readdirSync(routePath).forEach(function(file) {
        var route = routePath + file.substr(0, file.indexOf('.'));
        require(route)(app);
    });
};
