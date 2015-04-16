angular.module('resources.users', []);
angular.module('resources.users').factory('Users', function ($resource) {

  var userResource = $resource('/users');
  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };

  userResource.prototype.$saveOrUpdate = function (onSave, onError) {
      $resource('/admin/users/:userId').save(this, function(note) {
          onSave(note);
      });
  };

  userResource.prototype.$id = function () {
    return this.id;
  };

  userResource.prototype.$remove = function (onRemove, onError) {
      return $resource('/admin/users/:userId').delete( { userId: this['id'] }, onRemove, onError );
  };

  userResource.forUser = function (userId) {
    return userResource.query({userId: userId });
  };

  userResource.all = function (params) {
      return userResource.query(params);
  };

  userResource.getById = function (userId) {
    var user = $resource('/admin/users/:userId').get( { userId: userId } );
    user.__proto__= this.prototype;
    return user;
  };

  userResource.byEmail = function (email) {
    return $resource('/users/:email').get( { email: email } );
  };

  return userResource;

});
