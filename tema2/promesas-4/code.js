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
      todoOk = true;

  for (var i=cantidad; i--;) {
    testPromesa = new TestPromesa();

    // Combinamos todas las promesas!
    todoOk = $.when(todoOk, testPromesa.getPromesa());

    contenedor.append(testPromesa.getElement());
  }

  // Callbacks para la promesa combinada

  todoOk.done(function () {
    alert("Todas las filas Ok!");
  });

  todoOk.fail(function () {
    alert("Alguna fila ha fallado...");
  });

});
