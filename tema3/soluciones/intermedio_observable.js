var Observable = {
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

var Input = Class.extend({
  init: function(value) {
    this.value = value;
  },
  getValue: function() {
    return this.value;
  },
  setValue: function(value) {
    if (this.validate(value)) {
      this.value = value;
      this.publish('change', value);
    } else {
      this.publish('invalid', value);
    }
  },
  validate: function(value) {
    return (/^\S+$/).test(value);
  }
});

Input.mixin(Observable);

InputView = Class.extend({
  init: function(input) {
    this.input = input;
    this.input.subscribe('change', bind(this, this.update));
    this.input.subscribe('invalid', bind(this, this.invalid));
  },
  update: function(newValue) {
    console.log("CHANGED: " + newValue);
  },
  invalid: function(value) {
    console.log("El valor: " + value + " no es válido!");
  }
});

var input = new Input();
var observer = new InputView(input);

input.setValue("Despierta!");
input.setValue("    ");
