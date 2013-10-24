var promise = new Prom();

promise.then(function(v) {
  console.log("Me resuelvo!");
});

promise.resolve();
