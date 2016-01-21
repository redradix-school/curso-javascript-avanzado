var Observable = {
  mixed: function(klass) {
    // ???
  },
  subscribe: function(event, callback) {
    // ???
  },
  unsubscribe: function(event, callback) {
    // ???
  },
  publish: function(event) {
    // ???
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