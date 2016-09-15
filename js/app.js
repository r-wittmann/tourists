/* global angular */

let tourists = angular.module('app', ['leaflet-directive'])

tourists.config(['$logProvider', function ($logProvider) {
  // $logProvider.debugEnabled(false)
}])

tourists.controller('Controller', ['$scope', '$http', 'config', function ($scope, $http, config) {
  function initialize () {
    angular.extend($scope, config)
  }
  initialize()
}])
