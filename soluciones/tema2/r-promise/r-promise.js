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
        //on resolve es LO que se va a ejecutar cuando el proveedor de la promesa haga el resolve
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

Promise.all = function(promises) {
  var left = promises.length,
      results = [],
      allProm = new Prom();
  promises.forEach(fuction(p, i) {
      p.then(function(v) {
          left--;
          results[i] = v;
          if (left === 0) allProm.resolve(results);
      }, function(e) {
          allProm.reject(e);
      });
  });
  return allProm;
};
