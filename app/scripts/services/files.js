'use strict';

angular.module('markdownApp')

.service('files', function($rootScope, $filter, localStorageService) {
  return {
    list: function() {
      return localStorageService.get('files');
    },
    get: function(id) {
      return localStorageService.get('files')[id];
    },
    save: function(id, data) {
      var id = id || $filter('filename')(data.title);
      var files = localStorageService.get('files') || {};

      if(!files[id]) files[id] = {}

      files[id].title = data.title;
      files[id].content = data.content;

      localStorageService.set('files', JSON.stringify(files));
      $rootScope.$broadcast('file:update');
    },
    delete: function(id) {
      var files = localStorageService.get('files');
      delete files[id];
      localStorageService.set('files', JSON.stringify(files));
      $rootScope.$broadcast('file:update');
    }
  };
});