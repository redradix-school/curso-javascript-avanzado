const createStore = require('./createStore')
const counter = require('./counter')

const {getState, subscribe, dispatch} = createStore(counter)


subscribe(function(state) {
  console.log(`Hey, my new value is ${getState()}`)
})

dispatch(counter.increment())
dispatch(counter.increment())
dispatch(counter.decrement())
dispatch(counter.decrement())
dispatch(counter.increment())



