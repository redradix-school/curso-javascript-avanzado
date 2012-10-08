var ProJS = (function(my) {
  my.Observable = {
    mixed: function(klass) {
      var klass_init = klass.prototype.init;
      klass.prototype.init = function() {
        this._subscribers = {};
        return klass_init.apply(this, arguments);
      };
    },
    subscribe: function(event, callback) {
      this._subscribers[event] || (this._subscribers[event] = []);
      this._subscribers[event].push(callback);
    },
    unsubscribe: function(event, callback) {
      var subs = this._subscribers[event];
      if (!subs) { return; }
      for (var i=0; i<subs.length; i++) {
        if (subs[i] === callback) {
          subs.splice(i, 1);
          break;
        }
      }
    },
    publish: function(event) {
      var args = [].slice.call(arguments, 1),
          subscribers = this._subscribers[event];
      if (subscribers) {
        subscribers.forEach(function(sub){ sub.apply({}, args); });
      }
    }
  };
  return my;
}(ProJS || {}));
