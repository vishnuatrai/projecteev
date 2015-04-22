var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ 'tasks' ]);
var Task = {
  byUser: function(uid, done){
     db.tasks.find({ }, function(err, tasks){
         done(tasks)
     });
  },

  all: function(query, done){
    db.tasks.find( query, function(err, tasks){
      done(tasks)
    });
  },

    byId: function(id,done){
        db.tasks.findOne( { '_id': mongojs.ObjectId(id) }, function(err, task){
            done(task)
        });
    },

    createOrUpdate: function(params, done){
        var id = params['_id'];
        delete params['_id'];
        db.tasks.findAndModify( { query: { "_id": mongojs.ObjectId(id) }, update: { $set: params } , new:true, upsert: true  }, function(err, task){
            done(task);
        });
    },

    delete: function(id,done){
        db.tasks.remove( { '_id': mongojs.ObjectId(id) }, function(err){
            done()
        });
    }


};
module.exports = Task;