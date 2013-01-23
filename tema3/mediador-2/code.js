var Component = Class.extend({
  setMediator: function(mediator) {
    this.mediator = mediator;
  }
});

var Mediator = Class.extend({
  init: function(fn) {
    this.connections = {};
    if (fn) fn(this);
  },
  on: function(msg, cb) {
    this.connections[msg] = cb;
  },
  send: function(msg) {
    var args = [].slice.call(arguments, 1),
        action = this.connections[msg];
    if (action) action.apply({}, args);
  },
  addComponent: function(component) {
    component.setMediator(this);
  }
});

// Componentes

var Button = Component.extend({
  init: function(nombre, selector) {
    this.nombre = nombre;
    this.el = $(selector);
    this.el.click(bind(this, this.onClick));
  },
  onClick: function() {
    this.mediator.send(this.nombre + ':clicked');
  }
});

var Toggle = Component.extend({
  init: function(nombre, selector) {
    this.nombre = nombre;
    this.el = $(selector);
    this.el.change(bind(this, this.onChange));
  },
  onChange: function() {
    var state = this.el.attr('checked') ? "on" : "off";
    this.mediator.send(this.nombre + ":" + state);
  }
});

var Display = Component.extend({
  init: function(selector) {
    this.el = $(selector);
  },
  update: function(value) {
    this.el.html(value);
  }
});

var Counter = Class.extend({
  init: function(start) {
    this.count = start;
  },
  increment: function() {
    this.count++;
  },
  decrement: function() {
    this.count--;
  },
  getCurrentValue: function() {
    return this.count;
  }
});

// Inicialización

$(function() {

  var mediator = new Mediator(function(mediator) {
    var button1 = new Button('inc', '#button-1'),
        button2 = new Button('dec', '#button-2'),
        display = new Display('#big-display'),
        toggle = new Toggle('ignore', '#ignore'),
        count = new Counter(0),
        enabled = true;

    mediator.addComponent(button1);
    mediator.addComponent(button2);
    mediator.addComponent(toggle);
    mediator.addComponent(display);

    mediator.on('ignore:on', function() {
      enabled = false;
    });

    mediator.on('ignore:off', function() {
      enabled = true;
    });

    mediator.on('inc:clicked', function() {
      if (enabled) { count.increment(); }
      display.update(count.getCurrentValue());
    });

    mediator.on('dec:clicked', function() {
      if (enabled) { count.decrement(); }
      display.update(count.getCurrentValue());
    });

  });

});
