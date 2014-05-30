'use strict';

angular.module('markdownApp')

.directive('markdownEditor', function($window, $document, files) {
  return {
    restrict: "E",
    transclude: true,
    template: "<div class='editor'><form class='pure-form title-form'><input class='title' type='text' ng-model='title' placeholder='Title' maxlength='255'><button ng-click='delete()' class='pure-button'><i class='fa fa-trash-o'></i></button></form><textarea class='codemirror'></textarea><div class='preview-container'><div class='preview'></div></div></div>",
    replace: true,
    link: function($scope, $elem, $attr) {
      var editorEl = angular.element(document.querySelector('.codemirror'));
      var previewEl = angular.element(document.querySelector('.preview'));

      $scope.editor = CodeMirror.fromTextArea(editorEl[0], {
        mode: 'markdown',
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
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
      $scope.resizePreview();

      angular.element($window).bind('resize', function() {
        $scope.resizePreview();
      });
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

      $scope.resizePreview = function() {
        _.defer(function() {
          var previewContainer = angular.element(document.querySelector('.preview-container'));
          var previewHeight = document.querySelector('.main').offsetHeight - 440;
          previewContainer.css('height', previewHeight + 'px');
        });
      };
    }
  };
});