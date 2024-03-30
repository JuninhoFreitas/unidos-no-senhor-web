'use strict';

var utils = require('../utils/writer.js');
var Membro = require('../service/MembroService');

module.exports.membrosController_create = function membrosController_create (req, res, next, body) {
  Membro.membrosController_create(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.membrosController_findAll = function membrosController_findAll (req, res, next) {
  Membro.membrosController_findAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.membrosController_findOne = function membrosController_findOne (req, res, next, id) {
  Membro.membrosController_findOne(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.membrosController_remove = function membrosController_remove (req, res, next, id) {
  Membro.membrosController_remove(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.membrosController_update = function membrosController_update (req, res, next, body, id) {
  Membro.membrosController_update(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
