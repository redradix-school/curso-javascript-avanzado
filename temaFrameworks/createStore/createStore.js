module.exports = function createStore(reducer) {
  function getState() {
  }

  // Vamos a implementar un observable. Solo vamos a almacenar el callback.
  function subscribe(listener) {
    // Devolvemos una funcion para eliminar el callback del array de callbacks
  }

  // Usaremos esta funcion para invocar acciones que dependiendo de su tipo, modificaran el estado de una forma u otra
  function dispatch(action) {
  }

  // Inicializamos el estado

  // Exponemos la interfaz hacia fuera
  return {
    getState,
    subscribe,
    dispatch
  }
}
