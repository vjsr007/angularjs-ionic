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
        $scope.contacts = new Array;
        $.each(contacts, function (i, c) {
            $scope.contacts.push({ displayName: c.displayName, phoneNumbers: c.phoneNumbers });
        });
    };

    $scope.buscarContactosSuccess = function (contacts) {
        if (app.emulated) {
            $scope.aplicarBusqueda(contacts);
        }
        else {
            $scope.$apply(function () {
                $scope.aplicarBusqueda(contacts);
            });
        }
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

     $scope.shouldShowDelete = false;
     $scope.shouldShowReorder = false;
     $scope.listCanSwipe = true

     $scope.callContact = function() {
         navigator.contacts.pickContact(function (contact) {
             console.log('The following contact has been selected:' + JSON.stringify(contact));
         }, function (err) {
             console.log('Error: ' + err);
         });
     }

     document.addEventListener('deviceready', $scope.onDeviceReady, false);
});