"use strict";

var objects = [];

function lotsOfObjects() {
  for (var i=100; i--;) {
    objects.push({});
  }
}

requestAnimationFrame(function loop() {
  lotsOfObjects();
  requestAnimationFrame(loop);
});
