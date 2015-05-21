"use strict";

var Prom = window.Prom = function() {
  var self = {},
      state, 
      args,
      onSuc = [],
      onErr = [];

  self.then = function(onSuccess, onError) {
     // Ya no hay que ejecutar el onSuccess, sino, un decorador que se encargue de resolver la siguiente promesa
    var nextPromise = new Prom(),
        onResolve = function() {
          var result = onSuccess.apply({}, arguments);
          nextPromise.resolve(result);
        }
    if (state === undefined) {
      onSuc.push(onResolve);
      onErr.push(onError);
    } else if (state) {
      onResolve.apply({}, args); 
    } else {
      onReject.apply({}, args);
    }
    return nextPromise;
  }
  self.resolve = function() {
    if (state !== undefined) {return;}
    args = arguments;
    state = true;
    onSuc.forEach(function(fn) {
      fn.apply({}, args);  
    });
  }

  self.reject = function() {
    if (state !== undefined) {return;}
    args = arguments;
    state = false;
    onErr.forEach(function(fn) {
      fn.apply({}, args);
    });
  }

  return self;
}
