"use strict";

function MiClase() {
}

var lotsOfObjects = (function clausura() {
  var objects = [];

  return function lotsOfObjects() {
    for (var i=100; i--;) {
      objects.push(new MiClase());
    }
  };
}());

requestAnimationFrame(function loop() {
  lotsOfObjects();
  requestAnimationFrame(loop);
});
