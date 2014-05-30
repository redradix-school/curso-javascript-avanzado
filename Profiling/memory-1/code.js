"use strict";

function lotsOfObjects() {
  var a;
  for (var i=10000; i--;) {
    a = {};
  }
}

requestAnimationFrame(function loop() {
  lotsOfObjects();
  requestAnimationFrame(loop);
});
