var funciones = [];

for (var i=0; i < 10; i++) {
  funciones[i] = function() {
    console.log(i);
  };
}

// ¿Qué muestra por la consola?

funciones[2]();

// Debería mostrar 2, ¿no?
// La solución:

var funcionesClausuradas = [];

for (var j=0; j < 10; j++) {
  funcionesClausuradas[j] = (function(j) {
    return function() {
      console.log(j);
    };
  }(j));
}

// Ahora si:

funcionesClausuradas[2]();
