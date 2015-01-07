angular.module('resources.tasks', []);
angular.module('resources.tasks').factory('Tasks', function ($resource) {

  var Tasks = $resource('/projects/:projectId/sprints/:sprintId/tasks');

  Tasks.statesEnum = ['TODO', 'IN_DEV', 'BLOCKED', 'IN_TEST', 'DONE'];

  Tasks.forProductBacklogItem = function (productBacklogItem) {
    return Tasks.query({productBacklogItem:productBacklogItem});
  };

  Tasks.forSprint = function (projectId, sprintId) {
    return Tasks.query({ projectId:projectId, sprintId:sprintId });
  };

  Tasks.forUser = function (userId) {
    return Tasks.query({userId:userId});
  };

  Tasks.forProject = function (projectId) {
    return Tasks.query({projectId:projectId});
  };

  Tasks.all = function (projectId) {
    return Tasks.query({projectId:projectId});
  };

  Tasks.getById = function (projectId, sprintId , taskId) {
    var task = $resource('/projects/' + projectId + '/sprints/' + sprintId + '/tasks/:taskId').get( { taskId: taskId } );
    task.__proto__= this.prototype;
    return task;
  };

  Tasks.prototype.$saveOrUpdate = function (onSave, onError) {
    $resource('/projects/' + this.projectId + '/sprints/' + this.sprintId + '/tasks/:taskId').save(this, function(task) {
      onSave(task);
    });
  };

  Tasks.prototype.$id = function () {
    return this._id;
  };

  Tasks.prototype.$remove = function (onRemove, onError) {
    return $resource('/tasks/:taskId').delete( { taskId: this['_id'] }, onRemove, onError );
  };

  return Tasks;
});