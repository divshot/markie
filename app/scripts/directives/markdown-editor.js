'use strict';

angular.module('markdownApp')

.directive('markdownEditor', function($document) {
  return {
    restrict: "E",
    transclude: true,
    template: "<textarea class='codemirror'></textarea>",
    replace: true,
    link: function($scope, $elem, $attr) {
      $scope.editor = CodeMirror.fromTextArea($elem[0], {
        mode: 'markdown',
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
        theme: 'default'
      });

      $scope.editor.on('change', $scope.update);

      $document.on('keydown', function(e) {
        if(e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          $scope.save();
          return false;
        }
      });
    },
    controller: function($scope, $http) {
      $scope.editor = {}

      $scope.update = function(e) {
        var val = e.getValue();
        $scope.setOutput(val);
      };

      $scope.setOutput = function(val) {
        var preview = angular.element(document.querySelector('.preview'));
        preview.html(marked(val));
      };

      $scope.save = function() {
        var code = $scope.editor.getValue();
        console.log('Saving...');
        console.log(code);
      };
    }
  };
});