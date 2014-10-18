var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ 'tasks' ]);
var Task = {
  byUser: function(uid, done){
     db.tasks.find({ userId: uid }, function(err, tasks){
         done(tasks)
     });
  }
};
module.exports = Task;