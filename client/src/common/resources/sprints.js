angular.module('resources.sprints').factory('Sprints', function ($resource) {

  var Sprints = $resource('/api/products/:productId');
  Sprints.forProject = function (projectId) {
    return Sprints.query({projectId:projectId});
  };
  return Sprints;
});