// 2015-09-13 modified from http://learn.ionicframework.com/formulas/localstorage/
angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || null) || defaultValue || {};
    },
    remove: function(key) {
      $window.localStorage.removeItem(key);
    }
  }
}]);
