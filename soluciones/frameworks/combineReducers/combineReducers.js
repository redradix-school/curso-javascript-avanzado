/* const state = {
  counter: 0,
  session: {
    user: 'Miguel',
    token: '324324324'
  }
  }
*/

import counter from './counter'
import session from './session'

export default function combineReducers(reducers) {
  return newReducer

  function newReducer() {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}

const newReducer = combineReducers([counter, session])
console.log(newReducer)
