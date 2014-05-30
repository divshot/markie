'use strict';

angular.module('markdownApp')

.controller('BrowserCtrl', function($rootScope, $scope, $state, $stateParams, files) {
  $scope.files = files.list();

  $rootScope.$on('file:update', function() {
    $scope.files = files.list();
    if(!$scope.$$phase) $scope.$digest();
  });

  $rootScope.$on('file:search', function(e, files) {
    $scope.files = files;
    if(!$scope.$$phase) $scope.$digest();
  });

  $rootScope.$on('file:create', function() {
    $scope.create();
  });

  $rootScope.$on('file:delete', function() {
    $scope.delete();
  });

  $scope.select = function(id) {
    $state.go('file', { id: id });
    $rootScope.selectedFile = id;
  };

  $scope.create = function() {
    var id = Date.now();
    files.save(id, {
      title: 'Untitled',
      content: ''
    });
    $scope.select(id);
  };

  $scope.delete = function() {
    var id = $stateParams.id || $rootScope.selectedFile;
    var file = files.get(id);

    if(file) {
      var confirmDelete = confirm('Are you sure you want to delete ' + file.title + '?');
      if(confirmDelete) {
        files.delete(id);
        $scope.select($scope.files[0].id);
      }
    }
  };
});