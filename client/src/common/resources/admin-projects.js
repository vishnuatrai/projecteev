angular.module('resources.admin-projects', []);
angular.module('resources.admin-projects').factory('AdminProjects', function ($resource) {

  var AdminProjects = $resource('/admin/projects');

    AdminProjects.forUser = function(userId, successcb, errorcb) {
    return AdminProjects.query({ userId: userId }, successcb, errorcb);
  };

    AdminProjects.getById = function (projectId) {
    var project = $resource('/admin/projects/:projectId').get( { projectId: projectId } );
    project.__proto__= this.prototype;
    return project;
  };

    AdminProjects.prototype.isProductOwner = function (userId) {
    return this.productOwner === userId;
  };
    AdminProjects.prototype.canActAsProductOwner = function (userId) {
    return !this.isScrumMaster(userId) && !this.isDevTeamMember(userId);
  };
    AdminProjects.prototype.isScrumMaster = function (userId) {
    return this.scrumMaster === userId;
  };
    AdminProjects.prototype.canActAsScrumMaster = function (userId) {
    return !this.isProductOwner(userId);
  };
    AdminProjects.prototype.isDevTeamMember = function (userId) {
    return this.teamMembers.indexOf(userId) >= 0;
  };
    AdminProjects.prototype.canActAsDevTeamMember = function (userId) {
    return !this.isProductOwner(userId);
  };

    AdminProjects.prototype.getRoles = function (userId) {
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

    AdminProjects.prototype.$saveOrUpdate = function (onSave, onError) {
    $resource('/admin/projects/:projectId').save(this, function(project) {
      onSave(project);
    });
  };

    AdminProjects.prototype.$id = function () {
    return this.id;
  };

    AdminProjects.prototype.$remove = function (onRemove, onError) {
    return $resource('/admin/projects/:projectId').delete( { projectId: this['id'] }, onRemove, onError );
  };

  return AdminProjects;
});