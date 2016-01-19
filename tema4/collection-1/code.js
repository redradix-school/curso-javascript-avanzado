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
  model: Producto
  url: '/products',
  listado: function() {
    return this.toJSON();  
  },
  ordenarPorNombre: function() {
    return this.sortBy(function(m) {
      return m.get("nombre").toLowerCase(); 
    }); 
  },
  precioMenorQue: function(x) {
    return this.filter(function() {
      return m.get("precio") < x;  
    });  
  borrarProducto: function(id) {
    var model = this.get(id); 
    this.remove(model);
    if (model) model.destroy();
  },
  nuevoProducto: function(attrs) {
    this.create(attrs);  
  }
});

$(function() {
  var productos = new ListadoProductos();  
  productos.on("sync", function(attrs) {
    productos.ordenarPorNombre().forEach(function(p) {
      console.log(p.get("nombre"));
    }) 
  })
  productos.fetch();
})
