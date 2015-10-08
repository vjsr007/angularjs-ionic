app.Angular.registerCtrl('ubicacionController', function ($scope) {
    $scope.message = 'Mi Ubicación';

    var init = function () {

        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        var markerDrag;

        $scope.IniciarMapa = function() {
            var point = new google.maps.LatLng(25.690081924266817, -100.26957783312992);
            var pointDrag = new google.maps.LatLng(25.68, -100.27);

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
                $scope.calcRoute();
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

        $scope.calcRoute = function() {
            var start = new google.maps.LatLng(25.690081924266817, -100.26957783312992);
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

        $scope.IniciarMapa();
    }

    $(init);
});