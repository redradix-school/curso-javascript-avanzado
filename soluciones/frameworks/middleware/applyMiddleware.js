export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, initialState) => {
    // Redux store
    const store = createStore(reducer, initialState)
    const dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }

    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
