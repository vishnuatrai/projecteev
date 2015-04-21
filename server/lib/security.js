var express = require('express');
var passport = require('passport');
var MongoStrategy = require('./mongo-strategy');

var filterUser = function(user) {
  if ( user ) {
    return {
      user : {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
      }
    };
  } else {
    return { user: null };
  }
};

var security = {
  initialize: function() {
    passport.use(new MongoStrategy());
  },
  authenticationRequired: function(req, res, next) {
    console.log('authRequired');
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json(401, filterUser(req.user));
    }
  },
  adminRequired: function(req, res, next) {
    console.log('adminRequired');
    if (req.user && req.user.admin ) {
      next();
    } else {
      res.json(401, filterUser(req.user));
    }
  },
  sendCurrentUser: function(req, res, next) {
    res.json(200, filterUser(req.user));
    res.end();
  },
  login: function(req, res, next) {
    function authenticationFailed(err, user, info){
      if (err) { return next(err); }
      if (!user) { return filterUser(user); }
      req.logIn(user, function(err) {
        if ( err ) { return next( res.json(err) ); }
        return res.json(filterUser(user));
      });
    }
    return passport.authenticate(MongoStrategy.name, authenticationFailed)(req, res, next);
  },
  logout: function(req, res, next) {
    req.logout();
    res.send(204);
  }
};

module.exports = security;