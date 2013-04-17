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
  url: "/products",
  listado: function() {
    return this.toJSON();
  },
  ordenarPorNombre: function() {
    return this.sortBy(function (e) {
      return e.get("nombre").toLowerCase();
    });
  },
  precioMenorQue: function (precio) {
    return this.filter(function(m) {
      return m.get("precio") < precio;
    });
  },
  borrarProducto: function (id) {
    var m = this.get(id);
    this.remove(m);
    if (m) m.destroy();
  },
  nuevoProducto: function (attrs) {
    /*
       var p = new Producto(attrs);
       p.once("sync", function() {
         this.add(p);
       }, this);
       p.save();
    */
    this.create(attrs);
  }
});

$(function() {
  var listado = new ListadoProductos();
  listado.on("sync", function() {
    listado.ordenarPorNombre().forEach(function(p) {
      console.log(p.get("nombre"));
    });
  });
  listado.fetch();
});
