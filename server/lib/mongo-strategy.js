var config = require('./../config');
var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rest = require('request');
var models  = require('../models');
var User = models.User;

function MongoDBStrategy() {

  // Call the super constructor - passing in our user verification function
  // We use the email field for the username
  LocalStrategy.call(this, { usernameField: 'email' }, this.verifyUser.bind(this));

  // Serialize the user into a string (id) for storing in the session
  passport.serializeUser(function(user, done) {
    done(null, user.id); // Remember that MongoDB has this weird { _id: { $oid: 1234567 } } structure
  });

  // Deserialize the user from a string (id) into a user (via a cll to the DB)
  passport.deserializeUser(this.get.bind(this));

  // We want this strategy to have a nice name for use by passport, e.g. app.post('/login', passport.authenticate('mongo'));
  this.name = MongoDBStrategy.name;
}

// MongoDBStrategy inherits from LocalStrategy
util.inherits(MongoDBStrategy, LocalStrategy);

MongoDBStrategy.name = "mongo";

// Get a user by id
MongoDBStrategy.prototype.get = function(id, done) {
    User.find({ where: { id: id } }).then(function(user){ done(null, user.dataValues) });
};

// Check whether the user passed in is a valid one
MongoDBStrategy.prototype.verifyUser = function(email, password, done) {
    User.find({ where: { email: email } }).then( function(user){ user;
      done(null, user.dataValues);
    })
};

module.exports = MongoDBStrategy;

// TODO: Store hashes rather than passwords... node-bcrypt requires python to be installed :-(
/*var bcrypt = require('bcrypt');
function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}
*/