var InsertManagerView = require('../views/reference'),
    InsertManagerModel = require('../models/dataAccess'),
    moment = require('moment');


    var InsertManager = function(conf) {
    this.conf = conf || {};

    this.view = new InsertManagerView();
    this.model = new InsertManagerModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


InsertManager.prototype.post_insertmovementscheme = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idUnidad', value: req.body.idUnidad, type: self.model.types.INT },
        { name: 'idFinanciera', value: req.body.idFinanciera, type: self.model.types.DECIMAL },
        { name: 'fecha', value: req.body.fecha, type: self.model.types.STRING },
        { name: 'cargo', value: req.body.cargo, type: self.model.types.DECIMAL },
        { name: 'abono', value: req.body.abono, type: self.model.types.DECIMAL }
    ];
    this.model.post('INS_MOVIMIENTO_ESQUEMA_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};



module.exports = InsertManager;