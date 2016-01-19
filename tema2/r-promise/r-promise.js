"use strict";

var Prom = function() {
  var self = {_isPromise: true},
      state,
      args,
      onSucc= [],
      onErr = [];
  self.then = function(onSuccess, onError) {
    var nextPromise = new Prom(),
        onResolve = function() {
          if (typeof onSuccess == "function") {
            try {
              var result = onSuccess.apply({}, arguments);
              if (result && result.isPromise) {
                result.then(
                   nextPromise.resolve.bind(nextPromise),
                   nextPromise.reject.bind(nextPromise));
              } else { 
                nextPromise.resolve(result);
              }
            } catch(e) {
              nextPromise.reject(e);
            }
          }
        },
        onReject = function() {
          if (typeof onError == "function") {
            try {
              var result = onError.apply({}, arguments);
              if (result && result.isPromise) {
                result.then(
                   nextPromise.resolve.bind(nextPromise),
                   nextPromise.reject.bind(nextPromise));
              } else {
                nextPromise.resolve(result);
              }
            } catch(e) {
              nextPromise.reject(e);
            }
          } else {
            nextPromise.reject.apply(nextPromise, arguments);
          }
        }
    if (state === undefined) {
      onSucc.push(onResolve);
      onErr.push(onReject);
    } else if (state) {
      onResolve.apply({}, args);
    } else {
      onReject.apply({}, args);
    }
    return nextPromise;
  }
  self.resolve = function() {
    if (state !== undefined) {return;} 
    state = true;
    args = [].slice.call(arguments);
    onSucc.forEach(function(fn) {
      fn.apply({}, args);
    })
  }
  self.reject = function() {
    if (state !== undefined) {return;} 
    state = false;
    args = [].slice.call(arguments);
    onErr.forEach(function(fn) {
      fn.apply({}, args);
    })
  }
  return self;
}

Prom.all = function(promises) {
  var allPromise = new Prom(),
      results = []
      cont = promises.length;
  promises.forEach(function(promise) {
    promise.then(function(r) {
      cont--;
      results[i] = r;
      if (!cont) {allPromise.resolve(results);}
    }, function(e) {
     allPromise.reject(e); 
    });
  }, i);
  return allPromise;
}
