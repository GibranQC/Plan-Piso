registrationModule.controller('loginController', function($scope, $rootScope, $location, loginRepository, alertFactory, localStorageService) {
    $rootScope.datosUsuario = '';
 
    $scope.init = function() {
        $rootScope.mostrarMenu = 0;
        $rootScope.mostrarMenuLateral = 0;
        // localStorageService.set('glbInterestEmpresa',null) ;
        // localStorageService.set('glbSchemeFinanciera',null) ;
        // localStorageService.set('glbNewUnitsEmpresa',null) ;
        // localStorageService.clearAll('userData');
        // localStorageService.clearAll('lgnUser');
        // if (!($('#lgnUser').val().indexOf('[') > -1)) {
        //         localStorageService.set('lgnUser', $('#lgnUser').val());
        //         $scope.getEmpleado();
        //         location.href = '/newUnits';
        //     } else {
        //         if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
        //             if (getParameterByName('employee') != '') {
        //                 $rootScope.currentEmployee = getParameterByName('employee');
        //                 location.href = '/newUnits';
        //             } else {
        //                 alert('Inicie sesión desde panel de aplicaciones o desde el login.');
        //             }

        //         }
        //     }
        // $rootScope.currentEmployee = localStorageService.get('lgnUser');
    }
    // Función para traer el nombre del usuario
        $scope.getEmpleado = function(){
            loginRepository.getEmpleado($rootScope.currentEmployee).then(function (result) {
            if (result.data.length > 0) {
                $scope.datosUsuario = result.data;
                localStorageService.set('userData', $scope.datosUsuario);
              } else {
                alertFactory.info("Datos Incorrectos");
            }
        }, function (error) {
            alertFactory.error("Datos no correctos");
        });
    };
        // Función para iniciar sesión sin control de aplicaciones
        $scope.login = function(usuario, password){
        $scope.promise = loginRepository.getValidaUsuario(usuario, password).then(function (result) {
            if (result.data.length > 0) {
                //alertFactory.success("Bienvenido a Plan Piso"+ result.data[0].usuario);
                $rootScope.datosUsuario = result.data[0];
                localStorageService.clearAll('lgnUser');
                localStorageService.set('userData', $rootScope.datosUsuario);
                //$rootScope.mostrarMenu = 1;
                location.href = '/home';
            } else {
                //alertFactory.info("Datos Incorrectos");
            }
        });
    }
});
