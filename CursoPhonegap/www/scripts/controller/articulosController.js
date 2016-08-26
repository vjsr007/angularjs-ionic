"use strict";
angular
.registerController('articulosController', function ($scope, Msg, DatabaseService, $ionicModal) {
    var vm = $scope;
      
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
        DatabaseService.load();

        $ionicModal.fromTemplateUrl('views/articulo.html', {
            scope: vm
        }).then(function (modal) {
            vm.modal = modal;
        });

        vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
    }    

    function openModal() {
        vm.ImgSrc = "";
        vm.mostrarFoto = false;
        vm.modal.show();
    };

    function crearArticulo() {
        var Articulo = new DatabaseService.Articulo(vm.Articulo);

        DatabaseService.saveRow(Articulo, function () {
            Msg.mostrarMensaje('Articulo agregado');

            vm.Articulo = {};

            vm.modal.hide();

            vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
        });
    }

    function moveItem(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);

        Msg.mostrarMensaje('Moved Item: ' + item.id + ' From: ' + fromIndex + ' To: ' + toIndex);
    }

    function eliminarArticulo(item) {
        DatabaseService.getById(DatabaseService.Articulo, item.id, function (Articulo) {
            DatabaseService.removeRow(Articulo, function () {
                Msg.mostrarMensaje('Articulo eliminado');
                vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
            });
        });        
    }

    function editarModal(item) {
        DatabaseService.getById(DatabaseService.Articulo, item.id, function (result) {
            vm.Articulo = result.toJSON();
            vm.ImgSrc = "data:image/jpeg;base64," + vm.Articulo.Img;
            vm.mostrarFoto = true;
            vm.editando = true;
        
            vm.modal.show();
        });
    }

    function editarArticulo() {
        DatabaseService.getById(DatabaseService.Articulo, vm.Articulo.id, function (Articulo) {

            var a = vm.Articulo;

            Articulo.Codigo(a.Codigo);
            Articulo.Articulo(a.Articulo);
            Articulo.Departamento(a.Departamento);

            Articulo.Categoria(a.Categoria);
            Articulo.Marca(a.Marca);
            Articulo.Precio(a.Precio);

            Articulo.Img(a.Img);
            Articulo.Active(a.Active);

            DatabaseService.saveRow(Articulo, function () {
                Msg.mostrarMensaje('Articulo editado');

                vm.Articulo = {};

                vm.modal.hide();

                vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
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
            vm.items = DatabaseService.getList(DatabaseService.Articulo, "Articulo", $.trim(control.SearchText));
        }
        else {
            vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
        }
    }

    function clearSearch(){
        this.SearchText = "";

        vm.items = DatabaseService.jsonAll(DatabaseService.Articulo);
    }

    vm.init();

});