// -- Utilidades

function debounce(fn, time) {
  var timerId;
  return function() {
    var args = [].slice.call(arguments);
    if (timerId) clearTimeout(timerId);
      timerId = setTimeout(bind(this, function() {
        fn.apply(this, args);
      }), time);
  };
}

var lazyPrint = (function() {
  var buffer = "",
  print = function() { console.log(buffer); buffer = ""; };
  print = debounce(print, 300);
  return function(msg) {
    buffer += msg;
    print();
  };
}());

// -- Contador

var Contador = ProJS.Model.extend({
  defaults: { contador: 0 },
  inc: function() {
    this.set({contador: this.get('contador') + 1});
  },
  dec: function() {
    this.set({contador: this.get('contador') - 1});
  },
  reset: function() {
    this.set({contador: 0});
    this.trigger('contador:reset');
  }
});

// -- Intefaz

var ContadorView = ProJS.View.extend({
  events: {
    "click .success": "inc",
    "click .alert": "dec",
    "click .reset": "reset"
  },
  init: function (options) {
    this._super(options);
    this.template = $('#contador-ui').html();
    this.model.on("change", bind(this, this.render));
  },
  inc: function() { this.model.inc(); },
  dec: function() { this.model.dec(); },
  reset: function() { this.model.reset(); },
  render: function() {
    var data = this.model.toJSON();
    this.$el.html(_.template(this.template, data));
    return this;
  }
});


(function() {
  // -- Inicialización de Jasmine
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 500;
  jasmineEnv.addReporter(new jasmine.ConsoleReporter(lazyPrint));
  $(bind(jasmineEnv, jasmineEnv.execute));

  // -- Init

  var contador = new Contador(),
  contadorView = new ContadorView({model: contador}).render();

  $("#contenedor").append(contadorView.el);

  // -- Tests

  describe("Intefaz del contador", function() {

    // referencias a los elementos del interfaz

    var incButton,
    decButton,
    resetButton,
    display,
    refreshVars = function() {
      incButton = $("#contenedor").find(".success");
      decButton = $("#contenedor").find(".alert");
      resetButton = $("#contenedor").find(".reset");
      display = $("#contenedor").find(".panel");
    };

    // refresco las referencias cada vez que se altera el modelo
    // (porque al re-redear al vista se pierden)

    contador.on('change', refreshVars);

    // y también al entrar en cada test
    // (reset fuerza un re-rendeo)

    beforeEach(function() {
      contador.reset();
      refreshVars();
    });

    // casos

    it("debería empezar a 0", function() {
      expect(display.text()).toMatch("Contador: 0");
    });


    describe("boton Dec", function() {

      it("debería decrementar el contador al hacer click", function() {
        decButton.click();
        expect(display.text()).toMatch("Contador: -1");
      });

      it("debería decrementar varias veces", function() {
        "5".times(function() { decButton.click(); });
        expect(display.text()).toMatch("Contador: -5");
      });

    });

    describe("boton Inc", function() {

      it("debería incrementar el contador al hacer click", function() {
        incButton.click();
        expect(display.text()).toMatch("Contador: 1");
      });

      it("debería incrementar varias veces", function() {
        "5".times(function() { incButton.click(); });
        expect(display.text()).toMatch("Contador: 5");
      });

    });

    describe("boton Reset", function() {

      it("debería resetear el contador a 0 al hacer click", function() {
        resetButton.click();
        expect(display.text()).toMatch("Contador: 0");
      });

    });

  });

}());
