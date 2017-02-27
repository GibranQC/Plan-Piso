// -- =============================================
// -- Author:      Gibran 
// -- Create date: 05/09/2016
// -- Description: Is the container of the application
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute", "cgBusy","LocalStorageModule"])
    .config(function($routeProvider, $locationProvider) {

        /*cheange the routes*/
        $routeProvider.when('/', {
            templateUrl: 'AngularJS/Pages/login/login.html', //example 1
        //     params: {
        //     mostrar: true
        // }
            controller: 'loginController'
        });

        $routeProvider.when('/home', {
            templateUrl: 'AngularJS/Pages/Home/home.html', //example 1
        //     params: {
        //     mostrar: true
        // }
            controller: 'homeController'
        });

        $routeProvider.when('/unidadesNuevas', {
            templateUrl: 'AngularJS/Pages/unidadesNuevas/unidadesNuevas.html', //example 1
        //     params: {
        //     mostrar: true
        // }
            controller: 'unidadesNuevasController'
        });
        $routeProvider.otherwise({redirectTo:'/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed             
        });
        changeHeight(); // when page loads          
    };
});
registrationModule.run(function($rootScope) {
    $rootScope.var = "full";

})
