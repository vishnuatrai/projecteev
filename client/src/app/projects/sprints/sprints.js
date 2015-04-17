angular.module('sprints', ['resources.sprints', 'resources.sprint-backlog', 'services.crud', 'tasks'])

.config(['crudRouteProvider', function(crudRouteProvider){

  var projectId = ['$route', function($route) {
    return $route.current.params.projectId;
  }];

  var productBacklog = ['$route', 'ProductBacklog', function ($route, ProductBacklog) {
    return ProductBacklog.forProject($route.current.params.projectId).$promise.then(function(r){ return r; });
  }];

  var getSprintBacklogs= ['SprintBacklogs', '$route', function(SprintBacklogs, $route){
    return SprintBacklogs.forSprint( $route.current.params.projectId, $route.current.params.itemId).$promise.then(function(r){ return r; });
  }];

  crudRouteProvider.routesFor('Sprints', 'projects', 'projects/:projectId')
  .whenList({
    projectId: projectId,
    sprints: ['$route', 'Sprints', function($route, Sprints){
      return Sprints.forProject($route.current.params.projectId);
    }]
  })

  .whenNew({
    projectId: projectId,
    sprint: ['$route', 'Sprints', function($route, Sprints){
      return new Sprints({projectId:$route.current.params.projectId});
    }],
    productBacklog : productBacklog,
    sprintBacklog: function() { return []; }
  })

  .whenEdit({
    projectId: projectId,
    sprint: ['$route', 'Sprints', function($route, Sprints){
      return Sprints.getById(projectId,$route.current.params.itemId);
    }],
    productBacklog : productBacklog,
    sprintBacklog: getSprintBacklogs
  });

}])

.controller('SprintsListCtrl', ['$scope', '$location', 'crudListMethods', 'projectId', 'sprints', function($scope, $location, crudListMethods, projectId, sprints){
  $scope.sprints = sprints;

  angular.extend($scope, crudListMethods('/projects/'+projectId+'/sprints'));

  $scope.tasks = function (sprint) {
    $location.path('/projects/'+projectId+'/sprints/'+sprint.$id()+'/tasks');
  };
}])

.controller('SprintsEditCtrl', ['$scope', '$location', 'projectId', 'sprint', 'productBacklog', 'sprintBacklog', function($scope, $location, projectId, sprint, productBacklog, sprintBacklog){

  $scope.productBacklog = productBacklog;
  $scope.sprint = sprint;

  var backlogs = [];
  angular.forEach(sprintBacklog, function(value, key) {
      backlogs.push(value.$id());
  });
  $scope.sprint.sprintBacklog = backlogs;

  $scope.onSave = function () {
    $location.path('/projects/'+projectId+'/sprints');
  };
  $scope.onError = function () {
    $scope.updateError = true;
  };


  $scope.productBacklogLookup = {};
  angular.forEach($scope.productBacklog, function (productBacklogItem) {
    $scope.productBacklogLookup[productBacklogItem.$id()] = productBacklogItem;
  });

  $scope.viewProductBacklogItem = function (productBacklogItemId) {
    $location.path('/projects/'+projectId+'/productbacklog/'+productBacklogItemId);
  };

  $scope.addBacklogItem = function (backlogItem) {
    $scope.sprint.sprintBacklog.push(backlogItem.$id());
  };

  $scope.removeBacklogItem = function (backlogItemId) {
    $scope.sprint.sprintBacklog.splice($scope.sprint.sprintBacklog.indexOf(backlogItemId),1);
  };

  $scope.estimationInTotal = function () {
    var totalEstimation = 0;
    angular.forEach(sprint.sprintBacklog, function (backlogItemId) {
      totalEstimation += $scope.productBacklogLookup[backlogItemId].estimation;
    });
    return totalEstimation;
  };

  $scope.notSelected = function (productBacklogItem) {
    return $scope.sprint.sprintBacklog.indexOf(productBacklogItem.$id())===-1;
  };
}]);