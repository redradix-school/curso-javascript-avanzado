"use strict";

window.addEventListener("load", function() {
  var h1 = document.querySelector("h1");

  requestAnimationFrame(function loop() {
    var t = (Date.now() / 1000) % (2*Math.PI);
    var tx = Math.sin(t) * 100;
    var ty = Math.cos(t) * 100;
    h1.style.transform = "translate(" + (tx+100) + "px, " + (ty+100) + "px)";

    requestAnimationFrame(loop);
  });

});
