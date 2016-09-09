angular.registerDirective('loadImage', function () {
    return {
        restrict: 'E',
        template: '<img ng-src="data:image/jpeg;base64,{{ item.Img}}" id="imgArticulo" style="width:70%; height:auto; " />',
    }
});