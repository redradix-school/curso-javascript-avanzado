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
}

const newReducer = combineReducers({counter, session})
console.log(newReducer)
console.dir(newReducer(state, counter.increment()))
