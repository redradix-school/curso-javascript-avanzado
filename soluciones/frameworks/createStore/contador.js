export default function reducer(state = 0, action) {
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


export function increment() {
  return {
    type: INCREMENT
  }
}

export function decrement() {
  return {
    type: DECREMENT
  }
}
