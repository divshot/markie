'use strict';

angular.module('markdownApp')

.controller('BrowserCtrl', function($rootScope, $scope, $state, files) {
  $scope.files = files.list();

  $rootScope.$on('file:update', function() {
    $scope.files = files.list();
    if(!$scope.$$phase) $scope.$digest();
  });

  $scope.select = function(id) {
    $state.go('file', { id: id });
  };

  $scope.create = function() {
    var id = Date.now();
    files.save(id, {
      title: 'Untitled',
      content: ''
    });
    $state.go('file', { id: id });
    $rootScope.$broadcast('file:update');
  };
});