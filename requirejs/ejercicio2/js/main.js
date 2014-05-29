"use strict";

console.log("* main.js ejecutando");

require(["modulo1", "modulo2"], function(m1, m2) {
  console.log("m1:", m1);
  console.log("m2:", m2);
});
