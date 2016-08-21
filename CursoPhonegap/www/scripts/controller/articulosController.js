"use strict";
angular
.registerController('articulosController', function ($scope, Msg, DatabaseService, $ionicModal) {
    var vm = $scope;
      
    //INTERFACE
    vm.Titulo = "Articulos";
    vm.init = init;
    vm.mostrarFoto = false;
    vm.buttons = { showDelete: false,showAdd: false};
    vm.newArticulo = {};
    vm.openModal = openModal;
    vm.crearArticulo = crearArticulo;
    vm.moveItem = moveItem;
    vm.eliminarArticulo = eliminarArticulo;
    vm.leerCodigo = leerCodigo;
    vm.cargarFoto = cargarFoto;
    vm.modal = {};

    //DUMMY DATA
    vm.items = {};

    //IMPLEMENTACION
    function init() {
        DatabaseService.load();

        $ionicModal.fromTemplateUrl('views/articulo.html', {
            scope: vm
        }).then(function (modal) {
            vm.modal = modal;
        });

        vm.items = vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
    }    

    function openModal() {
        vm.modal.show();
    };

    function crearArticulo(a) {
        var Articulo = new DatabaseService.Articulo;

        Articulo.Codigo(a.Codigo);
        Articulo.Articulo(a.Articulo);
        Articulo.Departamento(a.Departamento);

        Articulo.Categoria(a.Categoria);
        Articulo.Marca(a.Marca);
        Articulo.Precio(a.Precio);

        Articulo.Img(a.Img);
        Articulo.Active(a.Active);

        DatabaseService.addRow(Articulo);

        vm.newArticulo = {};

        vm.modal.hide();

        vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
    };

    function moveItem(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);

        Msg.mostrarMensaje('Moved Item: ' + item.id + ' From: ' + fromIndex + ' To: ' + toIndex);
    };

    function eliminarArticulo(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);

        Msg.mostrarMensaje('Deleted Item: ' + item.id);
    };

    function leerCodigo() {
        document.addEventListener("deviceready", iniciarScanner, false);
    }

    function iniciarScanner() {
        cordova.plugins.barcodeScanner.scan(
           function (result) {

               vm.$apply(function () {
                   vm.newArticulo.Codigo = result.text;
               });
               
           },
           function (error) {
               Msg.mostrarMensaje("Fallo escaneo: " + error);
           },
           {
               "preferFrontCamera": false,
               "showFlipCameraButton": true, 
               "prompt": "Place a barcode inside the scan area",
               "orientation": "landscape"
           }
        );
    }

    function cargarFoto() {
        document.addEventListener("deviceready", iniciarCamara, false);
    }

    function iniciarCamara() {
        navigator.camera.getPicture(function (imageData) {
            var image = document.getElementById('imgArticuloModal');
            image.src = "data:image/jpeg;base64," + imageData;

            vm.$apply(function () {
                vm.newArticulo.Img = imageData;
                vm.mostrarFoto = true;
            });
        }, function (message) {
            Msg.mostrarMensaje('Fallo camara: ' + message);
        }, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    vm.init();

});