module.exports = function reducer(state = {}, action) {
  switch(action.type) {
  case SET_SESSION:
    return action.payload
  case CLEAR_SESSION:
    return {}
  default:
    return state
  }
}

const SET_SESSION = 'SESSION:SET'
const CLEAR_SESSION = 'SESSION:CLEAR'


module.exports.setSession = function(session) {
  return {
    type: SET_SESSION,
    payload: session
  }
}

module.exports.clearSession = function clearSession() {
  return {
    type: CLEAR_SESSION
  }
}
