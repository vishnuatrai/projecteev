angular.module('resources.sprints', []);
angular.module('resources.sprints').factory('Sprints', function ($resource) {

  var Sprints = $resource('sprints');
  Sprints.forProject = function (projectId) {
    return Sprints.query({projectId:projectId});
  };

  Sprints.getById = function (projectId,sprintId) {
    var sprint = $resource('/projects/' + projectId + '/productbacklog/:sprintId').get( { sprintId: sprintId } );
    sprint.__proto__= this.prototype;
    return sprint;
  };

  Sprints.prototype.$saveOrUpdate = function (onSave, onError) {
    $resource('/projects/' + this.projectId + '/productbacklog/:sprintId').save(this, function(sprint) {
      onSave(sprint);
    });
  };

  Sprints.prototype.$id = function () {
    return this._id;
  };

  Sprints.prototype.$remove = function (onRemove, onError) {
    return $resource('/projects/'+ this.projectId +'/productbacklog/:sprintId').delete( { sprintId: this['_id'] }, onRemove, onError );
  };

  return Sprints;

});