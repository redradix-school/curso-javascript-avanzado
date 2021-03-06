const state = {
  counter: 0,
  session: {
    user: 'Miguel',
    token: '324324324'
  }
 }


const counter = require('./counter')
const session = require('./session')

function combineReducers(reducers) {
  return function newReducer(state, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key].call(this, state[key], action)
      return nextState
    }, {})
  }
}

const newReducer = combineReducers({counter, session})
console.log(newReducer)
console.dir(newReducer(state, counter.increment()))
