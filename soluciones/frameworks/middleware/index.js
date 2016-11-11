const createStore = require('./createStore')
const combineReducers = require('./combineReducers')
const applyMiddleware = require('./applyMiddleware')
const logger = require('./logger')
const crashReporter = require('./crashReporter')
const counterReducer = require('./counter')
const sessionReducer = require('./session')

let reducer = combineReducers(reducers)
let store = createStore(
  reducer,
  initialState,
  applyMiddleware(logger, crashReporter)
)

console.log(counter.increment())
