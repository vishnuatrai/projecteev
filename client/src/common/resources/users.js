angular.module('resources.users', []);
angular.module('resources.users').factory('Users', function ($resource) {

  var userResource = $resource('users');
  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };

    userResource.forUser = function (userId) {
      return userResource.query({userId:userId});
   };

  return userResource;
});
