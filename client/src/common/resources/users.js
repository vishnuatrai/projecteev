angular.module('resources.users', []);
angular.module('resources.users').factory('Users', function ($resource) {

  var userResource = $resource('users');
  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };

  userResource.prototype.$saveOrUpdate = function (onSave, onSave, onError, onError) {
      $resource('/admin/users/:userId').save(this, function(note) {
          onSave(note);
      });
  };

  userResource.prototype.$id = function () {
    return this._id;
  };

  userResource.prototype.$remove = function (sucfun,errfun) {
      try{
          $resource('/admin/users/:userId').delete( { userId: this._id } );
          sucfun();
      }catch(e){
          errfun();
      }

  };

  userResource.forUser = function (userId) {
    return userResource.query({userId: userId });
  };

  userResource.all = function (params) {
      return userResource.query(params);
  };

  userResource.getById = function (userId) {
    return $resource('/admin/users/:userId').get( { userId: userId } );
  };

  userResource.byEmail = function (email) {
    return $resource('/users/:email').get( { email: email } );
  };

  return userResource;

});
