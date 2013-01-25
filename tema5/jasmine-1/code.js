// -- Tests

describe("Conjunto de tests", function() {

  it("debería ser un caso válido", function() {
    expect(true).toBe(true);
  });

  it("debería ser un caso con error", function() {
    expect(true).toBe(false);
  });

});

// -- Inicialización de Jasmine

(function() {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;
  jasmineEnv.addReporter(new jasmine.HtmlReporter());
  $(bind(jasmineEnv, jasmineEnv.execute));
}());
