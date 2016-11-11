module.exports = function compose(...fns) {
  if (fns.length === 0) {
    return args => args
  }
  if (fns.length === 1) {
    return fns[0]
  }
  const last = fns[fns.length - 1]
  const rest = fns.slice(0, -1)
  // Solo para funciones de un argumento salvo la de mas a la derecha que es la firma de la funcion
  // De izquierda a derecha
  return (...args) => rest.reduceRight((result, f) => f(result), last(...args))
  }
}
