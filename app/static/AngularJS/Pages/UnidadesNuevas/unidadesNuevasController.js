registrationModule.controller('unidadesNuevasController', function($scope, $rootScope, $location, filtroRepository, alertFactory, localStorageService) {

    $rootScope.datosUsuario = localStorageService.get('userData');
    $rootScope.datosEmpresa = localStorageService.get('datosEmpresa');
    $scope.nuevasUnidades = [];
    $scope.message = 'Cargando espere por favor...';
    $scope.listUnidadesAsignacion = []
    $scope.terminarAsignacionEsquema = 0;
    $scope.fechaHoy = new Date();
    $scope.nombreFinanciera = '';

    $scope.init = function() {
        console.log($rootScope.datosEmpresa[0].idEmpresa)
        $rootScope.mostrarMenu = 1;
        $rootScope.mostrarMenuLateral = 1;
        $scope.getSucursales($rootScope.datosEmpresa[0].idEmpresa)
            //$scope.getUnidadesNuevasEmpresa($rootScope.datosEmpresa[0].idEmpresa);
    }


    $scope.getSucursales = function(idEmpresa) {
        $scope.promise = filtroRepository.getSucursales(idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
                console.log($scope.sucursales)
            } else {
                //alertFactory.info("No se encontraron Empresas");
            }
        });
    }

    $scope.getUnidadesNuevasEmpresa = function(idEmpresa) {
        $('.tabla-punteo').DataTable().destroy();
        $scope.nombreTabla = 'tabla-punteo';
        $scope.nombreModal = 'loadModal';
        $scope.nuevasUnidades = [];
        $('#loadModal').modal('show');
        $scope.promise = filtroRepository.getUnidadesNuevasEmpresa(idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.nuevasUnidades = result.data;
                $scope.totalUnidades = result.data.length;
                $scope.tabla($scope.nombreTabla, $scope.nombreModal);
            }
        });
    }

    $scope.getUnidadesNuevasEmpresa = function(idSucursal) {
        $scope.idSucursal = idSucursal;
        console.log($scope.idSucursal + ' ')
        $('.tabla-punteo').DataTable().destroy();
        $scope.nombreTabla = 'tabla-punteo';
        $scope.nombreModal = 'loadModal';
        $scope.nuevasUnidades = [];
        $('#loadModal').modal('show');
        $scope.promise = filtroRepository.getNuevasUnidadesSucursal($rootScope.datosEmpresa[0].idEmpresa, $scope.idSucursal).then(function(result) {
            if (result.data.length > 0) {
                $scope.nuevasUnidades = result.data;
                $scope.totalUnidades = result.data.length;
                $scope.tabla($scope.nombreTabla, $scope.nombreModal);
            } else {
                //alertFactory.info("No se encontraron unidads");
                $('#loadModal').modal('hide');
            }
        });
    }


    $scope.tabla = function(tabla, modal) {
        setTimeout(function() {
            $('#' + modal).modal('hide');
            $('.' + tabla).dataTable({
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

    $scope.EsquemaPorFinanciera = function(idFinanciera, nombreFinanciera) {
        $('.tabla-financieras').DataTable().destroy();
        $scope.lstEsquemasFinanciera = [];
        $scope.nombreTabla = 'tabla-financieras';
        $scope.nombreModal = 'nada';
        $scope.nombreFinanciera = nombreFinanciera;
        filtroRepository.getEsquemaFinanciera(idFinanciera).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstEsquemasFinanciera = result.data;
                $scope.tabla($scope.nombreTabla, $scope.nombreModal);
            }
        });
    }

    $scope.continuarCambio = function(object) {
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
        $scope.tabla($scope.nombreTabla, $scope.nombreModal);
    }

    $scope.regresarEsquema = function() {
        $scope.terminarAsignacionEsquema = 0;
    }

    $scope.getStringTasaFija = function(value) {
        if (value) return "FECHA";
        else return "RANGO";
    };
    
    $scope.calendario = function() {
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy"
        });
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
