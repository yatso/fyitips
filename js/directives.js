angular.module('FYITips.directives', ['ConsoleLogger'])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&',
      lat: '@',
      lon: '@',
      acc: '@'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var pos = new google.maps.LatLng($scope.lat, $scope.lon);
        var mapOptions = {
          center: pos,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
        new google.maps.Marker({
          position: pos,
          map: map,
          title: "Here it is"
        });
        
        if ($scope.acc) {
          new google.maps.Circle({
            strokeColor: '#8080FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#8080FF',
            fillOpacity: 0.25,
            map: map,
            center: pos,
            radius: parseInt($scope.acc)
          });

        }
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})
;
