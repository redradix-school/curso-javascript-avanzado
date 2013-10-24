/* global window, jQuery, Q */
window.fakePromise = (function() {
  "use strict";
  return {
    create: function() {
      var defer = Q.defer(),
          promise = defer.promise;
      Object.defineProperties(promise, {
        resolve: {value: defer.resolve.bind(defer) },
        reject: {value: defer.reject.bind(defer) }
      });
      return promise;
    },
    createJquery: function() {
      return new $.Deferred();
    }
  };
}(jQuery, Q));
