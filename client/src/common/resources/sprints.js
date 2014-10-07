angular.module('resources.sprints', []);
angular.module('resources.sprints').factory('Sprints', function ($resource) {

  var Sprints = $resource('sprints');
  Sprints.forProject = function (projectId) {
    return Sprints.query({projectId:projectId});
  };
  return Sprints;
});