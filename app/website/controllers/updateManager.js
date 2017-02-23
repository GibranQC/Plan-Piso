var UpdateManagerView = require('../views/reference'),
    UpdateManagerModel = require('../models/dataAccess'),
    moment = require('moment');


    var UpdateManager = function(conf) {
    this.conf = conf || {};

    this.view = new UpdateManagerView();
    this.model = new UpdateManagerModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

// Actualiza el esquema nuevo a las unidades nuevas
UpdateManager.prototype.post_updateschemenews = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};

    var params = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables

    var params = [{ name: 'idEsquema', value: req.body.idEsquema, type: self.model.types.INT },
        { name: 'vehNumserie', value: req.body.vehNumserie, type: self.model.types.STRING }
    ];
    this.model.post('UPD_ESQUEMA_UNIDAD_NUEVA_SP', params, function(error, result) {
        //Callback

        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
}


module.exports = UpdateManager;