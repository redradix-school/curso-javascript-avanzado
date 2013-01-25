// --- Clase a testear

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

// --- Funcionalidad general

var Test = ProJS.Class.extend({
  run: function() {
    var contador, nombre;
    for (var caso in this.casos) {
      contador = new Contador();
      nombre = caso.replace(/_/g, ' ');
      try {
        this.casos[caso].call(this, contador);
        console.log("[√] %1".format(nombre));
      } catch(e) {
        console.log("[x] %1".format(nombre));
        console.log(e.message);
      }
    }
  },
  casos: {},
  assert: function(value, msg) {
    msg = "   ERROR -> %1".format(msg || "");
    if (!value) throw new Error(msg);
  },
  assertEqual: function(a, b, msg) {
    this.assert(a == b, msg);
  }
});

// --- Caso concreto

var ContadorTests = Test.extend({
  casos: {
    debe_empezar_a_cero: function(contador) {
      var i = contador.get();
      this.assertEqual(i, 0, "Empieza a %1".format(i));
    },
    inc_debe_sumar_uno: function(contador) {
      var prev = contador.get(), dif;
      contador.inc();
      dif = contador.get() - prev;
      this.assertEqual(dif, 1, "Suma %1".format(dif));
    },
    dec_debe_restar_uno: function(contador) {
      var prev = contador.get(), dif;
      contador.dec();
      dif = prev - contador.get();
      this.assertEqual(dif, 1, "Resta %1".format(dif));
    }
  }
});

// -- Init

var tests = new ContadorTests();
tests.run();
