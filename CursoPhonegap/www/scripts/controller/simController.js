//@ sourceURL=simController.js
app.Angular.registerCtrl('simController', function ($scope, $ionicSlideBoxDelegate) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function successCallback(result) {
        alert(result.deviceId);
    }

    function errorCallback(error) {
        alert(error);
    }

    function onDeviceReady() {
        window.plugins.sim.getSimInfo(successCallback, errorCallback);
    }
});