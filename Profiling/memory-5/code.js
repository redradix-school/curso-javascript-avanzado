"use strict";

function generateBigLeaf() {
  var d = document.createElement("li");
  d.className = "leaf";
  d.textContent = new Array(10000).join("x");
  return d;
}

function generateTree() {
  var t = document.createElement("ul");
  t.style.display = "none";
  for (var i = 100; i--;) { t.appendChild(generateBigLeaf()); }
  return t;
}

document.body.appendChild(generateTree());

// leak

var treeRef = document.querySelector("ul");
var leafRef = document.querySelector("li:last-child");
