"use strict";

window.addEventListener("load", function() {
  var h1 = document.querySelector("h1"),
      h2 = document.querySelector("h2"),
      h3 = document.querySelector("h3"),
      c = 0;

  requestAnimationFrame(function loop() {
    var t = (Date.now() / 1000) % (2*Math.PI);
    var tx = Math.sin(t) * 100;
    var ty = Math.cos(t) * 100;

    h1.style.left = tx + 100 + "px";
    h1.style.top = ty + 100 + "px";
    c += h1.offsetWidth;

    h2.style.left = tx + 400 + "px";
    h2.style.top = ty + 100 + "px";
    c += h2.offsetWidth;

    h3.style.left = tx + 300 + "px";
    h3.style.top = ty + 300 + "px";
    c += h3.offsetWidth;

    requestAnimationFrame(loop);
  });

});
