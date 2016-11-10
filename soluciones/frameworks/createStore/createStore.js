export default function createStore(reducer) {
  let state
  const listeners = []

  function getState() {
    return state
  }

  // Vamos a implementar un observable. Solo vamos a almacenar el callback.
  function subscribe(listener) {
    listener.push(listener)
    // Devolvemos una funcion para eliminar el callback del array de callbacks
    return unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index)
    }
  }

  // Usaremos esta funcion para invocar acciones que dependiendo de su tipo, modificaran el estado de una forma u otra
  function dispatch(action) {
    // Los reducers son funciones puras, es decir, devuelven un nuevo objeto, no modifican el anterior.
    state = reducer(state, action)
    // Cada vez que el reducer se ejecuta se invoca a todos los callbacks registrados.
    listeners.forEach(listener => listener())
  }

  // Inicializamos el estado con una accion vacia
  dispatch({})

  // Exponemos la interfaz hacia fuera
  return {
    getState,
    subscribe,
    dispatch
  }
}
