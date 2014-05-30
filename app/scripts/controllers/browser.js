'use strict';

angular.module('markdownApp')

.controller('BrowserCtrl', function($rootScope, $scope, $state, files) {
  $scope.files = files.list();

  $rootScope.$on('fileUpdate', function() {
    $scope.files = files.list();
    if(!$scope.$$phase) $scope.$digest();
  });

  $scope.select = function(id) {
    $state.go('file', { id: id });
  };
});