app.Angular.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        })

        .otherwise({ redirectTo: '/' });
});

app.Angular.controller('mainController', function ($scope) {
    $scope.message = 'Everyone come and see how good I look!';
});

app.Angular.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

app.Angular.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});