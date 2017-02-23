registrationModule.controller('unidadesNuevasController', function($scope, $rootScope, $location, filtroRepository, alertFactory, localStorageService) {

    $rootScope.datosUsuario = localStorageService.get('userData');
    $rootScope.datosEmpresa = localStorageService.get('datosEmpresa');
    $scope.nuevasUnidades = [];
    $scope.message = 'Cargando espere por favor...';
    $scope.listUnidadesAsignacion = []
    $scope.terminarAsignacionEsquema = 0;
    $scope.fechaHoy = new Date();
    $scope.nombreFinanciera ='';

    $scope.init = function() {
        $rootScope.mostrarMenu = 1;
        $rootScope.mostrarMenuLateral = 1;
        $scope.getUnidadesNuevasSinEsquema();
    }

    $scope.getUnidadesNuevasSinEsquema = function() {
        $('.tabla-punteo').DataTable().destroy();
        $scope.nombreTabla = 'tabla-punteo';
        $scope.nombreModal = 'loadModal';
        $scope.nuevasUnidades = [];
        $('#loadModal').modal('show');
        $scope.promise = filtroRepository.getUnidadesNuevasSinEsquema().then(function(result) {
            if (result.data.length > 0) {
                $scope.nuevasUnidades = result.data;
                $scope.tabla($scope.nombreTabla,$scope.nombreModal);
            }
        });
    }

    $scope.tabla = function(tabla,modal) {
        setTimeout(function() {
            $('#'+modal).modal('hide');
            $('.'+tabla).dataTable({
                destroy: true,
                "responsive": true,
                "language": {
                    "paginate": {
                        "previous": '<i class="demo-psi-arrow-left"></i>',
                        "next": '<i class="demo-psi-arrow-right"></i>'
                    }
                },
                searching: true,
                paging: true,
                autoFill: true
            });
        }, 500);
    };

    $scope.AsignarEsquema = function(object) {
    	$('.tabla-financieras').DataTable().destroy();
		$('.tabla-resumenUnidades').DataTable().destroy();
    	$scope.listUnidadesAsignacion = [];
    	$scope.lstEsquemasFinanciera = [];
    	$scope.getFinanciera();
    	$('#asignacionEsquema').modal('show');
    	$scope.terminarAsignacionEsquema = 0;
        
        angular.forEach(object, function(value, key) {
            if (value.check == true) {
                $scope.listUnidadesAsignacion.push({
                    idUnidad: value.idUnidad,
                    vehNumserie: value.vehNumserie,
                    valorInventario: value.valorInventario

                })
            }
        });
        //console.log($scope.listUnidadesAsignacion)
    }

    $scope.terminarAsignacion = function() {
        $scope.getUnidadesNuevasSinEsquema();
        $scope.listUnidadesAsignacion = [];
        $('#asignacionEsquema').modal('hide');
    }

    $scope.getFinanciera = function() {
    	$scope.financiera = [];
        $scope.promise = filtroRepository.getFinanciera().then(function(result) {
                if (result.data.length > 0) {
                    $scope.financiera = result.data;
                }
            })
        };

   	$scope.EsquemaPorFinanciera = function(idFinanciera,nombreFinanciera){
   		$('.tabla-financieras').DataTable().destroy();
   		$scope.lstEsquemasFinanciera=[];	
   		$scope.nombreTabla = 'tabla-financieras';
   		$scope.nombreModal = 'nada';
   		$scope.nombreFinanciera = nombreFinanciera;
   		filtroRepository.getEsquemaFinanciera(idFinanciera).then(function(result) {
   			if(result.data.length > 0){
   				$scope.lstEsquemasFinanciera = result.data;
   				$scope.tabla($scope.nombreTabla,$scope.nombreModal);
   			}
   		});
   	}

   	$scope.continuarCambio = function(object){
   		$('.tabla-resumenUnidades').DataTable().destroy();
   		$scope.nombreTabla = 'tabla-resumenUnidades';
   		$scope.nombreModal = 'nada';
   		$scope.terminarAsignacionEsquema = 1;
   		angular.forEach(object, function(value, key) {
            if (value.check == true) {
                $scope.nombreEsquema = value.nombre;
                $scope.idEsquema = value.idEsquema;
            }
        });
   		$scope.tabla($scope.nombreTabla,$scope.nombreModal);
   	}

   	$scope.regresarEsquema = function(){
   		$scope.terminarAsignacionEsquema = 0;
   	}






});
// 		idUnidad
//      vehNumserie
//       tipoUnidad
//       colorInterior
//       colorExterior
//       modelo
//       descModelo
//       marca
//       segmento
//       ubtipoUnidad
//       uncIdcatalo
//       carLine
//       puertas
//       cilindros
//       uncPotencia
//       combustible
//       capacidad
//       transmision
//       ubicacion
//       tipomotor
//       noMotor
//       procedencia
//       vehNofactplan
//       vehFecremision
//       numPedimento
//       fechaPedimento
//       tipoCompra
//       vehFecrecibo
//       diasInventa
//       precioLista
//       valorInventario
// 	  situacion
// 	  idEsquema
// 	  idEmpresa
// 	  idSucursal
// 	  idEstatus
// 	  fechaCalculo
// 	  saldo
// 	  fectiva
