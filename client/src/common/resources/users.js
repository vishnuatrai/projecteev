angular.module('resources.users').factory('Users', function ($resource) {

  var userResource = $resource('/api/users/:userId');
  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };

  return userResource;
});
