'use strict';

angular.module('markdownApp')

.controller('MainCtrl', function($rootScope, $scope, $location, $cookies, $state, $stateParams) {
  var languageOverrides = {
    js: 'javascript',
    html: 'xml'
  };

  marked.setOptions({
    highlight: function(code, lang) {
      if(languageOverrides[lang]) lang = languageOverrides[lang];
      return hljs.LANGUAGES[lang] ? hljs.highlight(lang, code).value : code;
    }
  });
});