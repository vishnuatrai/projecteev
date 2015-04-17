angular.module('resources.sprint-backlog', []);
angular.module('resources.sprint-backlog').factory('SprintBacklogs', function ($resource) {
    var SprintBacklogs = $resource('/projects/:projectId/sprints/:sprintId/sprint_backlogs');

    SprintBacklogs.forSprint = function (projectId,sprintId) {
        return SprintBacklogs.query({projectId: projectId, sprintId: sprintId});
    };

    SprintBacklogs.prototype.$id = function () {
        return this.id;
    };

    return SprintBacklogs;
});
