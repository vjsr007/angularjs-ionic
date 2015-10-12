//@ sourceURL=aboutController.js
app.Angular.registerCtrl('aboutController', function ($scope, $ionicSlideBoxDelegate) {

    $scope.Acceleration;
    $scope.Compass;

    function onSuccess(acceleration) {
        $scope.Acceleration = acceleration;
    };

    function onError() {
        alert('onError!');
    };

    function onSuccessCompass(heading) {
        $scope.Compass = heading;
    };

    function onDeviceReady() {
        var options = { frequency: 1000 };  // Update every 3 seconds

        var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

        var watchCompassID = navigator.compass.watchHeading(onSuccessCompass, onError, options);
    }

    document.addEventListener("deviceready", onDeviceReady, false);


});