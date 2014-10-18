angular.module('resources.tasks', []);
angular.module('resources.tasks').factory('Tasks', function ($resource) {

  var Tasks = $resource('tasks');

  Tasks.statesEnum = ['TODO', 'IN_DEV', 'BLOCKED', 'IN_TEST', 'DONE'];

  Tasks.forProductBacklogItem = function (productBacklogItem) {
    return Tasks.query({productBacklogItem:productBacklogItem});
  };

  Tasks.forSprint = function (sprintId) {
    return Tasks.query({sprintId:sprintId});
  };

  Tasks.forUser = function (userId) {
    return Tasks.query({userId:userId});
  };

  Tasks.forProject = function (projectId) {
    return Tasks.query({projectId:projectId});
  };

  Tasks.all = function (projectId) {
    return Tasks.query({projectId:projectId});
  };

  return Tasks;
});