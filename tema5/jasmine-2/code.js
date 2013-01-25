// -- Contador

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

// -- Inicialización de Jasmine

(function() {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;
  jasmineEnv.addReporter(new jasmine.HtmlReporter());
  $(bind(jasmineEnv, jasmineEnv.execute));
}());

// -- Tests

describe("Contador", function() {

  var contador = new Contador();

  beforeEach(function() {
    contador.reset();
  });

  it("debería empezar a cero", function() {
    expect(contador.get()).toEqual(0);
  });

  describe("inc", function() {
    it("debería incrementar en 1", function() {
      var prev = contador.get();
      contador.inc();
      expect(contador.get() - prev).toBe(1);
    });

    it("debería incrementar varias veces", function() {
      "5".times(function() { contador.inc(); });
      expect(contador.get()).toEqual(5);
    });
  });

  describe("dec", function() {
    it("debería decrementar en 1", function() {
      var prev = contador.get();
      contador.dec();
      expect(prev - contador.get()).toBe(1);
    });

    it("debería decrementar varias veces", function() {
      "5".times(function() { contador.dec(); });
      expect(contador.get()).toEqual(-5);
    });
  });

  describe("reset", function() {
    it("reset debería poner el contador a 0", function() {
      "5".times(function() { contador.inc(); });
      contador.reset();
      expect(contador.get()).toEqual(0);
    });
  });

});
