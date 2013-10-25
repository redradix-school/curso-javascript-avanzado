/*global window*/
"use strict";

var Prom = window.Prom = function() {
  var self = {_isPromise: true},
      onSuc = [],
      onErr = [],
      args,
      state;

  self.then = function(onSuccess, onError) {
    /* .then siempre devuelve una promesa */
    var nextPromise = new Prom(),
        onResolve = function() {
          var result;
          if (typeof onSuccess === "function") {
            try {
              result = onSuccess.apply({}, arguments);
            } catch (e) {
              nextPromise.reject(e);
            }
          }
          if (result && result._isPromise) {
            result.then(
              nextPromise.resolve.bind(nextPromise),
              nextPromise.reject.bind(nextPromise)
            );
          } else {
            nextPromise.resolve(result);
          }
        },
        onReject = function() {
          var result;
          if (typeof onError === "function") {
            try {
              result = onError.apply({}, arguments);
            } catch (e) {
              nextPromise.reject(e);
            }
            if (result && result._isPromise) {
              result.then(
                nextPromise.resolve.bind(nextPromise),
                nextPromise.reject.bind(nextPromise)
              );
            } else {
              nextPromise.resolve(result);
            }
          } else {
            nextPromise.reject.apply(nextPromise, arguments);
          }
        };
    if (state === undefined) {
      /* propagar el OK */
      onSuc.push(onResolve);
      /* manejar el error o propagarlo  */
      onErr.push(onReject);
    } else if (state) {
      /* La promesa ya está resulta */
      onResolve.apply({}, args);
    } else {
      /* La promesa ya ha sido rechazada */
      onReject.apply({}, args);
    }
    return nextPromise;
  };

  self.resolve = function() {
    if (state !== undefined) { return; }
    args = arguments;
    state = true;
    onSuc.forEach(function(cb) {
      cb.apply({}, args);
    });
  };

  self.reject = function() {
    if (state !== undefined) { return; }
    args = arguments;
    state = false;
    onErr.forEach(function(cb) {
      cb.apply({}, args);
    });
  };

  return self;
};

