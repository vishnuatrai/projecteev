angular.module('projectsinfo', [], ['$routeProvider', function($routeProvider){

  $routeProvider.when('/projectsinfo', {
    templateUrl:'projectsinfo/list.tpl.html',
    controller:'ProjectsInfoListCtrl',
    resolve:{
      projects:['Projects', function(Projects){
        return Projects.forUser();
      }]
    }
  })

  .when('/projectsinfo/:projectId', {
        templateUrl: 'projects-show.tpl.html',
        controller:'ProjectsShowCtrl'
      });

}]);

angular.module('projectsinfo').controller('ProjectsInfoListCtrl', ['$scope', 'projects', function($scope, projects){
  $scope.projects = projects;
}]);

angular.module('projectsinfo').controller('ProjectsShowCtrl', ['$scope', 'projects', function($scope, Projects){

  $scope.project = Projects.getById($route.current.params.itemId);

}]);