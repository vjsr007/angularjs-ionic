//@ sourceURL=userController.js
app.Angular.registerCtrl('userController', function ($scope, $ionicSlideBoxDelegate, DatabaseService) {

    DatabaseService.load();

    $scope.addUser = function () {        

        var User = new DatabaseService.User;

        User.UserName($scope.UserName);
        User.Name($scope.Name);
        User.Active($scope.Active);

        DatabaseService.addRow(User);
    }

});