var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ 'sprints' ]);
var Sprint = {
  byUser: function(uid, done){
     db.sprints.find({ }, function(err, sprints){
         done(sprints)
     });
  },

  all: function(query, done){
    db.sprints.find( query, function(err, sprints){
      done(sprints)
    });
  },

    byId: function(id,done){
        db.sprints.findOne( { '_id': mongojs.ObjectId(id) }, function(err, sprint){
            done(sprint)
        });
    },

    createOrUpdate: function(params, done){
        var id = params['_id'];
        delete params['_id'];
        db.sprints.findAndModify( { query: { "_id": mongojs.ObjectId(id) }, update: { $set: params } , new:true, upsert: true  }, function(err, sprint){
            done(sprint);
        });
    },

    delete: function(id,done){
        db.sprints.remove( { '_id': mongojs.ObjectId(id) }, function(err){
            done()
        });
    }


};
module.exports = Sprint;