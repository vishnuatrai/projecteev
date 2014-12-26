var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ 'projects' ]);
var Project = {
  byUser: function(uid, done){
     db.projects.find({ }, function(err, projects){
         done(projects)
     });
  },

  all: function(query, done){
    db.projects.find( query, function(err, projects){
      done(projects)
    });
  },

    byId: function(id,done){
        db.projects.findOne( { '_id': mongojs.ObjectId(id) }, function(err, project){
            done(project)
        });
    },

    createOrUpdate: function(params, done){
        var id = params['_id'];
        delete params['_id'];

        if(id){
            db.projects.findAndModify({
                    query: { '_id': mongojs.ObjectId(id) },
                    update: { $set: params }
                },
                function(err, project, lastErrorObject){
                    done(project);
                }
            );
        }else{
            db.projects.insert( params, function(err, project){
                done(project);
            });
        }

    }


};
module.exports = Project;