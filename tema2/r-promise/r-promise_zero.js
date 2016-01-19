window.Prom = function() {
  var self = {},
      state,
      args,
      callbacks = [];

  self.then = function(onSuccess) {
    if (state) {
      onSuccess.apply({}, args)
    } else {
      callbacks.push(onSuccess));
    }
  };

  self.resolve = function() {
    if (state !== undefined) {return;}
    args = arguments
    state = true
    callbacks.forEach(function(fn) {
      fn.apply({}, args)
    })
  };

  return self;
};

