// Implementación

var TestPromesa = Class.extend({
  init: function () {
    this.el = $($('#prompt-item').html());
    this.el.on('click', '.success', bind(this, this.resolve))
           .on('click', '.alert',   bind(this, this.fail));
  },
  resolve: function () {
    this.el.html('<div class="panel"><strong> Exito! </strong> </div>');
  },
  fail: function () {
    this.el.html('<div class="panel"> Fracaso... </div>');
  },
  getElement: function () {
    return this.el;
  }
});


// Consumo del interfaz e inicialización

$(function() {
  var contenedor = $('#promesas'),
      cantidad = 5,
      testPromesa;

  for (var i=cantidad; i--;) {
    testPromesa = new TestPromesa();
    contenedor.append(testPromesa.getElement());
  }
});
