registrationModule.controller('homeController', function($scope, $rootScope, $location,filtroRepository, homeRepository, alertFactory, localStorageService) {
   
    $rootScope.datosUsuario = localStorageService.get('userData');
    $rootScope.idEmpresa = '';
    $scope.empresaDatos = [];

    $scope.init = function() {
        $rootScope.mostrarMenu = 1;
        $rootScope.mostrarMenuLateral = 0;
        $scope.getEmpresa();
    }

    // Función para filtrar compañias
    $scope.getEmpresa = function () {
        $scope.promise = filtroRepository.getEmpresa().then(function (result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;
            } else {
                alertFactory.info("No se encontraron Empresas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Empresas");
        });
    };

    $scope.SeleccionarEmpresa = function(idEmpresa,nombreEmpresa){
    	localStorageService.clearAll('datosEmpresa');
    	$scope.empresaDatos.push({idEmpresa: idEmpresa, nombreEmpresa :nombreEmpresa})
    	console.log($scope.empresaDatos)
    	localStorageService.set('datosEmpresa', $scope.empresaDatos);
        location.href = '/unidadesNuevas';

    }
});