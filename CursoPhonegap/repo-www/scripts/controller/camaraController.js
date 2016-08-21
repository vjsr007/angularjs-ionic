//@ sourceURL=camaraController.js
app.Angular.registerCtrl('camaraController', function ($scope, $ionicSlideBoxDelegate) {

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }
});