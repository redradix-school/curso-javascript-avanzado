// Modelo

var Producto = ProJS.Model.extend({
  init: function() {
    this._super.apply(this, arguments);
  },
  defaults: {
    nombre: "Producto sin nombre",
    categoria: "Sin categorizar",
    pais: "España",
    precio: 0,
    activo: false
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
  url: "/products"
});

ListadoProductos.mixin(ProJS.Mediable);


// Vista detallada

var VistaProducto = ProJS.View.extend({
  init: function(options) {
    this._super(options);
    this.template = $("#template-producto").html();
  },
  tagName: "div",
  render: function() {
    var data = this.model.toJSON();
    this.$el.html(
      _.template(this.template, data)
    );
    return this;
  }
});

VistaProducto.mixin(ProJS.Mediable);

// Vista de la barra lateral

var VistaListado = ProJS.View.extend({
  events: {
    "click a": "marcarComoActivo"
  },
  init: function(options) {
    this._super(options);
    this.template = $("#template-producto-sidebar").html();
    this.model.on("change", bind(this, this.render));
  },
  tagName: "li",
  render: function() {
    var data = this.model.toJSON(),
        op;
    this.$el.html(
      _.template(this.template, data)
    );
    // ¿Es el modelo activo?
    op = data.activo ? "addClass" : "removeClass";
    this.$el[op]("active");

    return this;
  },
  // Manejadores de eventos
  marcarComoActivo: function() {
    this.notify('nuevo-activo', this.model);
    this.model.set({activo: true});
    return false;
  }
});

VistaListado.mixin(ProJS.Mediable);

// Inicialización

$(function() {
  var listado = new ListadoProductos(),
      barraLateral = $("#barra-lateral"),
      container = $("#container"),
      // inicializamos el mediador
      mediador = new ProJS.Mediator(function (mediador) {

        mediador.add(listado);

        // Cuando el listado cargue los datos...
        listado.on('reset', function (listado) {
          listado.each(function (modelo) {
            var vista = new VistaListado({model: modelo}).render();
            mediador.add(vista);
            barraLateral.append(vista.el);
          });
        });

        // Cuando alguien dispare el evento "nuevo-activo"

        mediador.on('nuevo-activo', function (modelo) {

          // Vista Detallada
          var vistaDetallada = new VistaProducto({model: modelo}).render();
          container.html(vistaDetallada.el);

          // Desactivar los demás elementos
          listado.map(function (m) {
            if (m !== modelo && m.get('activo')) m.set({activo: false});
          });

        });

      });

  // Cargamos los datos
  listado.fetch();
});
