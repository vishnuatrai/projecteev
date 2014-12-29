var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ config.security.usersCollection ]);
var User = {
    byId: function(id,done){
        db.users.findOne( { '_id': mongojs.ObjectId(id) }, function(err, user){
            done(user)
        });
    },

    byEmail: function(email,done){
        db.users.findOne( { email: email }, function(err, user){
            done(user)
        });
    },

    all: function(query, done){
        db.users.find( query, function(err, users){
            done(users)
        });
    },

    createOrUpdate: function(params, done){
        var id = params['_id'];
        delete params['_id'];
        db.users.findAndModify( { query: { "_id": id }, update: { $set: params } , new:true, upsert: true  }, function(err, user){
            done(user);
        });
    },

    delete: function(id,done){
        db.users.remove( { '_id': mongojs.ObjectId(id) }, function(err){
            done()
        });
    }
};
module.exports = User;