app.Angular.registerCtrl('mainController', function ($scope) {
    var deviceID = device.uuid;

    $scope.message = 'Bienvenido al Curso de Phonegap Cordova\n' + deviceID;
});