'use strict';

angular.module('markdownApp')

.directive('markdownEditor', function($document, files) {
  return {
    restrict: "E",
    transclude: true,
    template: "<div><input class='title' type='text' ng-model='title' placeholder='Title'><textarea class='codemirror'></textarea></div>",
    replace: true,
    link: function($scope, $elem, $attr) {
      var editorEl = angular.element(document.querySelector('.codemirror'))[0];

      $scope.editor = CodeMirror.fromTextArea(editorEl, {
        mode: 'markdown',
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
        theme: 'default'
      });

      if($attr.file) {
        var file = files.get($attr.file);
        if(file) {
          $scope.title = file.title;
          $scope.editor.setValue(file.content);
        }
      }

      $scope.$watch('title', function(val) {
        if(val) $scope.update();
      });

      $scope.editor.on('change', $scope.update);
    },
    controller: function($rootScope, $scope, $http) {
      $scope.editor = {}

      $scope.update = function() {
        var content = $scope.editor.getValue();
        $scope.setOutput(content);

        files.save('test', {
          title: $scope.title,
          content: content
        });

        $rootScope.$broadcast('fileUpdate');
      };

      $scope.setOutput = function(val) {
        var preview = angular.element(document.querySelector('.preview'));
        preview.html(marked(val));
      };
    }
  };
});