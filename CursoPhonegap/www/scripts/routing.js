app.Angular.config(['$routeProvider', '$controllerProvider',
    function($routeProvider, $controllerProvider) {
    // remember mentioned function for later use
        app.Angular.registerCtrl = $controllerProvider.register;
            //your routes
        // route for the home page
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        });

        // route for the about page
        $routeProvider.when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        });

        // route for the contact page
        $routeProvider.when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }
]);