var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ config.security.usersCollection ]);
var User = {
    byId: function(id,done){
        db.users.findOne( { id: mongojs.ObjectId(id) }, function(err, user){
            done(user)
        });
    }
};
module.exports = User;