"use strict";

var Prom = window.Prom = function() {
  var self = {};
      callback;
  self.then = function(onSuccess) {
    callback = onSuccess;
  }
  self.resolve = function() {
    callback(arguments);  
  }

  return self;
}
