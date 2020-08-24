// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
export default (state = userInitialState, action) => {
  // switch is like an "if" statement on steroids
  // it compares the cases and says "if" the case is true - due the thing
  // state is the same as "app.state"
  // action is data: think of a payload as carrying some data -- 
  // then in the switch it compares the action with the case, if 
  // they match - do the thing.

  switch (action.type) {
    case SET_USER:
      // i need to go to the actions file and see what SET_USER is!
      // SET_USER is a reducer!!!!!!
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    default:
      return state
  }
}