// Modelo

var Producto = ProJS.Model.extend({
  init: function() {
    this._super.apply(this, arguments);
  },
  defaults: {
    nombre: "Producto sin nombre",
    categoria: "Sin categorizar",
    pais: "España",
    precio: 0
  },
  set: function(attrs, options) {
    return this._super(attrs, merge(options, {validate: true}));
  },
  validate: function(attrs) {
    var vacio = /^\s*$/,
        pais = /España|Francia|Portugal/,
        numerico = /^\d+$/;
    if (vacio.test(attrs["nombre"]) ||
        vacio.test(attrs["categoria"]) ||
        (attrs["pais"] && !pais.test(attrs["pais"])) ||
        (attrs["precio"] && !numerico.test(attrs["precio"])) ||
        (attrs["id"] && !numerico.test(attrs["id"]))) {
      return "Producto no válido!";
    }
  }
});

// Colección

var ListadoProductos = ProJS.Collection.extend({
  model: Producto,
  url: "products"
});


// Vista detallada


// Vista de la barra lateral


// Inicialización

