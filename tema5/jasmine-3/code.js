// --- Sujeto

function asyncFn(cb) {
  setTimeout(function() {
    cb(true);
  }, 250);
}

// --- Inicialización de Jasmine

(function() {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;
  jasmineEnv.addReporter(new jasmine.HtmlReporter());
  $(bind(jasmineEnv, jasmineEnv.execute));
}());

// --- Tests

describe("Test asíncrono", function() {

  it("debería llamar al callback con true", function() {
    var result,
        callback = function(response) { result = response; };

    runs(function() {
      asyncFn(callback);
    });

    waitsFor(function() {
      return result == true;
    }, 300);

    runs(function() {
      expect(result).toBe(true);
    });
  });

});
