angular.module('resources.productbacklog', []);
angular.module('resources.productbacklog').factory('ProductBacklog', function ($resource) {
  var ProductBacklog = $resource('productbacklog');

  ProductBacklog.forProject = function (projectId) {
    return ProductBacklog.query({projectId:projectId});
  };

  ProductBacklog.getById = function (projectId,taskId) {
    var product_backlog = $resource('/projects/' + projectId + '/productbacklog/:taskId').get( { taskId: taskId } );
    product_backlog.__proto__= this.prototype;
    return product_backlog;
  };

  ProductBacklog.prototype.$saveOrUpdate = function (onSave, onError) {
    $resource('/projects/' + this.projectId + '/productbacklog/:taskId').save(this, function(task) {
      onSave(task);
    });
  };

  ProductBacklog.prototype.$id = function () {
    return this._id;
  };

  ProductBacklog.prototype.$remove = function (onRemove, onError) {
    return $resource('/projects/'+ this.projectId +'/productbacklog/:taskId').delete( { taskId: this['_id'] }, onRemove, onError );
  };

  return ProductBacklog;
});
