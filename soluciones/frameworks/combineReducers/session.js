export default function reducer(state = {}, action) {
  switch(action.type) {
  case SET_SESSION:
    return action.payload
  case CLEAR_SESSION:
    return {}
  default:
    state
  }
}

const SET_SESSION = 'SESSION:SET'
const CLEAR_SESSION = 'SESSION:CLEAR'


export function setSession(session) {
  return {
    type: SET_SESSION,
    payload: session
  }
}

export function clearSession() {
  return {
    type: CLEAR_SESSION
  }
}
