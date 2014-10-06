angular.module('resources.productbacklog').factory('ProductBacklog', function ($resource) {
  var ProductBacklog = $resource('/api/products/:productId');

  ProductBacklog.forProject = function (projectId) {
    return ProductBacklog.query({projectId:projectId});
  };

  return ProductBacklog;
});
