/* global angular */

let tourists = angular.module('app', ['leaflet-directive'])

tourists.config(['$logProvider', function ($logProvider) {
  // $logProvider.debugEnabled(false)
}])

tourists.controller('Controller', ['$scope', '$http', 'config', 'LocationService', function ($scope, $http, config, LocationService) {
  function initialize () {
    angular.extend($scope, config)
    LocationService.getGeolocation($scope.model)
  }
  initialize()
}])

tourists.service('LocationService', ['$timeout', function ($timeout) {
  this.getGeolocation = function (model) {
    navigator.geolocation && navigator.geolocation.watchPosition((position) => {
      $timeout(() => { model.currentPosition = position }, 0)
    })
  }
}])
