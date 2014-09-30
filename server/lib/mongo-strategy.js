var config = require('./../config');
var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rest = require('request');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ config.security.usersCollection ]);

function MongoDBStrategy() {

  // Call the super constructor - passing in our user verification function
  // We use the email field for the username
  LocalStrategy.call(this, { usernameField: 'email' }, this.verifyUser.bind(this));

  // Serialize the user into a string (id) for storing in the session
  passport.serializeUser(function(user, done) {
    done(null, user._id.$oid); // Remember that MongoDB has this weird { _id: { $oid: 1234567 } } structure
  });

  // Deserialize the user from a string (id) into a user (via a cll to the DB)
  passport.deserializeUser(this.get.bind(this));

  // We want this strategy to have a nice name for use by passport, e.g. app.post('/login', passport.authenticate('mongo'));
  this.name = MongoDBStrategy.name;
}

// MongoDBStrategy inherits from LocalStrategy
util.inherits(MongoDBStrategy, LocalStrategy);

MongoDBStrategy.name = "mongo";

// Query the users collection
MongoDBStrategy.prototype.query = function(query, done) {
    var user = db.users.find(query, function(err, users){
        done(err, [users[0]]);
    });
};

// Get a user by id
MongoDBStrategy.prototype.get = function(id, done) {
    var user = db.users.findOne({_id: mongojs.ObjectId(id) } , function(err, users){
        done(err, [users[0]]);
    });
};

// Check whether the user passed in is a valid one
MongoDBStrategy.prototype.verifyUser = function(email, password, done) {
    var user = db.users.findOne({ email: email }, function(err, user){
        done(err, user);
    });
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