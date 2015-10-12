//@ sourceURL=mainController.js
app.Angular.registerCtrl('mainController', function ($scope, $ionicActionSheet, $timeout, $ionicBackdrop, $ionicPopup, $ionicSideMenuDelegate) {
    $scope.message = "";

    $scope.bateria = {};

    var onDeviceReady = function () {
        init();
    };

    var onPause = function () {

    };

    var onResume = function () {

    };

    var readBattery = function (info) {
        $scope.bateria = info;
    }

    var onBatteryStatus = function (info) {
        readBattery(info);
    }

    var init = function () {
        var deviceID = device.uuid;

        $scope.message = 'Bienvenido al Curso de Phonegap Cordova\n UUID: ' + deviceID;

        document.addEventListener('pause', onPause, false);
        document.addEventListener('resume', onResume, false);
    }

    $scope.show = function () {

        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '<b>Uuid</b> ' + device.uuid },
              { text: '<b>Plataforma</b> ' + device.platform },
              { text: '<b>Modelo</b> ' + device.model },
              { text: '<b>OS</b> ' + device.version },
              { text: '<b>Cordova</b> ' + device.cordova },
              { text: '<b>Nivel Bateria</b> ' + $scope.bateria.level != null ? $scope.bateria.level : "" },
              { text: '<b>Conectado</b> ' + $scope.bateria.isPlugged != null ? $scope.bateria.isPlugged : "" },              
            ],
            titleText: 'Características'
        });

        $timeout(function () {
            hideSheet();
        }, 2000);

    };

    $scope.showPopup = function () {
        var params = {
            $scope: $scope,
            $ionicPopup: $ionicPopup,
            title: "Soy un confirm",
            subTitle: "Yo un subtitulo",
            template: "<label>Soy una etiqueta</label>",
            callBack: function () {
                alert("OK");
            },
            //$timeout: $timeout
        }

        utils.mostrarConfirmar(params);
    }

    $scope.showAlert = function () {
        var params = {
            $scope: $scope,
            $ionicPopup: $ionicPopup,
            title: "Soy un alert",
            template: "<label>Soy una etiqueta</label>",
            //callBack: function () {
            //    alert("OK")
            //}
        }

        utils.mostrarMensaje(params);
    }

    window.addEventListener("batterystatus", onBatteryStatus, false);

    document.addEventListener("deviceready", onDeviceReady, false);

});