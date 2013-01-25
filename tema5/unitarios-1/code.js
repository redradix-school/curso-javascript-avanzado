var Contador = ProJS.Class.extend({
  init: function() {
    this.i = 0;
  },
  get: function() {
    return this.i;
  },
  inc: function() {
    this.i++;
  },
  dec: function() {
    this.i--;
  },
  reset: function() {
    this.i = 0;
  }
});


var ContadorTests = ProJS.Class.extend({
  run: function() {
    var contador, nombre;
    for (var caso in this.casos) {
      contador = new Contador();
      nombre = caso.replace(/_/g, ' ');
      try {
        this.casos[caso](contador);
        console.log("[√] %1".format(nombre));
      } catch(e) {
        console.log("[x] %1".format(nombre));
        console.log("   ERROR -> %1".format(e.message));
      }
    }
  },
  casos: {
    debe_empezar_a_cero: function(contador) {
      var i = contador.get();
      if (i !== 0) throw new Error("Empieza a %1".format(i));
    },
    inc_debe_sumar_uno: function(contador) {
      var prev = contador.get();
      contador.inc();
      if ((contador.get() - prev) !== 1) {
        throw new Error("Suma %1".format(contador.get() - prev));
      }
    },
    dec_debe_restar_uno: function(contador) {
      var prev = contador.get();
      contador.dec();
      if ((prev - contador.get()) !== 1) {
        throw new Error("Resta %1".format(prev - contador.get()));
      }
    }
  }
});

var tests = new ContadorTests();
tests.run();
