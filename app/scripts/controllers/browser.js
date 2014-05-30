'use strict';

angular.module('markdownApp')

.controller('BrowserCtrl', function($rootScope, $scope, $state, files) {
  $scope.files = files.list();

  $rootScope.$on('fileUpdate', function() {
    $scope.files = files.list();
  });

  $scope.select = function(id) {
    $state.go('file', { id: id });
  };
});