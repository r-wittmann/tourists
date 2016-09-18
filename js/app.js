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

  $scope.centerOnLocation = function () {
    const coords = $scope.model.currentPosition.coords
    LocationService.centerOnLocation($scope.model, coords.latitude, coords.longitude, $scope.model.map.center.zoom)
  }
}])

tourists.service('LocationService', ['$timeout', function ($timeout) {
  this.getGeolocation = function (model) {
    navigator.geolocation && navigator.geolocation.watchPosition((position) => {
      $timeout(() => {
        model.currentPosition = position
        model.map.paths[0] = {
          type: 'circle',
          radius: position.coords.accuracy,
          color: '#0033ff',
          opacity: '0.2',
          weight: 0,
          latlngs: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
        model.map.paths[1] = {
          type: 'circleMarker',
          radius: 3,
          color: '#0033ff',
          fillOpacity: 1,
          message: ('<b>Genauigkeit der Position: ' + position.coords.accuracy + 'm</b>'),
          latlngs: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
      }, 0)
    })
  }

  this.centerOnLocation = function (model, latitude, longitude, zoom) {
    $timeout(() => {
      model.map.center = {
        lat: latitude,
        lng: longitude,
        zoom: zoom
      }
    }, 0)
  }
}])
