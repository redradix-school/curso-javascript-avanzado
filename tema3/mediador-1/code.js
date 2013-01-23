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

// Inicialización

$(function() {

  var mediator = new Mediator(),
      button1 = new Button('pulsador', '#button-1');

  mediator.addComponent(button1);
  mediator.on('pulsador:clicked', function() { alert("hola?"); });

});
