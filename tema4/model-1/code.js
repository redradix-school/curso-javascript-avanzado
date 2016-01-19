var Producto = ProJS.Model.extend({
  init: function() {
    this._super.apply(this, arguments);
    this.set({id: this.constructor.counter++});  
  },
  defaults: {
    nombre: "Sin nombre",
    categoria: "sin categoria",
    pais: "Sin pais",
    precio: 0
  },
  set: function(attrs, options) {
    return this._super(attrs,  merge(options, {validate: true}));
  },
  validate: function(attrs) {
    var empty = /^\s*$/,
        countries = /Espana|Francia|Portugal/,
        numeric = /^\d+$/;
    if (empty.test(attrs["nombre"]) ||
        empty.test(attrs["categoria"]) || 
        (attrs["pais"] && !countries.test(attrs["pais"])) ||
        (attrs["precio"] && !numeric.test(attrs["precio"]))) { 
          return "Producto no valido";  
    }
  }
});

Producto.counter= 0;

var ProductoConIva = ProJS.Class.extend({
  init: function(producto) {
    this.producto = producto;  
  },
  get: function(attr) {
    if (attr == "precio") {
      return this.producto.get("precio") * 1.21; 
    } else {
      return this.producto.get.apply(this.producto, arguments);  
    }
  },
  set: function() {
    this.producto.set.apply(this.producto, arguments);  
  },
  toJSON: function() {
    var attrs = this.producto.toJSON();  
    attrs.precio = this.get("precio");
    return attrs;
  }
})

// Test

var p1 = new Producto();

p1.on("invalid", function (model, error) {
  console.log(error);
});

p1.set({nombre: "Jamón", categoria: "Comida", pais: "Espana", precio: 65});
console.log(p1.toJSON());


p1.set({nombre: "", pais: "Korea"}); // no valido!
console.log(p1.toJSON());

var p2 = new Producto({nombre: "Perfume", categoria: "Higiene", pais: "Francia", precio: 40});
console.log(p2.toJSON());

