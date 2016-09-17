/* global tourists */

/**
 * all constants are declared in config-service
 **/

tourists.factory('config', function () {
  return {
    model: {
      map: {
        center: {
          lat: 48.137,
          lng: 11.575,
          zoom: 12
        },
        defaults: {
          maxZoom: 18,
          minZoom: 10
        },
        markers: []
      }
    }
  }
})
