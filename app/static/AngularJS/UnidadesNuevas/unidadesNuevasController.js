registrationModule.controller('unidadesNuevasController', function($scope, $rootScope, $location, filtroRepository, alertFactory, localStorageService) {

    $rootScope.datosUsuario = localStorageService.get('userData');
    $rootScope.datosEmpresa = localStorageService.get('datosEmpresa');

    $scope.init = function() {
        $rootScope.mostrarMenu = 1;
        $rootScope.mostrarMenuLateral = 1;
    }

});
