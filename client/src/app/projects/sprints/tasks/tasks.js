angular.module('tasks', ['resources.tasks', 'services.crud'])

.config(['crudRouteProvider', function (crudRouteProvider) {

  var sprintBacklogItems = ['Sprints', 'ProductBacklog', '$route', function (Sprints, ProductBacklog, $route) {
    var sprint = Sprints.getById($route.current.params.projectId, $route.current.params.sprintId).$promise.then(function(sprint){ return sprint; });
    return ProductBacklog.query({ projectId: $route.current.params.projectId, sprintBacklog: sprint.sprintBacklog }).$promise.then(function( result ){  return result; });
  }];

  var teamMembers = ['Projects', 'Users', '$route', function (Projects, Users, $route) {
    var project = Projects.getById($route.current.params.projectId).$promise.then(function(project){ return project; } );
    return Users.query({ teamMembers: project.teamMembers }).$promise.then( function( result ){  return result; } );
  }];

  crudRouteProvider.routesFor('Tasks', 'projects/sprints', 'projects/:projectId/sprints/:sprintId')

  .whenList({
    tasks:['Tasks', '$route', function (Tasks, $route) {
      return Tasks.forSprint($route.current.params.projectId, $route.current.params.sprintId);
    }]
  })

  .whenNew({
    task:['Tasks', '$route', function (Tasks, $route) {
      return new Tasks({
        projectId:$route.current.params.projectId,
        sprintId:$route.current.params.sprintId,
        state:Tasks.statesEnum[0]
      });
    }],
    sprintBacklogItems:sprintBacklogItems,
    teamMembers:teamMembers
  })

  .whenEdit({
    task:['Tasks', '$route', function (Tasks, $route) {
      return Tasks.getById($route.current.params.itemId);
    }],
    sprintBacklogItems:sprintBacklogItems,
    teamMembers:teamMembers
  });
}])

.controller('TasksListCtrl', ['$scope', 'crudListMethods', '$route', 'tasks', function ($scope, crudListMethods, $route, tasks) {
  $scope.tasks = tasks;

  var projectId = $route.current.params.projectId;
  var sprintId = $route.current.params.sprintId;
  angular.extend($scope, crudListMethods('/projects/' + projectId + '/sprints/' + sprintId + '/tasks'));
}])

.controller('TasksEditCtrl', ['$scope', '$location', '$route', 'Tasks', 'sprintBacklogItems', 'teamMembers', 'task', function ($scope, $location, $route, Tasks, sprintBacklogItems, teamMembers, task) {
  $scope.task = task;
  $scope.statesEnum = Tasks.statesEnum;
  $scope.sprintBacklogItems = sprintBacklogItems;
  $scope.teamMembers = teamMembers;

  $scope.onSave = function () {
    $location.path('/admin/users');
  };
  $scope.onError = function() {
    $scope.updateError = true;
  };
}]);