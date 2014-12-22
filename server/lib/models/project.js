var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ 'projects' ]);
var Project = {
  byUser: function(uid, done){
     db.projects.find({ productOwner: uid }, function(err, projects){
         done(projects)
     });
  },

  all: function(query, done){
    db.projects.find( query, function(err, projects){
      done(projects)
    });
  }


};
module.exports = Project;