//@ sourceURL=ubicacionController.js
app.Angular.registerCtrl('ubicacionController', function ($scope) {
    $scope.message = 'Arrastra el icono a tu destino';

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var markerDrag;

    $scope.IniciarMapa = function (lat, lon) {
        var point = new google.maps.LatLng(lat, lon);
        var pointDrag = new google.maps.LatLng(lat, lon);

        directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });

        var myOptions = {
            zoom: 14,
            center: point,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: true
        };

        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        var marker = new google.maps.Marker({
            position: point, clickable: true,
            map: map,
            title: "Mi Ubicación"
        });

        markerDrag = new google.maps.Marker({
            position: pointDrag, clickable: true,
            draggable: true,
            map: map,
            title: "Arrastrame",
            icon: "images/dragme.png"
        });

        var infowindow = new google.maps.InfoWindow({
            width: 400,
            height: 400,
            disableAutoPan: false
        });
        infowindow.setContent("Arrástrame a tu destino");
        infowindow.open(map, markerDrag);

        google.maps.event.addListener(markerDrag, 'dragend', function (evt) {
            $scope.calcRoute(lat, lon);
        });

        try {
            var weatherLayer = new google.maps.weather.WeatherLayer({
                temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
            });
            weatherLayer.setMap(map);

            var cloudLayer = new google.maps.weather.CloudLayer();
            cloudLayer.setMap(map);
        }
        catch (e) {
        }
    }

    $scope.calcRoute = function (lat, lon) {
        var start = new google.maps.LatLng(lat, lon);
        var end = markerDrag.getPosition();

        var wayPoints = new Array;
        var Origins = new Array;
        var Destinations = new Array;

        Origins.push(start);
        Destinations.push(end);

        var request = {
            origin: start,
            destination: end,
            waypoints: wayPoints,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });

        directionsDisplay.setMap(map);
        directionsDisplay.setOptions({ suppressMarkers: true });
    }

    function onSuccessCompass(heading) {
        $scope.$apply(function () {
            $scope.Compass = heading;

            if (map) {
                map.setHeading($scope.Compass.magneticHeading);
            }

        });
    };

    document.addEventListener("deviceready", onDeviceReady, false); 
             
    function onDeviceReady() { 
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        var options = { frequency: 1000 };  // Update every 3 seconds

        var watchCompassID = navigator.compass.watchHeading(onSuccessCompass, onError, options);
    } 
             
    function onSuccess(position) { 
        $scope.IniciarMapa(position.coords.latitude, position.coords.longitude);
    } 

    function onError(error) { 
        alert('Código: '    + error.code    + '\n' + 'Mensaje: ' + error.message + '\n'); 
    }
});