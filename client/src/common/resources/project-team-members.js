angular.module('resources.project-team-members', []);
angular.module('resources.project-team-members').factory('ProjectTeamMembers', function ($resource) {

    var ProjectTeamMembers = $resource('/projects/:projectId/team_members');
    ProjectTeamMembers.forProject = function (projectId) {
        return ProjectTeamMembers.query({projectId: projectId});
    };

    ProjectTeamMembers.prototype.getFullName = function () {
        return this.lastName + " " + this.firstName + " (" + this.email + ")";
    };

    ProjectTeamMembers.prototype.$id = function () {
        return this.id;
    };

    return ProjectTeamMembers;

});