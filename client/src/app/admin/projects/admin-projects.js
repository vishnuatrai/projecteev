angular.module('admin-projects', [
  'resources.admin-projects',
  'resources.project-team-members',
  'resources.users',
  'services.crud',
  'security.authorization'
])

.config(['crudRouteProvider', 'securityAuthorizationProvider', function (crudRouteProvider, securityAuthorizationProvider) {

  var getAllUsers = ['AdminProjects', 'Users', '$route', function(AdminProjects, Users, $route){
    return Users.all().$promise.then(function(r){ return r; });
  }];

  var getTeamMembers = ['ProjectTeamMembers', '$route', function(ProjectTeamMembers, $route){
      return ProjectTeamMembers.forProject($route.current.params.itemId).$promise.then(function(r){ return r; });
  }];

  crudRouteProvider.routesFor('Projects', 'admin')
    .whenList({
      projects: ['AdminProjects', function(AdminProjects) { return AdminProjects.forUser(); }],
      adminUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenNew({
      project: ['AdminProjects', function(AdminProjects) { return new AdminProjects(); }],
      users: getAllUsers,
      teamMembers: function() { return []; },
      adminUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenEdit({
      project: ['AdminProjects', '$route', function(AdminProjects, $route) { return AdminProjects.getById($route.current.params.itemId); }],
      users: getAllUsers,
      teamMembers: getTeamMembers,
      adminUser: securityAuthorizationProvider.requireAdminUser
    });
}])

.controller('ProjectsListCtrl', ['$scope', 'crudListMethods', 'projects', function($scope, crudListMethods, projects) {
  $scope.projects = projects;

  angular.extend($scope, crudListMethods('/admin/projects'));
}])

.controller('ProjectsEditCtrl', ['$scope', '$location', 'i18nNotifications', 'users', 'project', 'teamMembers', function($scope, $location, i18nNotifications, users, project, teamMembers) {

  $scope.project = project;
  $scope.users = users;
  $scope.project.teamMembers = teamMembers || [];

  $scope.onSave = function(project) {
    i18nNotifications.pushForNextRoute('crud.project.save.success', 'success', {id : project['id']});
    $location.path('/admin/projects');
  };

  $scope.onError = function() {
    i18nNotifications.pushForCurrentRoute('crud.project.save.error', 'error');
  };

  $scope.onRemove = function() {
    i18nNotifications.pushForNextRoute('crud.project.remove.success', 'success', {id : project.$id()});
    $location.path('/admin/projects');
  };

}])

.controller('TeamMembersController', ['$scope', function($scope) {

        var teamMembers = [];
        angular.forEach($scope.project.teamMembers, function(value, key) {
            teamMembers.push(value.$id());
        });
        $scope.project.teamMembers = teamMembers;

  //prepare users lookup, just keep references for easier lookup
  $scope.usersLookup = {};
  angular.forEach($scope.users, function(value, key) {
    $scope.usersLookup[value.$id()] = value;
  });

  $scope.productOwnerCandidates = function() {
    return $scope.users.filter(function(user) {
      return true;
      //return $scope.usersLookup[user.$id()] && $scope.project.canActAsProductOwner(user.$id());
    });
  };

  $scope.scrumMasterCandidates = function() {
    return $scope.users.filter(function(user) {
      return true;
      //return $scope.usersLookup[user.$id()] && $scope.project.canActAsScrumMaster(user.$id());
    });
  };

  $scope.teamMemberCandidates = function() {
    return $scope.users.filter(function(user) {
      return true;
      //return $scope.usersLookup[user.$id()] && $scope.project.canActAsDevTeamMember(user.$id()) && !$scope.project.isDevTeamMember(user.$id());
    });
  };

  $scope.selTeamMember = undefined;

  $scope.addTeamMember = function() {
    if($scope.selTeamMember) {
      $scope.project.teamMembers.push($scope.selTeamMember);
      $scope.selTeamMember = undefined;
    }
  };

  $scope.removeTeamMember = function(teamMember) {
    var idx = $scope.project.teamMembers.indexOf(teamMember);
    if(idx >= 0) {
      $scope.project.teamMembers.splice(idx, 1);
    }
    // If we have removed the team member that is currently selected then clear this object
    if($scope.selTeamMember === teamMember) {
      $scope.selTeamMember = undefined;
    }
  };
}]);