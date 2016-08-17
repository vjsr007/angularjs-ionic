app.Angular.config(['$routeProvider', '$controllerProvider',
    function($routeProvider, $controllerProvider) {
        app.Angular.registerCtrl = $controllerProvider.register;

        var resolveDependencies = function ($q, $rootScope, dependencies) {
            var defer = $q.defer();
            require(dependencies, function () {
                defer.resolve();
                $rootScope.$apply()
            });

            return defer.promise;
        };

        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController',
            resolve: {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var dependencies = ['scripts/controller/mainController.js'];
                    return resolveDependencies($q, $rootScope, dependencies);
                }]
            }
        });

        $routeProvider.when('/ubicacion', {
                templateUrl: 'views/ubicacion.html',
                controller: 'ubicacionController',
                resolve: {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = ['scripts/controller/ubicacionController.js'];
                        return resolveDependencies($q, $rootScope, dependencies);
                    }]
                }
            });

        $routeProvider.when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController',
            resolve: {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var dependencies = ['scripts/controller/aboutController.js'];
                    return resolveDependencies($q, $rootScope, dependencies);
                }]
            }
        });

        $routeProvider.when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController',
            resolve: {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var dependencies = ['scripts/controller/contactController.js'];
                    return resolveDependencies($q, $rootScope, dependencies);
                }]
            }
        });

        $routeProvider.when('/camara', {
            templateUrl: 'views/camara.html',
            controller: 'camaraController',
            resolve: {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var dependencies = ['scripts/controller/camaraController.js'];
                    return resolveDependencies($q, $rootScope, dependencies);
                }]
            }
        });

        $routeProvider.when('/barcode', {
            templateUrl: 'views/barcode.html',
            controller: 'barcodeController',
            resolve: {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    var dependencies = ['scripts/controller/barcodeController.js'];
                    return resolveDependencies($q, $rootScope, dependencies);
                }]
            }
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }
]);