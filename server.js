var fs = require('fs');
var privateKey  = fs.readFileSync(__dirname + '/cert/privatekey.pem').toString();
var certificate = fs.readFileSync(__dirname + '/cert/certificate.pem').toString();
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var compression = require('compression')

var config = require('./config.js');
var passport = require('passport');
var security = require('./lib/security');
var xsrf = require('./lib/xsrf');
require('express-namespace');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(favicon(config.server.distFolder + '/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(passport.initialize());                             // Initialize PassportJS
app.use(passport.session());                                // Use Passport's session authentication strategy - this stores the logged in user in the session and will now run on any request
app.use(xsrf);                                            // Add XSRF checks to the request
security.initialize(); // Add a Mongo strategy for handling the authentication


app.use(function(req, res, next) {
    if ( req.user ) {
        console.log('Current User:', req.user.firstName, req.user.lastName);
    } else {
        console.log('Unauthenticated');
    }
    next();
});

// For postgresql sequelize adaptor middleware
app.use(function(req, res, next) {

    if(req.body['userId']){
        req.body['UserId'] = req.body['userId']
    }

    if(req.body['projectId']){
        req.body['ProjectId'] = req.body['projectId']
    }

    if(req.body['sprintId']){
        req.body['SprintId'] = req.body['sprintId']
    }

    if(req.body['productBacklogId']){
        req.body['ProductBacklogId'] = req.body['productBacklogId']
    }

    if(req.body['taskId']){
        req.body['TaskId'] = req.body['taskId']
    }

    next();
});
// end of middleware


// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

require('./routes')(app);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
