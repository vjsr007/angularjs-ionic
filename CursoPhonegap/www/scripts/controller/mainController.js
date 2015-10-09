app.Angular.registerCtrl('mainController', function ($scope) {
    $scope.message = "";

    var onDeviceReady = function () {
        init();
    };

    var onPause = function () {

    };

    var onResume = function () {

    };

    var init = function () {
        var deviceID = device.uuid;

        $scope.message = 'Bienvenido al Curso de Phonegap Cordova\n UUID: ' + deviceID;

        document.addEventListener('pause', onPause, false);
        document.addEventListener('resume', onResume, false);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

});