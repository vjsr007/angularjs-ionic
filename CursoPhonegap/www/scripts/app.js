var app = {};
(function (self) {
    "use strict";

    self.emulated = window.parent && window.parent.ripple;

    var init = function () {

    };

    var initAngular = function () {
        self.Angular = angular
            .module("CursoPhonegap", ['ngRoute', 'ionic','ngAnimate'])
            .controller('appController', function ($scope, $ionicSideMenuDelegate) {

                $scope.toggleLeft = function () {
                    $ionicSideMenuDelegate.toggleLeft();
                };

            });
    }

    var handledError = function () {
        window.onerror = function (e) {
            alert("Error de Aplicación\n" + e.message);;
        };
    };

    var load = function () {
        handledError();

        //<summary>Cargar al momento</summary>
        $(init);

        initAngular();
    };

    var onError = function () {

    };


    load();

})(app);