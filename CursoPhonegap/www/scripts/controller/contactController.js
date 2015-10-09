//@ sourceURL=contactController.js
app.Angular.registerCtrl('contactController', function ($scope) {

    $scope.message = "";

    var onDeviceReady = function () {
        init();
    };

    var onPause = function () {

    };

    var onResume = function () {
    };

    var init = function () {
        $scope.message = 'Lista de Contactos.';

        document.addEventListener('pause', onPause, false);
        document.addEventListener('resume', onResume, false);

        buscarContactos();
    }

    function buscarContactos() {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        options.hasPhoneNumber = true;
        //var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        var fields = ["*"];
        navigator.contacts.find(fields, buscarContactosSuccess, app.onError, options);
    }

    var buscarContactosSuccess = function (contacts) {
        $scope.contacts = new Array;
        $.each(contacts, function (i, c) {
            $scope.contacts.push({ displayName: c.displayName, phoneNumbers: c.phoneNumbers });
        });
    }

    document.addEventListener('deviceready', onDeviceReady, false);
});