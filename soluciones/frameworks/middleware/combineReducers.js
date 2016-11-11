const state = {
  counter: 0,
  session: {
    user: 'Miguel',
    token: '324324324'
  }
 }

module.exports = function combineReducers(reducers) {
  return function newReducer(state, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key].call(this, state[key], action)
      return nextState
    }, {})
  }
}

