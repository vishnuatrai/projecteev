angular.module('dashboard', ['resources.projects', 'resources.tasks'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl:'dashboard/dashboard.tpl.html',
    controller:'DashboardCtrl',
    resolve:{
      projects:['Projects', function (Projects) {
        //TODO: need to know the current user here
        return Projects.forUser();
      }],
      tasks:['Tasks', function (Tasks) {
        //TODO: need to know the current user here
        return Tasks.forUser().$promise.then(function(r){ return r; });
      }]
    }
  });
}])

.controller('DashboardCtrl', ['$scope', '$location', 'projects', 'tasks', function ($scope, $location, projects, tasks) {
  $scope.projects = projects;
  $scope.tasks = tasks;

  $scope.manageBacklog = function (project) {
    $location.path('/projects/' + project.$id() + '/productbacklog');
  };

  $scope.manageSprints = function (project) {
    $location.path('/projects/' + project.$id() + '/sprints');
  };
}]);