var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync(__dirname + '/server/cert/privatekey.pem').toString();
var certificate = fs.readFileSync(__dirname + '/server/cert/certificate.pem').toString();
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var config = require('./server/config.js');
var passport = require('passport');
var security = require('./server/lib/security');
var xsrf = require('./server/lib/xsrf');
var protectJSON = require('./server/lib/protectJSON');
require('express-namespace');

var app = express();
var secureServer = https.createServer(credentials, app);
var server = http.createServer(app);

var models = require('./server/models');

app.use(protectJSON);
app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
app.use(express.cookieSession());                           // Store the session in the (secret) cookie
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

require('./server/routes/static').addRoutes(app, config);
require('./server/routes/admin').addRoutes(app);
require('./server/routes/projects').addRoutes(app);
require('./server/routes/tasks').addRoutes(app);
require('./server/routes/users').addRoutes(app);
require('./server/routes/security').addRoutes(app, security);
require('./server/routes/appFile').addRoutes(app, config);

// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Start up the server on the port specified in the config
server.listen(config.server.listenPort, '0.0.0.0', 511, function() {
  // // Once the server is listening we automatically open up a browser
  var open = require('open');
  open('http://localhost:' + config.server.listenPort + '/');
});
console.log('Angular App Server - listening on port: ' + config.server.listenPort);
secureServer.listen(config.server.securePort);
console.log('Angular App Server - listening on secure port: ' + config.server.securePort);

console.log(app.routes);
