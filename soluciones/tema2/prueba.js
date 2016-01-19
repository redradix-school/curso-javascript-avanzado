"use strict";

var Prom = function() {
  var self = {},
      callback;
  self.then = function(onSuccess) {
    callback = onSuccess;
  }
  self.resolve = function() {
    callback(); 
  }
  return self;
  
}
