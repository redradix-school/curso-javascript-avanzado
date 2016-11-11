module.exports = function reducer(state = 0, action) {
  switch(action.type) {
  case INCREMENT:
    return state + 1
  case DECREMENT:
    return state - 1
  default:
    state
  }
}

const INCREMENT = 'CONTADOR:INCREMENT'
const DECREMENT = 'CONTADOR:DECREMENT'


module.exports.increment = function() {
  return {
    type: INCREMENT
  }
}

module.exports.decrement = function() {
  return {
    type: DECREMENT
  }
}
