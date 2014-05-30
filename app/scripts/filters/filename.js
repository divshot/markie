'use strict'

angular.module('markdownApp')

.filter('filename', function() {
  return function(input, delimiter) {
    delimiter || (delimiter = '_');
    return input.toLowerCase().replace(/-+/g, '').replace(/\s+/g, delimiter).replace(/[^a-z0-9-]/g, delimiter);
  };
});