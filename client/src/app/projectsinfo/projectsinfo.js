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
        templateUrl: 'projectsinfo/projects-show.tpl.html',
        controller:'ProjectsShowCtrl'
      });

}]);

angular.module('projectsinfo').controller('ProjectsInfoListCtrl', ['$scope', '$location' ,'projects', function($scope, $location, projects){

  $scope.projects = projects;
  $scope.edit = function(itemId){
    return $location.url('/projectsinfo/'+itemId);
  }

}]);

angular.module('projectsinfo').controller('ProjectsShowCtrl', ['$scope', '$location', 'i18nNotifications', 'Projects', function($scope, $location, i18nNotifications, Projects) {

    $scope.project = Projects.forUser()[0];

}])