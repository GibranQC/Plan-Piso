var filtrosURL = global_settings.urlCORS + 'api/filtros/';


registrationModule.factory('filtroRepository', function($http) {
    return {
        getEmpresa: function() {
            return $http({
                url: filtrosURL + 'empresa/',
                method: "GET"
            });
        }

    }

});
