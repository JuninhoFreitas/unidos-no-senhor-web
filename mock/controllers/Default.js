'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.appController_getHello = function appController_getHello (req, res, next) {
  Default.appController_getHello()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventosController_create = function eventosController_create (req, res, next, body) {
  Default.eventosController_create(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventosController_findAll = function eventosController_findAll (req, res, next) {
  Default.eventosController_findAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventosController_findOne = function eventosController_findOne (req, res, next, id) {
  Default.eventosController_findOne(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventosController_remove = function eventosController_remove (req, res, next, id) {
  Default.eventosController_remove(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventosController_update = function eventosController_update (req, res, next, body, id) {
  Default.eventosController_update(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listaDePresencaController_createParticipante = function listaDePresencaController_createParticipante (req, res, next, body) {
  Default.listaDePresencaController_createParticipante(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listaDePresencaController_findAll = function listaDePresencaController_findAll (req, res, next, limit, offset, evento_id, participante_id, responsavel_id) {
  Default.listaDePresencaController_findAll(limit, offset, evento_id, participante_id, responsavel_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listaDePresencaController_findOne = function listaDePresencaController_findOne (req, res, next, id) {
  Default.listaDePresencaController_findOne(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listaDePresencaController_listParticipantes = function listaDePresencaController_listParticipantes (req, res, next, limit, offset, nome) {
  Default.listaDePresencaController_listParticipantes(limit, offset, nome)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listaDePresencaController_remove = function listaDePresencaController_remove (req, res, next, id) {
  Default.listaDePresencaController_remove(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listaDePresencaController_updateParticipante = function listaDePresencaController_updateParticipante (req, res, next, body, id) {
  Default.listaDePresencaController_updateParticipante(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listaDePresencaController_upsert = function listaDePresencaController_upsert (req, res, next, body) {
  Default.listaDePresencaController_upsert(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tokenController_getRoles = function tokenController_getRoles (req, res, next) {
  Default.tokenController_getRoles()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tokenController_refreshToken = function tokenController_refreshToken (req, res, next) {
  Default.tokenController_refreshToken()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
