var Producto = ProJS.Model.extend({
  init: function() {
    this._super.apply(this, arguments);
  },
  // Ponemos unos valores por defecto que
  // satisfagan la validación
  defaults: {
    nombre: "Producto sin nombre",
    categoria: "Sin categorizar",
    pais: "España",
    precio: 0
  },
  urlRoot: "/products",
  set: function(attrs, options) {
    // forzamos que las llamadas a set pasen la validación
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
      // No es válido!
      return "Producto no válido!";
    }
  }
});

// Decorador

var ProductoConIva = ProJS.Class.extend({
  init: function(producto) {
    this.producto = producto;
  },
  get: function(clave) {
    if (clave == "precio") {
      // interceptamos la consulta al precio
      return this.producto.get("precio") * 1.21;
    } else {
      // redireccionamos las demás
      return this.producto.get.apply(this.producto, arguments);
    }
  },
  set: function(attrs, options) {
    // redirección al modelo decorado
    return this.producto.set(attrs, options);
  },
  toJSON: function() {
    // redirección al modelo decorado...
    var json = this.producto.toJSON();
    // ...excepto la propiedad "precio"
    json.precio = this.get("precio");
    return json;
  }
});

// Test de persistencia

function cargaLista () {
  $.get("/products", cargaPrimerProducto);
}

function cargaPrimerProducto (lista) {
  var producto = new Producto(lista[0]);
  producto.on("change", function(modelo) {
    console.log("Producto:", modelo.toJSON());
    producto.set({nombre: "Modificado"}, {silent: true});
    producto.save();
  });
  producto.on("sync", function(model) {
    console.log("Sincronizado: ", model.toJSON());
  });
  producto.set({categoria: "entre tiempo"});
}

cargaLista();
