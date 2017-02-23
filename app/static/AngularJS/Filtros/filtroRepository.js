var filtrosURL = global_settings.urlCORS + 'api/filtros/';


registrationModule.factory('filtroRepository', function($http) {
    return {
        getEmpresa: function() {
            return $http({
                url: filtrosURL + 'empresa/',
                method: "GET"
            });
        },
        getSucursales: function (idEmpresa) {
            return $http({
                url: filtrosURL + 'sucursales/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getUnidadesNuevasEmpresa: function(idEmpresa) {
            return $http({
                url: filtrosURL + 'unidadesNuevasEmpresa/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getNuevasUnidadesSucursal: function(idEmpresa, idSucursal) {
            return $http({
                url: filtrosURL + 'nuevasUnidadesSucursal/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa,
                    idSucursal: idSucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getFinanciera: function () {
            return $http({
                url: filtrosURL + 'financiera/',
                method: "GET"
            });
        },
        getEsquemaFinanciera: function (idFinanciera) {
            return $http({
                url: filtrosURL + 'esquemafinanciera/',
                method: "GET",
                params: {
                    idFinanciera: idFinanciera
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        }
    }

});
