angular.module('resources.productbacklog', []);
angular.module('resources.productbacklog').factory('ProductBacklog', function ($resource) {
  var ProductBacklog = $resource('productbacklog');

  ProductBacklog.forProject = function (projectId) {
    return ProductBacklog.query({projectId:projectId});
  };

  ProductBacklog.prototype.$saveOrUpdate = function (onSave, onError) {
    $resource('/projects/:projectId/productbacklog/:taskId').save(this, function(task) {
      onSave(task);
    });
  };

  ProductBacklog.prototype.$id = function () {
    return this._id;
  };

  ProductBacklog.prototype.$remove = function (onRemove, onError) {
    return $resource('/projects/:projectId/productbacklog/:taskId').delete( { userId: this['_id'] }, onRemove, onError );
  };

  return ProductBacklog;
});
