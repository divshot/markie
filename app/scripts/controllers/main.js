'use strict';

angular.module('markdownApp')

.controller('MainCtrl', function($rootScope, $scope, $state, $stateParams, files) {
  $rootScope.selectedFile = $stateParams.id;
  if($rootScope.selectedFile) $scope.file = files.get($scope.id);
});