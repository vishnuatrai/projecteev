angular.module('resources.productbacklog', []);
angular.module('resources.productbacklog').factory('ProductBacklog', function ($resource) {
  var ProductBacklog = $resource('productbacklog');

  ProductBacklog.forProject = function (projectId) {
    return ProductBacklog.query({projectId:projectId});
  };

  return ProductBacklog;
});
