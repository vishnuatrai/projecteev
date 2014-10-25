angular.module('resources.users', []);
angular.module('resources.users').factory('Users', function ($resource) {

  var userResource = $resource('users');
  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };

  userResource.prototype.$saveOrUpdate = function (params) {
    return userResource;
  };

  userResource.prototype.$id = function (params) {
    return userResource;
  };

  userResource.prototype.$remove = function (params) {
    return userResource;
  };

  userResource.forUser = function (userId) {
    return userResource.query({userId:userId});
  };

  userResource.byEmail = function (email, done) {
    console.log('---------------------------------');
    console.log(email);
    users = userResource.query( {email: email } );
    done(users);
  };

    return userResource;

});
