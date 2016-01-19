var Producto = ProJS.Model.extend({
  init: function() {
    this._super.apply(this, arguments);
    // auto-incrementamos el ID
    this.set({id: this.constructor.currentId++});
  },
  // Ponemos unos valores por defecto que
  // satisfagan la validación
  defaults: {
    nombre: "Producto sin nombre",
    categoria: "Sin categorizar",
    pais: "Espana",
    precio: 0
  },
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

// ID inicial
Producto.currentId = 0;

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

// Test

var p1 = new Producto();

p1.on("invalid", function (model, error) {
  console.log(error);
});

p1.set({nombre: "Jamón", categoria: "Comida", pais: "España", precio: 65});
console.log(p1.toJSON());


p1.set({nombre: "", pais: "Korea"}); // no valido!
console.log(p1.toJSON());

var p2 = new Producto({nombre: "Perfume", categoria: "Higiene", pais: "Francia", precio: 40});
console.log(p2.toJSON());

// decorador
var p2conIVA = new ProductoConIva(p2);
console.log(p2conIVA.get("precio"));
console.log(p2conIVA.get("nombre"));
console.log(p2conIVA.toJSON());
