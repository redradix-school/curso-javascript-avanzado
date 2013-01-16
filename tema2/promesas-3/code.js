// Implementación

var TestPromesa = Class.extend({
  init: function () {
    // Promesa
    this.promesa = new $.Deferred();

    // DOM
    this.el = $($('#prompt-item').html());

    // Eventos del intefaz
    this.el.on('click', '.success', bind(this, this._resolve))
           .on('click', '.alert',   bind(this, this._fail));
  },
  _resolve: function () {
    this.el.html('<div class="panel"><strong> Exito! </strong> </div>');
    // resuelve la promesa
    this.promesa.resolve();
  },
  _fail: function () {
    this.el.html('<div class="panel"> Fracaso... </div>');
    // cancela la promesa
    this.promesa.reject();
  },

  // Interfaz pública para el cliente

  getElement: function () {
    return this.el;
  },
  getPromesa: function () {
    return this.promesa;
  }
});


// Consumo del interfaz e inicialización

$(function() {
  var contenedor = $('#promesas'),
      cantidad = 5,
      testPromesa,
      promesa;

  for (var i=cantidad; i--;) {
    testPromesa = new TestPromesa();
    promesa = testPromesa.getPromesa();

    // Mucho mejor ahora!
    promesa.done(function () {
      alert("Ok!");
    });
    promesa.fail(function () {
      alert("Fallo...");
    });

    contenedor.append(testPromesa.getElement());
  }
});
