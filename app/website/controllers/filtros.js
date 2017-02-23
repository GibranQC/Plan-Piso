var FiltrosView = require('../views/reference'),
    FiltrosModel = require('../models/dataAccess'),
    moment = require('moment');


    var Filtros = function(conf) {
    this.conf = conf || {};

    this.view = new FiltrosView();
    this.model = new FiltrosModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Filtros.prototype.get_empresa = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_sucursales = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];
    this.model.query('SEL_SUCURSAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Filtros.prototype.get_financiera = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_FINANCIERAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_esquemaFinanciera = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idFinanciera', value: req.query.idFinanciera, type: self.model.types.INT }];

    this.model.query('SEL_ESQUEMA_FINACIERA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Filtros.prototype.get_unidadesNuevasEmpresa = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_UNIDADES_NUEVAS_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// Muestra las unidades sin esquema por sucursal
Filtros.prototype.get_nuevasUnidadesSucursal = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT }
    ];

    this.model.query('SEL_UNIDADES_NUEVAS_SUCURSAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Filtros;