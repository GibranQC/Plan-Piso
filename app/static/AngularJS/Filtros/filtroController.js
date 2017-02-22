registrationModule.controller('filtroController', function($scope, $rootScope, $location, filtroRepository, alertFactory, localStorageService) {
   
    $rootScope.datosUsuario = localStorageService.get('userData');

    $scope.init = function() {
        // $rootScope.mostrarMenu = 1;
        // console.log($scope.datosUsuario.nombre)
        // console.log($scope.datosUsuario)
    }
});