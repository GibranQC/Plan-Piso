var filtrosURL = global_settings.urlCORS + 'api/filtros/';


registrationModule.factory('filtroRepository', function($http) {
    return {
        getEmpresa: function() {
            return $http({
                url: filtrosURL + 'empresa/',
                method: "GET"
            });
        },
        getUnidadesNuevasSinEsquema: function() {
            return $http({
                url: filtrosURL + 'unidadesNuevasSinEsquema/',
                method: "GET"
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
