angular.module('resources.projects', []);
angular.module('resources.projects').factory('Projects', function ($resource) {

  var Projects = $resource('/projectsinfo');

  Projects.forUser = function(userId, successcb, errorcb) {
    return Projects.query({ userId: userId }, successcb, errorcb);
  };

  Projects.getById = function (projectId) {
    var project = $resource('/projectsinfo/:projectId').get( { projectId: projectId } );
    project.__proto__= this.prototype;
    return project;
  };

  Projects.prototype.isProductOwner = function (userId) {
    return this.productOwner === userId;
  };
  Projects.prototype.canActAsProductOwner = function (userId) {
    return !this.isScrumMaster(userId) && !this.isDevTeamMember(userId);
  };
  Projects.prototype.isScrumMaster = function (userId) {
    return this.scrumMaster === userId;
  };
  Projects.prototype.canActAsScrumMaster = function (userId) {
    return !this.isProductOwner(userId);
  };
  Projects.prototype.isDevTeamMember = function (userId) {
    return this.teamMembers.indexOf(userId) >= 0;
  };
  Projects.prototype.canActAsDevTeamMember = function (userId) {
    return !this.isProductOwner(userId);
  };

  Projects.prototype.getRoles = function (userId) {
    var roles = [];
    if (this.isProductOwner(userId)) {
      roles.push('PO');
    } else {
      if (this.isScrumMaster(userId)){
        roles.push('SM');
      }
      if (this.isDevTeamMember(userId)){
        roles.push('DEV');
      }
    }
    return roles;
  };

  Projects.prototype.$saveOrUpdate = function (onSave, onError) {
    $resource('/admin/projects/:projectId').save(this, function(project) {
      onSave(project);
    });
  };

  Projects.prototype.$id = function () {
    return this.id;
  };

  Projects.prototype.$remove = function (onRemove, onError) {
    return $resource('/admin/projects/:projectId').delete( { projectId: this['id'] }, onRemove, onError );
  };

  return Projects;
});