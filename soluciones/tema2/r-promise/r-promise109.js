"use strict";

var Prom = window.Prom = function() {
  var self = {},
      state, 
      args,
      onSuc = [],
      onErr = [];

  self.then = function(onSuccess, onError) {
    if (state === undefined) {
      onSuc.push(onSuccess);
      onErr.push(onError);
    } else if (state) {
      onSuccess.apply({}, args); 
    } else {
      onError.apply({}, args);
    }
  }
  self.resolve = function() {
    if (state !== undefined) {return;}
    args = arguments;
    state = true;
    onSucc.forEach(function(fn) {
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
