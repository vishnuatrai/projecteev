var config = require('./../../config');
var mongojs = require("mongojs");
var db = mongojs.connect(config.security.dbName, [ 'product_backlogs' ]);
var ProductBacklog = {
  byUser: function(uid, done){
     db.product_backlogs.find({ }, function(err, product_backlogs){
         done(product_backlogs)
     });
  },

  all: function(query, done){
    db.product_backlogs.find( query, function(err, product_backlogs){
      done(product_backlogs)
    });
  },

    byId: function(id,done){
        db.product_backlogs.findOne( { '_id': mongojs.ObjectId(id) }, function(err, product_backlog){
            done(product_backlog)
        });
    },

    createOrUpdate: function(params, done){
        var id = params['_id'];
        delete params['_id'];
        db.product_backlogs.findAndModify( { query: { "_id": mongojs.ObjectId(id) }, update: { $set: params } , new:true, upsert: true  }, function(err, product_backlog){
            done(product_backlog);
        });
    },

    delete: function(id,done){
        db.product_backlogs.remove( { '_id': mongojs.ObjectId(id) }, function(err){
            done()
        });
    }


};
module.exports = ProductBacklog;