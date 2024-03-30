'use strict';

var utils = require('../utils/writer.js');
var Usuario = require('../service/UsuarioService');

module.exports.usuarioController_cadastrar = function usuarioController_cadastrar (req, res, next, body) {
  Usuario.usuarioController_cadastrar(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioController_delete = function usuarioController_delete (req, res, next, id) {
  Usuario.usuarioController_delete(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioController_listar = function usuarioController_listar (req, res, next) {
  Usuario.usuarioController_listar()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioController_login = function usuarioController_login (req, res, next) {
  Usuario.usuarioController_login()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioController_loginToken = function usuarioController_loginToken (req, res, next) {
  Usuario.usuarioController_loginToken()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuarioController_updateUsuario = function usuarioController_updateUsuario (req, res, next, body, id) {
  Usuario.usuarioController_updateUsuario(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
