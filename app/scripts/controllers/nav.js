'use strict';

angular.module('markdownApp')

.controller('NavCtrl', function($rootScope, $scope, files) {
  $scope.search = function() {
    var results = {};
    if($scope.query) {
      results = files.search($scope.query);
    } else {
      results = files.list();
    }
    $rootScope.$broadcast('file:search', results);
  };

  $scope.create = function() {
    $rootScope.$broadcast('file:create');
  };
});