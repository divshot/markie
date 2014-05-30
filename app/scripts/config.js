'use strict';

angular.module('markdownApp')

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/views/main.html',
    controller: 'MainCtrl'
  }).state('file', {
    url: '/:id',
    templateUrl: '/views/main.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise('/');
})

.run(function($rootScope) {
  $rootScope.__env = __env;
  $rootScope.isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
});