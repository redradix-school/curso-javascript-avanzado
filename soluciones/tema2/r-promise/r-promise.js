/* global window */
"use strict";

var Defer = window.Defer = function() {
  var self = {promise: {_isPromise: true}},
      onSuc = [],
      onErr = [],
      state,
      vals;

  self.promise.then = function(onSuccess, onError) {
    var nextDefer;
    /* Invocación inmediata si está resuelta */
    if (state !== undefined) {
      return (state? onSuccess : onError).apply({}, vals);
    }
    /* Promesa a devolver */
    nextDefer = new Defer();
    /* Guardamos un callback de éxito */
    onSuc.push(function() {
      var result;
      if (onSuccess) {
        try {
          result = onSuccess.apply({}, arguments);
        } catch(e) {
          /* excepción en el bloque! */
          nextDefer.reject(e);
        }
        if (result && result._isPromise) {
          /* si result es una promesa, esperamos a que se resuelva/rechace */
          result.then(nextDefer.resolve.bind(nextDefer),
                      nextDefer.reject.bind(nextDefer));
        } else {
          /* si no, resolvemos la promesa devuelta */
          nextDefer.resolve(result);
        }
      } else {
        /* no tiene manejador, delegamos a la devuelta */
        nextDefer.resolve.apply(nextDefer, arguments);
      }
    });
    /* Captura o falla en cascada */
    onErr.push(function() {
      if (onError) {
        /* aplicamos el callback de error y damos el error por manejado */
        nextDefer.resolve(onError.apply({}, arguments));
      } else {
        /* no tiene manejador, delegamos a la devuelta */
        nextDefer.reject.apply(nextDefer, arguments);
      }
    });
    /* .then siempre devuelve una nueva promesa */
    return nextDefer.promise;
  };

  self.resolve = function() {
    if (state !== undefined) { return; }
    state = true;
    vals = arguments;
    onSuc.forEach(function(cb) { cb.apply({}, vals); });
  };

  self.reject = function() {
    if (state !== undefined) { return; }
    state = false;
    vals = arguments;
    onErr.forEach(function(cb) { cb.apply({}, vals); });
  };

  return self;
};
