// Imports
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk'

// App Imports

// what does common have?
// common just tells us if there is a nessage 
// showing or not
import common from '../modules/common/api/state'

import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'

// what does subscriptions do?
// user subscribes to a crate of whatever type
// user fills out style survey
// user is taken back to subscriptions page
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// this is the the data store

// App Reducer
const appReducer = combineReducers({
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Load initial state from server side
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
export const store = createStore(
  rootReducer,
  initialState,

  composeWithDevTools(
    applyMiddleware(thunk),
  )
)