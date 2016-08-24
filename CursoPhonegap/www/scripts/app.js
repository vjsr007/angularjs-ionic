angular.module('MandaditoShop.Appliedsw.com', ['ionic', 'MandaditoShop.Appliedsw.com.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider, $stateProvider,
          $controllerProvider, $compileProvider, $filterProvider, $provide) {

    angular.registerController = $controllerProvider.register;
    angular.registerService = $provide.service;
    angular.registerFilter = $filterProvider.register;
    angular.registerFactory = $provide.factory;
    angular.registerDirective = $compileProvider.directive

    function resolveDependencies($q, $rootScope, dependencies) {
        var defer = $q.defer();

        require(dependencies, function () {
            defer.resolve();
            $rootScope.$apply()
        });

        return defer.promise;
    };

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'homeController',
        controllerAs: 'vm',
        resolve: ['$q', '$rootScope', function ($q, $rootScope) {
            var dependencies = [
                'scripts/service/Msg.js',
                'scripts/controller/homeController.js'];
            return resolveDependencies($q, $rootScope, dependencies);
        }]
    })
    .state('listas', {
        url: '/listas',
        templateUrl: 'views/listas.html',
        controller: 'listasController',
        controllerAs: 'vm',
        resolve: ['$q', '$rootScope', function ($q, $rootScope) {
            var dependencies = [
                'scripts/service/Msg.js',
                'scripts/service/DatabaseService.js',
                'scripts/controller/listasController.js'
            ];
            return resolveDependencies($q, $rootScope, dependencies);
        }]
    })
    .state('lista', {
        url: '/lista',
        templateUrl: 'views/lista.html',
        controller: 'listaController',
        controllerAs: 'vm',
        resolve: ['$q', '$rootScope', function ($q, $rootScope) {
            var dependencies = [
                'scripts/service/Msg.js',
                'scripts/service/DatabaseService.js',
                'scripts/controller/listaController.js'
            ];
            return resolveDependencies($q, $rootScope, dependencies);
        }]
    })
    .state('articulo', {
        url: '/articulo',
        templateUrl: 'views/articulo.html',
        controller: 'articuloController',
        controllerAs: 'vm',
        resolve: ['$q', '$rootScope', function ($q, $rootScope) {
            var dependencies = [
                'scripts/service/Msg.js',
                'scripts/service/DatabaseService.js',
                'scripts/controller/articuloController.js'
            ];
            return resolveDependencies($q, $rootScope, dependencies);
        }]
    })
    .state('articulos', {
        url: '/articulos',
        templateUrl: 'views/articulos.html',
        controller: 'articulosController',
        controllerAs: 'vm',
        resolve: ['$q', '$rootScope', function ($q, $rootScope) {
            var dependencies = [
                'scripts/service/Msg.js',
                'scripts/service/DatabaseService.js',
                'scripts/directive/uiCurrency.js',
                'scripts/controller/articulosController.js'
            ];
            return resolveDependencies($q, $rootScope, dependencies);
        }]
    });

  $urlRouterProvider.otherwise('/');

});