'use strict';

angular.module('markdownApp')

.service('files', function($rootScope, $http, $filter, localStorageService) {
  return {
    list: function() {
      if(_.isEmpty(localStorageService.get('files'))) {
        this.seed();
      }
      var files = _.sortBy(localStorageService.get('files'), function(file, id) {
        file.id = id;
        return -file.modified;
      });
      return files;
    },
    search: function(query) {
      var files = this.list();
      query = query.toLowerCase();
      files = _.filter(files, function(file) {
        return file.title.toLowerCase().indexOf(query) !== -1 || file.content.toLowerCase().indexOf(query) !== -1;
      });
      return files;
    },
    get: function(id) {
      if(localStorageService.get('files'))
        return localStorageService.get('files')[id];
      else
        return {};
    },
    save: function(id, data) {
      var id = id || $filter('filename')(data.title);
      var files = localStorageService.get('files') || {};

      if(files[id] && files[id].title === data.title && files[id].content === data.content)
        return false;

      if(!files[id]) files[id] = {}

      files[id].title = data.title;
      files[id].content = data.content;
      files[id].modified = Date.now();

      localStorageService.set('files', JSON.stringify(files));
      $rootScope.$broadcast('file:update');
    },
    delete: function(id) {
      var files = localStorageService.get('files');
      delete files[id];
      localStorageService.set('files', JSON.stringify(files));
      $rootScope.$broadcast('file:update');
    },
    seed: function() {
      var self = this;
      var docs = [
        { title: 'Configuration', file: 'configuration.md' },
        { title: 'Getting Started', file: 'getting-started.md' },
        { title: 'Local Development', file: 'local-dev.md' }
      ];
      _.each(docs, function(doc) {
        $http.get('/markdown/' + doc.file).then(function(res) {
          self.save(Date.now(), {
            title: doc.title,
            content: res.data
          });
        });
      });
    }
  };
});