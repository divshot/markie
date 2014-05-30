'use strict';

angular.module('markdownApp')

.directive('markdownEditor', function($window, $document, files) {
  return {
    restrict: "E",
    transclude: true,
    template: "<div class='editor'><div class='title-pane'><form class='pure-form title-form'><input class='title' type='text' ng-model='title' placeholder='Title' maxlength='255'><button ng-click='delete()' class='pure-button delete-button'><i class='fa fa-trash-o'></i></button></form></div><div class='editor-pane'><textarea class='codemirror'></textarea></div><div class='preview-pane'><div class='preview'></div></div></div>",
    replace: true,
    link: function($scope, $elem, $attr) {
      var editorEl = angular.element(document.querySelector('.codemirror'));
      var previewEl = angular.element(document.querySelector('.preview'));

      $scope.editor = CodeMirror.fromTextArea(editorEl[0], {
        mode: 'markdown',
        matchBrackets: true,
        lineWrapping: true,
        placeholder: 'Start typing here…',
        theme: 'default'
      });

      if($attr.file) {
        var file = files.get($attr.file);
        if(file) {
          $scope.id = $attr.file;
          $scope.title = file.title == 'Untitled' ? '' : file.title;
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
        var id = $scope.id || Date.now();
        var content = $scope.editor.getValue();
        $scope.setOutput(content);

        files.save(id, {
          title: $scope.title,
          content: content
        });
      };

      $scope.delete = function() {
        $rootScope.$broadcast('file:delete');
      };

      $scope.setOutput = function(val) {
        var preview = angular.element(document.querySelector('.preview'));
        preview.html(marked(val));
      };
    }
  };
});