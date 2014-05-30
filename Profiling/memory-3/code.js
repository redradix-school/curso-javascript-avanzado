"use strict";

var lotsOfObjects = (function clausura() {
  var objects = [];

  return function lotsOfObjects() {
    for (var i=100; i--;) {
      objects.push({});
    }
  };
}());

requestAnimationFrame(function loop() {
  lotsOfObjects();
  requestAnimationFrame(loop);
});
