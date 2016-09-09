"use strict";
angular
.registerController('articulosController', function ($scope, Msg, DatabaseService, Firebase3Service, $ionicModal) {
    var vm = $scope;
    var ds = DatabaseService;
    var fb3 = Firebase3Service;

    //INTERFACE
    vm.Titulo = "Articulos";
    vm.init = init;
    vm.mostrarFoto = false;
    vm.buttons = { showDelete: false,showAdd: false};
    vm.Articulo = {};
    vm.openModal = openModal;
    vm.crearArticulo = crearArticulo;
    vm.moveItem = moveItem;
    vm.eliminarArticulo = eliminarArticulo;
    vm.leerCodigo = leerCodigo;
    vm.cargarFoto = cargarFoto;
    vm.editarModal = editarModal;
    vm.editarArticulo = editarArticulo;
    vm.editando = false;
    vm.guardarCambios = guardarCambios;
    vm.obtenerLista = obtenerLista;
    vm.clearSearch = clearSearch;
    vm.modal = {};
    
    //DUMMY DATA
    vm.items = {};

    //IMPLEMENTACION
    function init() {
        ds.load().then(function(){
            $ionicModal.fromTemplateUrl('views/articulo.html', {
                scope: vm
            }).then(function (modal) {
                vm.modal = modal;
            });

            ds.jsonAll(ds.Articulo).then(function (data) {
                vm.items = data;
            });

            fb3.load();
        });
    }

    function openModal() {
        vm.Articulo = {};
        vm.ImgSrc = "";
        vm.mostrarFoto = false;
        vm.editando = false;
        vm.modal.show();
    };

    function crearArticulo() {
        var Articulo = new ds.Articulo(vm.Articulo);

        ds.saveRow(Articulo, function () {
            Msg.mostrarMensaje('Articulo agregado');
            
            vm.modal.hide();

            ds.jsonAll(ds.Articulo).then(function (data) {
                vm.items = data;
            });

            fb3.upload("Articulo", vm.Articulo, Articulo.id);

        });
    }

    function moveItem(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);

        Msg.mostrarMensaje('Moved Item: ' + item.id + ' From: ' + fromIndex + ' To: ' + toIndex);
    }

    function eliminarArticulo(item) {
        ds.getById(ds.Articulo, item.id, function (Articulo) {
            ds.removeRow(Articulo, function () {
                Msg.mostrarMensaje('Articulo eliminado');

                ds.jsonAll(ds.Articulo).then(function (data) {
                    vm.items = data;
                });
            });
        });        
    }

    function editarModal(item) {
        ds.getById(ds.Articulo, item.id, function (result) {
            vm.Articulo = result.toJSON();
            vm.ImgSrc = "data:image/jpeg;base64," + vm.Articulo.Img;
            vm.mostrarFoto = true;
            vm.editando = true;
        
            vm.modal.show();
        });
    }

    function editarArticulo() {
        ds.getById(ds.Articulo, vm.Articulo.id, function (Articulo) {

            var a = vm.Articulo;

            Articulo.Codigo = a.Codigo;
            Articulo.Articulo = a.Articulo;
            Articulo.Departamento = a.Departamento;

            Articulo.Categoria = a.Categoria;
            Articulo.Marca = a.Marca;
            Articulo.Precio = a.Precio;

            Articulo.Img = a.Img;
            Articulo.Active = a.Active;

            ds.saveRow(Articulo, function () {
                Msg.mostrarMensaje('Articulo editado');

                vm.modal.hide();

                ds.jsonAll(ds.Articulo).then(function (data) {
                    vm.items = data;
                });

                fb3.upload("Articulo", vm.Articulo, vm.Articulo.id);

                fb3.download("Articulo");
            });
        });
    }

    function guardarCambios() {
        if (vm.editando) {
            editarArticulo()
        }
        else {
            crearArticulo()
        }
    }

    function leerCodigo() {
        document.addEventListener("deviceready", iniciarScanner, false);
    }

    function iniciarScanner() {
        cordova.plugins.barcodeScanner.scan(
           function (result) {

               vm.$apply(function () {
                   vm.Articulo.Codigo = result.text;
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

            vm.$apply(function () {
                vm.ImgSrc = "data:image/jpeg;base64," + imageData;
                vm.Articulo.Img = imageData;
                vm.mostrarFoto = true;
            });
        }, function (message) {
            Msg.mostrarMensaje('Fallo camara: ' + message);
        }, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    function obtenerLista(control){
        if ($.trim(control.SearchText) != "") {
            ds.getList(ds.Articulo, "Articulo", control.SearchText).then(function (data) {
                vm.items = data;
            });
        }
        else {
            ds.jsonAll(ds.Articulo).then(function (data) {
                vm.items = data;
            });
        }
    }

    function clearSearch(){
        this.SearchText = "";

        ds.jsonAll(ds.Articulo).then(function (data) {
            vm.items = data;
        });
    }

    vm.init();

});