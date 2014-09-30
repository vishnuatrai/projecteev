// code for initializing the DB w/ an admin user
var rest = require('request');
var mongojs = require('mongojs');

var initDB = {
  adminUser: { email: 'admin@abc.com', password: 'changeme', admin: true, firstName: 'Admin', lastName: 'User' },

  initialize: function(cfg) {
    initDB.db = mongojs(cfg.security.dbName);
    initDB.usersCollection = cfg.security.usersCollection;
  },
  
  checkDocument: function(collection, query, done) {
    initDB.db.collection(collection).findOne( query, function(err, doc){
      if( err ){
        console.log("Error in checking user documents", err);
      }
      done(err, doc)
    })
  },
  
  createDocument: function(collection, doc, done) {
      initDB.db.collection(collection).save( doc, function(err, doc){
          if( err ){
              console.log("Error in creating user documents", err);
          }
          done(err, doc)
      })
  },
  
  deleteDocument: function(collection, docId, done) {
      initDB.db.collection(collection).remove( { _id: mongojs.ObjectId(docId) }, true, function(err, doc){
          if( err ){
              console.log("Error in deleting user documents", err);
          }
          done(err, doc)
      })

  },
  
  addAdminUser: function(done) {
    console.log('*** Admin user properties:', initDB.adminUser);
    console.log('Checking that admin user does not exist...');
    initDB.checkDocument(initDB.usersCollection, initDB.adminUser, function(err, data) {
      if ( !err && data.length === 0 ) {
        console.log('Creating new admin user...', err, data);
        initDB.createDocument(initDB.usersCollection, initDB.adminUser, function(err, data) {
          console.log('Created new admin user...');
          console.log(err);
          console.log(data);
          done(err, data);
        });
      } else {
        if (data.message) {
          console.log('Error: ' + data.message);
        } else {
          console.log('User already created.');
        }
        done(err, data);
      }
    });
  }
};

module.exports = initDB;

