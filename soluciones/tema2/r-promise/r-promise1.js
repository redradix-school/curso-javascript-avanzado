"use strict";

var Prom = window.Prom = function() {
  var self = {},
      callback = [];
  self.then = function(onSuccess) {
    callback.push(onSuccess);
  }
  self.resolve = function() {
    var args = arguments;
    callback.forEach(function(fn) {
      fn.apply({}, args); 
    });
  }

  return self;
}
