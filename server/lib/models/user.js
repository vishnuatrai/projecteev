var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ config.security.usersCollection ]);
var User = {
    byId: function(id,done){
        db.users.findOne( { '_id': mongojs.ObjectId(id) }, function(err, user){
            done(user)
        });
    },
    all: function(query, done){
        db.users.find( query, function(err, users){
            done(users)
        });
    }
};
module.exports = User;