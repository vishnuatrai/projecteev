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
        controller:'ProjectsShowCtrl',
        resolve:{
            project:['$route', 'Projects', function ($route, Projects) {
                return Projects.getById($route.current.params.projectId);
            }],
            users:['$route', 'Users', function ($route, Users) {
                return Users.all().$promise.then(function(r){ return r; });
            }],
            teamMembers: ['ProjectTeamMembers', '$route', function(ProjectTeamMembers, $route){
                return ProjectTeamMembers.forProject($route.current.params.projectId).$promise.then(function(r){ return r; });
            }]
        }

      });

}]);

angular.module('projectsinfo').controller('ProjectsInfoListCtrl', ['$scope', '$location' ,'projects', function($scope, $location, projects){

  $scope.projects = projects;
  $scope.edit = function(itemId){
    return $location.url('/projectsinfo/'+itemId);
  }

}]);

angular.module('projectsinfo').controller('ProjectsShowCtrl', ['$scope', '$location', 'project', 'users', 'teamMembers', function($scope, $location, project, users, teamMembers) {

    $scope.project = project;
    $scope.users = users;
    $scope.project.teamMembers = teamMembers || [];

    //prepare users lookup, just keep references for easier lookup
    $scope.usersLookup = {};
    angular.forEach($scope.users, function (value, key) {
        $scope.usersLookup[value.$id()] = value;
    });

    $scope.project.productOwnerFullName = function () {
        return $scope.usersLookup[$scope.project.productOwner].getFullName();
    };

    $scope.project.scrumMasterFullName = function () {
        return $scope.usersLookup[$scope.project.scrumMaster].getFullName();
    };

    $scope.back = function(){
      return $location.url('/projectsinfo');
    };

}])
.controller('TeamMembersController', ['$scope', function($scope) {
    var teamMembers = [];
    angular.forEach($scope.project.teamMembers, function(value, key) {
        teamMembers.push(value.$id());
    });
    $scope.project.teamMembers = teamMembers;

}]);