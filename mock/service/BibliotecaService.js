'use strict';


/**
 *
 * body CreateBibliotecaDto 
 * no response value expected for this operation
 **/
exports.bibliotecaController_create = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * returns List
 **/
exports.bibliotecaController_findAll = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "reservado" : true,
  "observacao" : "observacao",
  "isbn" : "isbn",
  "titulo" : "titulo",
  "id" : "id",
  "anoDeImpressao" : 0,
  "editora" : "editora",
  "autor" : "autor"
}, {
  "reservado" : true,
  "observacao" : "observacao",
  "isbn" : "isbn",
  "titulo" : "titulo",
  "id" : "id",
  "anoDeImpressao" : 0,
  "editora" : "editora",
  "autor" : "autor"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id String 
 * no response value expected for this operation
 **/
exports.bibliotecaController_findOne = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * id String 
 * no response value expected for this operation
 **/
exports.bibliotecaController_remove = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * body UpdateBibliotecaDto 
 * id String 
 * no response value expected for this operation
 **/
exports.bibliotecaController_update = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

