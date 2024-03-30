'use strict';

var utils = require('../utils/writer.js');
var Biblioteca = require('../service/BibliotecaService');

module.exports.bibliotecaController_create = function bibliotecaController_create (req, res, next, body) {
  Biblioteca.bibliotecaController_create(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bibliotecaController_findAll = function bibliotecaController_findAll (req, res, next) {
  Biblioteca.bibliotecaController_findAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bibliotecaController_findOne = function bibliotecaController_findOne (req, res, next, id) {
  Biblioteca.bibliotecaController_findOne(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bibliotecaController_remove = function bibliotecaController_remove (req, res, next, id) {
  Biblioteca.bibliotecaController_remove(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bibliotecaController_update = function bibliotecaController_update (req, res, next, body, id) {
  Biblioteca.bibliotecaController_update(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
