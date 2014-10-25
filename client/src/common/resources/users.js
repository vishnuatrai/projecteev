angular.module('resources.users', []);
angular.module('resources.users').factory('Users', function ($resource) {

  var userResource = $resource('users');
  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };

  userResource.prototype.$saveOrUpdate = function (params) {
    return userResource;
  };

  userResource.prototype.$id = function () {
    return this._id;
  };

  userResource.prototype.$remove = function (params) {
    return userResource;
  };

  userResource.forUser = function (userId) {
    return userResource.query({userId: userId });
  };

  userResource.getById = function (userId) {
    return userResource.query({ userId: userId });
  };

  userResource.byEmail = function (email) {
    return userResource.query({email: email });
  };

  return userResource;

});
