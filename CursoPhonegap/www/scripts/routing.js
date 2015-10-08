app.Angular.config(['$routeProvider', '$controllerProvider',
    function($routeProvider, $controllerProvider) {
        app.Angular.registerCtrl = $controllerProvider.register;

        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        });

        $routeProvider.when('/ubicacion', {
                templateUrl: 'views/ubicacion.html',
                controller: 'ubicacionController'
            });

        $routeProvider.when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        });

        $routeProvider.when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }
]);