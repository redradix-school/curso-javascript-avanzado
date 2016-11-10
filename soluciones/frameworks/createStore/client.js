import createStore from './createStore'
import counter from './counter'

const {getState, subscribe, dispatch} = createStore()


subscribe(function(state) {
  console.log(`Hey, my new value is ${getState()}`)
})

dispatch(counter.increment())
dispatch(counter.increment())
dispatch(counter.decrement())
dispatch(counter.decrement())
dispatch(counter.increment())



