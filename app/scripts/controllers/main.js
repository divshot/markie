'use strict';

angular.module('markdownApp')

.controller('MainCtrl', function($rootScope, $scope, $location, $cookies, $state, $stateParams, files) {
  $scope.id = $stateParams.id;
  if($scope.id) $scope.file = files.get($scope.id);
});