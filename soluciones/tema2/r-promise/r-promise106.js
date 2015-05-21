"use strict";

var Prom = window.Prom = function() {
  var self = {},
      callbacks = [];
  self.then = function(onSuccess) {
    callbacks.push(onSuccess);
  }
  self.resolve = function() {
    var args = arguments
    callbacks.forEach(function(fn) {
      fn.apply({}, args);  
    });
  }

  return self;
}
