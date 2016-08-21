angular.module('MandaditoShop.Appliedsw.com.controllers', [])
.controller('appController', function ($scope, $ionicSideMenuDelegate) {

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

});