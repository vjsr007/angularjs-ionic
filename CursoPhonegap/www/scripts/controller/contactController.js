//@ sourceURL=contactController.js
app.Angular.registerCtrl('contactController', function ($scope) {
    "use strict";

    $scope.message = "";

    $scope.onDeviceReady = function () {
        $scope.init();
    };

    $scope.onPause = function () {

    };

    $scope.onResume = function () {

    };

    $scope.aplicarBusqueda = function (contacts) {
        $scope.$apply(function () {
            $scope.contacts = new Array;
            $.each(contacts, function (i, c) {
                $scope.contacts.push({ displayName: c.displayName, phoneNumbers: c.phoneNumbers });
            });
        });
    };

    $scope.buscarContactosSuccess = function (contacts) {
        $scope.aplicarBusqueda(contacts);

        app.contacts = contacts;
    };

    $scope.buscarContactos = function () {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        options.hasPhoneNumber = true;
        //var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        var fields = ["*"];
        navigator.contacts.find(fields, $scope.buscarContactosSuccess, app.onError, options);
    };

    $scope.init = function () {
        $scope.message = 'Lista de Contactos.';

        $scope.contacts = new Array;

        document.addEventListener('pause', $scope.onPause, false);
        document.addEventListener('resume', $scope.onResume, false);

        $scope.buscarContactos();
    };

    document.addEventListener('deviceready', $scope.onDeviceReady, false);
});