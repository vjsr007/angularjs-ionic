var app = {};
(function (self) {
    "use strict";

    self.emulated = window.parent && window.parent.ripple;

    self.Angular = angular
        .module("CursoPhonegap", ['ngRoute', 'ionic', 'ngAnimate'])
        .controller('appController', function ($scope, $ionicSideMenuDelegate) {

            $scope.toggleLeft = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };

        });

    window.onerror = function (e) {
        alert("Error de Aplicación\n" + (e.message ? e.message : e));
    };

})(app);