angular.module('resources.productbacklog', []);
angular.module('resources.productbacklog').factory('ProductBacklog', function ($resource) {
  var ProductBacklog = $resource('/projects/:projectId/productbacklog');

  ProductBacklog.forProject = function (projectId) {
    return ProductBacklog.query({projectId:projectId}).$promise.then(
        function( result ){  return result; }
    );
  };

  ProductBacklog.getById = function (projectId,projectBacklogId) {
    var product_backlog = $resource('/projects/' + projectId + '/productbacklog/:projectBacklogId').get( { projectBacklogId: projectBacklogId } );
    product_backlog.__proto__= this.prototype;
    return product_backlog;
  };

  ProductBacklog.prototype.$saveOrUpdate = function (onSave, onError) {
    $resource('/projects/' + this.projectId + '/productbacklog/:projectBacklogId').save(this, function(product_backlog) {
      onSave(product_backlog);
    });
  };

  ProductBacklog.prototype.$id = function () {
    return this.id;
  };

  ProductBacklog.prototype.$remove = function (onRemove, onError) {
    return $resource('/projects/'+ this.projectId +'/productbacklog/:projectBacklogId').delete( { projectBacklogId: this['id'] }, onRemove, onError );
  };

  return ProductBacklog;
});
