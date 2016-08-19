app.Angular.service('Msg', function ($ionicPopup) {
    "use strict";

    var Titulo = "";
    var Subtitulo = "";

    this.mostrarConfirmar = function (mensaje, titulo, subtitulo, data) {
        var getType = {};
        var callback = arguments ? arguments[arguments.length - 1] : null;
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: mensaje ? (callback && getType.toString.call(mensaje) == '[object Function]' ? "" : mensaje) : "",
            title: titulo ? (callback && getType.toString.call(titulo) == '[object Function]' ? Titulo : titulo) : Titulo,
            subTitle: subtitulo ? (callback && getType.toString.call(subtitulo) == '[object Function]' ? Subtitulo : subtitulo) : Subtitulo,
            scope: this,
            buttons: [
              { text: 'Cancelar' },
              {
                  text: '<b>Aceptar</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      e.preventDefault();
                      
                      if (callback) if (callback && getType.toString.call(callback) == '[object Function]') callback(data);
                  }
              }
            ]
        });
        myPopup.then(function (res) {
            console.log('Click Aceptar', res);
        });
        if ($timeout) {
            $timeout(function () {
                myPopup.close();
            }, 3000);
        }
    };

    this.mostrarMensaje = function (mensaje, titulo, data) {
        var getType = {};
        var callback = arguments ? arguments[arguments.length - 1] : null;

        var alertPopup = $ionicPopup.alert({
            template: mensaje ? (callback && getType.toString.call(mensaje) == '[object Function]' ? "" : mensaje) : "",
            title: titulo ? (callback && getType.toString.call(titulo) == '[object Function]' ? Titulo : titulo) : Titulo,
        });
        alertPopup.then(function (res) {            
            if (callback) if (callback && getType.toString.call(callback) == '[object Function]') callback(data);
        });
    };

});